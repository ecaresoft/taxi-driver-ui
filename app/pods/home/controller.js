import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class HomeController extends Controller {
  @tracked shouldDisplayNewTax = false;
  @tracked shouldDisplayHistoryModal = false;

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
    const record = this.store.createRecord('rule', newTax);
    record.save();

    window.location.reload(true);
  }

  @action
  saveTaxEditions(updatedTax) {
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
}
