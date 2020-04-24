import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from '@glimmer/tracking';


export default class TaxComponent extends Component {
  @tracked editMode = false;
  @tracked newTaxMode = this.args.newTaxMode;

  @tracked countrySelected = 'mx';
  @tracked countryOptions = [
    { optText: 'Mexico', value: 'mx' },
    { optText: 'United States of America', value: 'us' },
    { optText: 'Serbia', value: 'sb' },
    { optText: 'Colombia', value: 'co' }
  ];
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
  @tracked additionalData = "Only applicable to certain processes and dataframes";

  @tracked shouldDisplayOpenCard = this.newTaxMode;
  @tracked shouldDisplayMorePanel = false;
  @tracked shouldDisplaySaveModal = false;
  @tracked shouldDisplayConfirmationModal = false;

  get extraFields() {
    return {
      vars: {
        escala: 'IF(AND(subTotal>0,subTotal<=5000), 0.05, 0.10',
        retAll: 'IF(subTotal > 10700, escala, 0.06)',
        taxable: 'subTotal * retAll',
        extraVars: {
          superRet: 'IF(subTotal > 10700, escala, 0.06)',
          extraTaxable: 'subTotal * retAll'
        },
        anotherVar: 'Otra variable'
      },
      rate: 'retAll',
      amount: 'IF(taxable <= 150, 150, taxable)'
    };
  }

  get shouldDisplayCollapsibleButton() {
    return !(this.newTaxMode);
  }
  get shouldDisplayDropdownMenu() {
    return !(this.editMode || this.newTaxMode);
  }
  get shouldContainHardInput() {
    return !(this.editMode || this.newTaxMode);
  }
  get shouldDisplayCountryField() {
    return this.editMode || this.newTaxMode;
  }
  get shouldDisplayInputs() {
    return (this.editMode || this.newTaxMode);
  }
  get shouldDisplayMoreButton() {
    return !(this.editMode || this.newTaxMode);
  }

  @action
  toggleOpenCard() {
    this.shouldDisplayOpenCard = !this.shouldDisplayOpenCard;
  }

  @action
  toggleOptionsPanel() {
    this.shouldDisplayMorePanel = !this.shouldDisplayMorePanel;
  }

  @action
  toggleEditMode() {
    this.editMode = !this.editMode;
    this.shouldDisplayMorePanel = false;
  }

  @action
  discardTaxEditions() {
    this.editMode = false;
  }

  @action
  openSaveModal() {
    // Save TAX Editions logic
    this.shouldDisplaySaveModal = true;
  }

  @action
  saveTaxEditions() {
    // Save tax editions logic
    this.shouldDisplaySaveModal = false;
    this.shouldDisplayConfirmationModal = true;
  }

  @action
  closeModals() {
    // close save modal logic
    this.shouldDisplaySaveModal = false;
    this.shouldDisplayConfirmationModal = false;
  }

  @action
  finishTaxEditionsSave() {
    this.closeModals();
    this.editMode = false;
    this.shouldDisplayOpenCard = false;
  }

  @action
  openTaxSaveModal() {
    // Save TAX Editions logic
    this.shouldDisplaySaveModal = true;
  }

  /* Home controller */
  @action
  saveNewTax() {
    this.args.saveNewTax();
    this.shouldDisplaySaveModal = false;
    this.shouldDisplayConfirmationModal = true;
  }

  @action
  closeNewTaxModal() {
    this.args.closeNewTaxModal();
  }
}
