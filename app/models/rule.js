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
  @attr meta;
  @attr vars;

  toJSON() {
    return {
      _id: this._id,
      country: this.country,
      taxName: this.taxName,
      validFrom: this.validFrom,
      validUntil: this.validUntil,
      category: this.category,
      bpVAT: this.bpVAT,
      orgVAT: this.orgVAT,
      bpType: this.bpType,
      docType: this.docType,
      whitholded: this.whitholded,
      txType: this.txType,
      rate: this.rate,
      amount: this.amount,
      meta: this.meta,
      vars: this.vars,
      status: this.status,
      patientSaudi: this.patientSaudi,
      bpIsPatient: this.bpIsPatient
    };
  }
}
