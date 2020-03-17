import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from '@glimmer/tracking';


export default class TaxComponent extends Component {
  @tracked editMode = false
  @tracked panelMoreOpen = false;
  @tracked saveModalOpen = false;
  @tracked showConfirmationModal = false;

  @tracked taxName = this.args.taxName;
  @tracked validFrom = new Date(2000, 0);
  @tracked validUntil = new Date(2015, 0);
  @tracked productCategory = "Lorem ipsum";
  @tracked bpVATSelected = 'optionB';
  @tracked bpVATOptions = [
    { optText: 'None', value: 'none' },
    { optText: 'Option B', value: 'optionB' },
    { optText: 'Option C', value: 'optionC' }
  ];
  @tracked witholdingTAXSelected = 'optionC';
  @tracked witholdingTAXOptions = [
    { optText: 'None', value: 'none' },
    { optText: 'Option B', value: 'optionB' },
    { optText: 'Option C', value: 'optionC' },
    { optText: 'Option D', value: 'optionD' }
  ];
  @tracked TAXTypeIncomeCheck = false;
  @tracked TAXTypeExpenseCheck = false;
  @tracked taxRate = 0;
  @tracked additionalData = "Only applicable to certain processes and dataframes"

  @action
  toggleOpenCard(event) {
    var component = event.target.parentNode;
    component.classList.toggle("open");
  }

  @action
  isSelectedOption(option, defaultOption) {
    return option === defaultOption;
  }

  @action
  toggleOptionsPanel() {
    this.panelMoreOpen = !this.panelMoreOpen;
  }

  @action
  toggleEditMode() {
    this.editMode = !this.editMode;
    this.panelMoreOpen = false;
  }

  @action
  saveTAXEditions() {
    // Save TAX Editions logic
    this.saveModalOpen = true;
  }

  @action
  discardTAXEditions() {
    this.editMode = false;
  }

  @action
  saveNewTax() {
    // Save new tax logic
    this.saveModalOpen = false;
    this.showConfirmationModal = true;
  }

  @action
  closeNewTAXPanel() {
    this.args.closeNewTAXPanel();
  }

  @action
  closeModals() {
    // close save modal logic
    this.saveModalOpen = false;
    this.showConfirmationModal = false;
  }
}
