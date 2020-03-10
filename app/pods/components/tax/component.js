import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from '@glimmer/tracking';


export default class TaxComponent extends Component {
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
}
