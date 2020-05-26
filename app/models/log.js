import Model, { attr } from '@ember-data/model';

export default class CountryModel extends Model {
  @attr date;
  @attr('string') message;
}
