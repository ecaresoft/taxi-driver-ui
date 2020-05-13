import Model, { attr } from '@ember-data/model';

export default class RuleModel extends Model {
  @attr _id;
  @attr('string') country;
  @attr('string') taxName;
  @attr('date') validFrom;
  @attr('date') validUntil;
  @attr('string') category;
  @attr('boolean') whitholded;
  @attr('string') txType;
  @attr('number') rate;
}
