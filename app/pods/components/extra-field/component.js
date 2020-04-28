import Component from "@glimmer/component";
import { action } from "@ember/object";
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';

export default class ExtraFieldComponent extends Component {
  @tracked newFields = A([]);

  get field() {
    return this.args.field;
  }
  get editMode() {
    return this.args.editMode;
  }

  get key() {
    return this.field[0];
  }
  get value() {
    return this.field[1];
  }

  get isObject() {
    return this.field instanceof Object && !(this.field instanceof Array);
  }
  get valueIsObject() {
    return this.value instanceof Object && !(this.value instanceof Array);
  }
  get containsElements() {
    return this.isObject || this.valueIsObject;
  }

  get objectLabel() {
    if (this.isObject) {
      return "Additional data";
    } else if (this.valueIsObject) {
      return this.key;
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
      return Object.entries(this.value);
    }

    return [];
  }

  @action
  insertNewField() {
    this.newFields.unshiftObject({ '': '' });
  }
}
