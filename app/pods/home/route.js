import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class RulesRoute extends Route {
  model() {
    return RSVP.hash({
      rules: this.store.findAll('rule'),
      countries: this.store.findAll('country')
    });
  }
}
