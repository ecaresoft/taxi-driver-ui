import Model, { attr } from '@ember-data/model';

export default class CountryModel extends Model {
  @attr _id;
  @attr('string') code;
  @attr('string') name;

  toJSON() {
    return {
      _id: this._id,
      code: this.code,
      name: this.name
    };
  }
}
