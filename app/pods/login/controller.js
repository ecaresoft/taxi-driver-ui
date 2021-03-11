import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from "@glimmer/tracking";

export default class LoginController extends Controller {
  @tracked errorMessage;
  @service session;
  @tracked authTimes = 0;

  

  @action
  async authenticate(user, password) {
    try {
      await this.session.authenticate('authenticator:oauth2', user, password);

    } catch (error) {
      this.authTimes++;

      const errorResponse = error.responseJSON;
      this.errorMessage = (errorResponse) ?
        errorResponse.error : this.errorMessage = error;

      if (this.errorMessage.status === 204) {
        this.errorMessage = "No conection with backend";
      }
      // Handle other types of errors

      if (this.authTimes >= 3) {
        this.errorMessage = "Login done too many times";
        // Auth failed many times logic
      }
    }
  }
}
