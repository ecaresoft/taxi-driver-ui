import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class HomeController extends Controller {
  @tracked shouldDisplayNewTax = false;
  @tracked shouldDisplayHistoryModal = false;

  get rulesGroupedByCountries() {
    let countryRules = {};

    const rules = this.model.rules;
    const countries = this.model.countries;

    countries.forEach(c => countryRules[c.code] = { "countryName": c.name, "rules": [] });
    rules.forEach(r => countryRules[r.country].rules.push(r));

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
  saveNewTax() {
    // Save New Tax Logic
  }

  @action
  openHistoryModal() {
    this.shouldDisplayHistoryModal = true;
  }
}
