import Route from '@ember/routing/route';
import fetch from 'fetch';

export default class RulesRoute extends Route {
  async model() {
    let response;

    response = await fetch('http://localhost:3000/api/rules');
    const rules = await response.json();

    response = await fetch('http://localhost:3000/api/countries');
    const countries = await response.json();

    return { rules: rules.rules, countries: countries.countries };
  }
}
