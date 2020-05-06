import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from '@glimmer/tracking';


export default class TaxComponent extends Component {
  constructor() {
    super(...arguments);
    this.draftRuleSetup();
  }

  @tracked editMode = false;
  newTaxMode = this.args.newTaxMode;

  /* Variables holding information about the model */
  @tracked draftRule;
  @tracked selectedCountry;
  @tracked selectedValidFrom;
  @tracked selectedValidUntil;
  @tracked selectedBPVAT;
  BPVATOptions = [
    { value: "", text: "-- Business Partner VAT --" },
    { value: "borderline", text: "borderline" }
  ];
  @tracked selectedORGVAT;
  ORGVATOptions = [
    { value: "", text: "-- Organization VAT --" },
    { value: "borderline", text: "borderline" }
  ];
  @tracked selectedBPType;
  BPTypeOptions = [
    { value: "", text: "-- Business Partner Type --" },
    { value: "INSCRIPTO", text: "INSCRIPTO" },
    { value: "NO_INSCRIPTO", text: "NO_INSCRIPTO" }
  ];
  @tracked draftMeta;
  @tracked draftVars;
  @tracked isIncomeType;
  @tracked isExpenseType;

  /* Information regarding the component behaviour */
  @tracked shouldDisplayOpenCard = this.newTaxMode;
  @tracked shouldDisplayMorePanel = false;
  @tracked shouldDisplaySaveModal = false;
  @tracked shouldDisplayConfirmationModal = false;

  get rule() {
    return this.args.rule;
  }
  get countries() {
    return this.args.countries;
  }

  get shouldDisplayInputs() {
    return (this.editMode || this.newTaxMode);
  }
  get shouldDisplayDropdownMenu() {
    return !this.shouldDisplayInputs;
  }
  get shouldContainHardInput() {
    return !this.shouldDisplayInputs;
  }
  get shouldDisplayMoreButton() {
    return !this.shouldDisplayInputs;
  }
  get shouldDisplayCollapsibleButton() {
    return !(this.newTaxMode);
  }

  get shouldDisplayWitholded() {
    return this.draftRule.whitholded !== null && this.draftRule.whitholded !== undefined;
  }
  get shouldDisplayTxType() {
    return this.isIncomeType || this.isExpenseType;
  }
  get shouldDisplayMeta() {
    return this.shouldDisplayInputs || Object.keys(this.rule.meta || {}).length > 0;
  }
  get shouldDisplayVars() {
    return this.shouldDisplayInputs || Object.keys(this.rule.vars || {}).length > 0;
  }

  @action
  draftRuleSetup() {
    if (this.args.rule) {
      this.draftRule = JSON.parse(JSON.stringify(this.args.rule));

      this.initialName = this.draftRule.taxName;

      this.selectedCountry = this.draftRule.country;
      this.selectedBPVAT = this.draftRule.bpVAT;
      this.selectedORGVAT = this.draftRule.orgVAT;
      this.selectedBPType = this.draftRule.bpType;

      this.selectedValidFrom = this.draftRule.validFrom;
      this.selectedValidUntil = this.draftRule.validUntil;

      this.draftMeta = this.draftRule.meta || {};
      this.draftVars = this.draftRule.vars || {};

      this.isIncomeType = this.draftRule.txType === "income";
      this.isExpenseType = this.draftRule.txType === "expense";

    } else {
      this.draftRule = {};

      this.draftMeta = {};
      this.draftVars = {};
    }
  }

  @action setSelectedCountry(event) {
    this.selectedCountry = event.target.value;
  }
  @action setSelectedBPVAT(event) {
    this.selectedBPVAT = event.target.value;
  }
  @action setSelectedBPType(event) {
    this.selectedBPType = event.target.value;
  }
  @action setSelectedORGVAT(event) {
    this.selectedORGVAT = event.target.value;
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
    this.draftRuleSetup();
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
    this.taxSaveSetup();

    this.args.saveNewTax(this.draftRule);
    this.shouldDisplaySaveModal = false;
    this.shouldDisplayConfirmationModal = true;
  }

  @action
  saveTaxEditions() {
    this.taxSaveSetup();

    this.args.saveTaxEditions(this.draftRule);
    this.shouldDisplaySaveModal = false;
    this.shouldDisplayConfirmationModal = true;
  }

  @action
  taxSaveSetup() {
    this.draftRule.country = this.selectedCountry;

    if (this.isIncomeType) {
      this.draftRule.txType = "income";
    } else if (this.isExpenseType) {
      this.draftRule.txType = "expense";
    } else {
      this.draftRule.txType = null;
    }

    if (Object.keys(this.draftMeta).length) {
      this.draftRule.meta = this.draftMeta;
    }
    if (Object.keys(this.draftVars).length) {
      this.draftRule.vars = this.draftVars;
    }

    this.draftRule.validFrom =
      (Array.isArray(this.selectedValidFrom)) ?
        this.selectedValidFrom[0] : new Date(this.selectedValidFrom);

    this.draftRule.validUntil =
      (Array.isArray(this.selectedValidUntil)) ?
        this.selectedValidUntil[0] : new Date(this.selectedValidUntil);

  }

  @action
  closeNewTaxModal() {
    this.args.closeNewTaxModal();
  }
}
