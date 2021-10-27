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
  @attr('boolean', { allowNull: true }) patientSaudi;
  @attr('boolean', { allowNull: true }) bpIsPatient;
  @attr('boolean', { allowNull: true }) whitholded;
  @attr('string') txType;
  @attr('string') rate;
  @attr('string') amount;
  @attr('string') status;
  @attr('number') sequence;
  @attr meta;
  @attr vars;

}
