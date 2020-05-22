import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class LoginFormComponent extends Component {
  @tracked user;
  @tracked password;
  @tracked rememberMe;

  @action
  authenticate() {
    this.args.authenticate(this.user, this.password, this.rememberMe);
  }
}
