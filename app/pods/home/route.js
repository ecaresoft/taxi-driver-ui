import Route from '@ember/routing/route';

export default class RulesRoute extends Route {
  async model() {
    let rules = await this.store.findAll('rule');
    let countries = await this.store.findAll('country');

    return { rules, countries };
  }
}
