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
  saveNewTax(updatedTax) {
    console.log(JSON.stringify(updatedTax));
  }

  @action
  saveTaxEditions(updatedTax) {
    console.log(JSON.stringify(updatedTax));
  }

  @action
  openHistoryModal() {
    this.shouldDisplayHistoryModal = true;
  }
}
