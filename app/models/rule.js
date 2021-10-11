import Model, { attr } from '@ember-data/model';

export default class RuleModel extends Model {
  @attr('string') lastUserUpdate;
  @attr _id;
  @attr('string') country;
  @attr('string') taxName;
  @attr('date') validFrom;
  @attr('date') validUntil;
  @attr('string') category;
  @attr('string') bpVAT;
  @attr('string') orgVAT;
  @attr('string') bpType;
  @attr('string') docType;
  @attr('boolean') patientSaudi;
  @attr('boolean') bpIsPatient;
  @attr('boolean') whitholded;
  @attr('string') txType;
  @attr('string') rate;
  @attr('string') amount;
  @attr('string') status;
  @attr meta;
  @attr vars;

}
