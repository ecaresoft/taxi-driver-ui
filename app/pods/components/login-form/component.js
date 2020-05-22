import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class LoginFormComponent extends Component {
  @tracked user;
  @tracked password;
  @tracked rememberMe;
  @tracked disabled = this.args.disabled;

  get tooManyTries() {
    return (this.args.authTimes >= 3);
  }

  @action
  authenticate(event) {
    event.preventDefault();
    this.args.authenticate(this.user, this.password, this.rememberMe);
  }
}
