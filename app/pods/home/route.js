import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RSVP from 'rsvp';

export default class RulesRoute extends Route.extend(AuthenticatedRouteMixin) {
  model() {
    return RSVP.hash({
      rules: this.store.findAll('rule'),
      countries: this.store.findAll('country'),
      logs: this.store.findAll('log')
    });
  }
}
