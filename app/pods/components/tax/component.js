import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from '@glimmer/tracking';


export default class TaxComponent extends Component {
  @tracked editMode = false;
  @tracked newTaxMode = this.args.newTaxMode;

  get rule() {
    return this.args.rule;
  }

  get countriesList() {
    return this.args.countries;
  }

  @tracked taxName = this.rule.taxName;
  @tracked selectedCountry = this.rule.country;
  @tracked validFrom = this.rule.validFrom;
  @tracked validUntil = this.rule.validUntil;
  @tracked productCategory = this.rule.category;
  @tracked bpVATSelected = 'optionB';
  @tracked bpVATOptions = [
    { optText: 'None', value: 'none' },
    { optText: 'Option B', value: 'optionB' },
    { optText: 'Option C', value: 'optionC' }
  ];
  @tracked whitholded = this.rule.whitholded;
  @tracked TAXTypeIncomeCheck = this.rule.txType === "income";
  @tracked TAXTypeExpenseCheck = this.rule.txType === "expense";
  @tracked taxRate = this.rule.rate;

  /* Information regarding the component behaviour */
  @tracked shouldDisplayOpenCard = this.newTaxMode;
  @tracked shouldDisplayMorePanel = false;
  @tracked shouldDisplaySaveModal = false;
  @tracked shouldDisplayConfirmationModal = false;

  get extraFields() {
    const displayedFields = ["_id", "country", "taxName", "validFrom", "validUntil",
      "category", "whitholded", "txType", "rate"];
    const extraFields = {};

    Object.keys(this.rule).forEach(key => {
      if (!displayedFields.includes(key)) {
        extraFields[key] = this.rule[key];
      }
    });

    if (!Object.keys(extraFields).length) {
      return false;
    }

    return extraFields;
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
