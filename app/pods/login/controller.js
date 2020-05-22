import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from "@glimmer/tracking";

export default class LoginController extends Controller {
  @tracked errorMessage;
  @service session;

  @action
  async authenticate(user, password) {
    try {
      await this.session.authenticate('authenticator:oauth2', user, password);
    } catch (error) {
      this.errorMessage = error.error || error;
    }
  }
}
