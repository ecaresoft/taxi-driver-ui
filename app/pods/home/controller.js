import Controller from '@ember/controller';
import ENV from 'tax-engine-ui/config/environment';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class HomeController extends Controller {
  @service session;

  @tracked shouldDisplayNewTax = false;
  @tracked shouldDisplayHistoryModal = false;

  @tracked draggedCard;

  get userLogged() {
    return this.session.data.authenticated.username;
  }

  get historyLogs() {
    return this.model.logs.toArray().reverse();
  }

  get rulesGroupedByCountries() {
    let countryRules = {};

    this.model.countries.forEach(c =>
      countryRules[c.code] = { "countryName": c.name, "rules": [] });
    this.model.rules.forEach(r =>
      countryRules[r.country].rules.push(r));

    return Object.values(countryRules);
  }

  @action
  displayNewTaxModal() {
    this.shouldDisplayNewTax = true;
  }

  @action
  closeHomeModals() {
    this.shouldDisplayNewTax = false;
    this.shouldDisplayHistoryModal = false;
  }

  @action
  saveNewTax(newTax) {
    let position = this.model.rules.filter(function(rule) {
      return rule.country === newTax.country;
    }).length;

    newTax.lastUserUpdate = this.userLogged;
    newTax.position = ++position;
    const record = this.store.createRecord('rule', newTax);
    record.save();

    window.location.reload(true);
  }
  @action
  deleteTax(taxId){
    let rule = this.store.peekRecord('rule', taxId);
    let user = this.userLogged;
    rule.deleteRecord();
    rule.isDeleted; 
    rule.save();
    const log = this.store.createRecord('log', {message:  `${user} deleted tax ${rule.taxName} with id ${taxId}`});
    log.save();
    window.location.reload(true);
  }

  @action
  saveTaxEditions(updatedTax) {
    updatedTax.lastUserUpdate = this.userLogged;
    this.store.findRecord('rule', updatedTax._id).then(rule => {
      Object.entries(updatedTax).forEach(([key, value]) => {
        rule[key] = value;
      });
      rule.save();
    });

    window.location.reload(true);
  }

  @action
  openHistoryModal() {
    this.shouldDisplayHistoryModal = true;
  }

  @action
  invalidateSession() {
    this.session.invalidate();
  }

  @action
  closeNewTaxModal() {
    this.shouldDisplayNewTax = false;
  }

  @action
  dragCard(rule) {
    this.draggedCard = rule;
  }

  @action
  dropCard(rule) {
    if(this.draggedCard.country === rule.country) {
      const xhttp = new XMLHttpRequest();
      xhttp.onload = () => window.location.reload(true);
      xhttp.open("POST", `${ENV.APP.apiUrl}/rules/${this.draggedCard.id}/move?position=${rule.position}`, true);
      xhttp.send();
    }
  }
}
