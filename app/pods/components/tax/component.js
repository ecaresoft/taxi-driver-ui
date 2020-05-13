import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from '@glimmer/tracking';


export default class TaxComponent extends Component {
  constructor() {
    super(...arguments);
    this.draftRuleSetup();
  }

  @tracked editMode = false;
  @tracked newTaxMode = this.args.newTaxMode;

  @tracked selectedCountry;

  displayedFields = ["_id", "country", "taxName", "validFrom", "validUntil",
    "category", "whitholded", "txType", "rate"];

  get rule() {
    return this.args.rule;
  }

  get countries() {
    return this.args.countries;
  }

  @tracked draftRule;

  @tracked isIncomeType;
  @tracked isExpenseType;

  @tracked bpVATSelected;
  @tracked bpVATOptions = [
    { optText: 'None', value: 'none' },
    { optText: 'Option B', value: 'optionB' },
    { optText: 'Option C', value: 'optionC' }
  ];

  /* Information regarding the component behaviour */
  @tracked shouldDisplayOpenCard = this.newTaxMode;
  @tracked shouldDisplayMorePanel = false;
  @tracked shouldDisplaySaveModal = false;
  @tracked shouldDisplayConfirmationModal = false;

  get extraFields() {
    const extraFields = {};

    Object.keys(this.draftRule).forEach(key => {
      if (!this.displayedFields.includes(key)) {
        extraFields[key] = this.draftRule[key];
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
  draftRuleSetup() {
    if (this.args.rule) {
      this.draftRule = this.args.rule;

      this.selectedCountry = this.draftRule.country;
      this.isIncomeType = this.draftRule.txType === "income";
      this.isExpenseType = this.draftRule.txType === "expense";
    } else {
      this.draftRule = {};
    }
  }

  @action setSelectedCountry(value) {
    this.selectedCountry = value;
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
  updateExtras(key, value) {
    this.draftRule[key] = value;
  }

  @action
  openSaveModal() {
    // Save TAX Editions logic
    this.shouldDisplaySaveModal = true;
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
    this.args.saveNewTax(this.draftRule);
    this.shouldDisplaySaveModal = false;
    this.shouldDisplayConfirmationModal = true;
  }

  @action
  saveTaxEditions() {
    this.draftRule.country = this.selectedCountry;


    this.args.saveTaxEditions(this.draftRule);
    this.shouldDisplaySaveModal = false;
    this.shouldDisplayConfirmationModal = true;
  }

  @action
  closeNewTaxModal() {
    this.args.closeNewTaxModal();
  }
}
