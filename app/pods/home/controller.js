import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class HomeController extends Controller {
  @tracked displayNewTax = false;

  @action
  displayNewTaxModal() {
    this.displayNewTax = true;
  }

  @action
  closeNewTaxModal() {
    this.displayNewTax = false;
  }

  @action
  saveNewTax() {
    // Save New Tax Logic
  }
}
