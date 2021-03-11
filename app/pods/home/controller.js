import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class HomeController extends Controller {
  @service session;

  @tracked shouldDisplayNewTax = false;
  @tracked shouldDisplayHistoryModal = false;

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
      countryRules[r.country].rules.push(r.toJSON()));

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
    newTax.lastUserUpdate = this.userLogged;
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
}
