import Component from '@glimmer/component';
import { action } from "@ember/object";
import { tracked } from '@glimmer/tracking';

export default class CheckBoxComponent extends Component {

  constructor() {
    super(...arguments);
  }

  @tracked value = this.args.value;
  @tracked disabled = this.args.disabled;

  @tracked click = this.args.onClick;

  @action toggleValue() {
    if(this.disabled !== "true") {
      switch (this.value) {
        case true:
          this.value = false;
          break;
        case false:
          this.value = null;
          break;
        default:
          this.value = true;
      }

      if(this.click) {
        this.click(this.value);
      }
    }
  }
}
