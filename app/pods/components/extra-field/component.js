import Component from "@glimmer/component";
import { action } from "@ember/object";
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';

export default class ExtraFieldComponent extends Component {
  constructor() {
    super(...arguments);

    this.fieldKey = this.args.field[0];
    this.fieldValue = this.args.field[1];
  }

  @tracked newFields = A([]);
  @tracked fieldKey;
  @tracked fieldValue;

  get field() {
    return this.args.field;
  }
  get editMode() {
    return this.args.editMode;
  }

  get isObject() {
    return this.field instanceof Object && !(this.field instanceof Array);
  }
  get valueIsObject() {
    return this.fieldValue instanceof Object && !(this.fieldValue instanceof Array);
  }
  get containsElements() {
    return this.isObject || this.valueIsObject;
  }

  get objectLabel() {
    if (this.isObject) {
      return "Additional data";
    } else if (this.valueIsObject) {
      return this.fieldKey;
    }

    return undefined;
  }

  get objectToArray() {
    return Object.entries(this.field);
  }
  get valueToArray() {
    return Object.entries(this.fieldValue);
  }
  get elementsToArray() {
    if (this.isObject) {
      return Object.entries(this.field);
    } else if (this.valueIsObject) {
      return Object.entries(this.fieldValue);
    }

    return [];
  }

  @action
  insertNewField() {
    this.newFields.unshiftObject({ '': '' });
  }

  @action
  updateExtras() {
    // To be implemented
    // this.args.updateExtras(this.fieldKey, this.fieldValue);
  }
}
