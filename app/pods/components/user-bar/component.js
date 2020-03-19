import Component from "@glimmer/component";
import { action } from "@ember/object";

export default class UserBarComponent extends Component {

  @action
  logout() {
    // Logout logic
  }
}
