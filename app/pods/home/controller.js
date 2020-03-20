import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class HomeController extends Controller {
  @tracked shouldDisplayNewTax = false;
  @tracked shouldDisplayHistoryModal = false;

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
