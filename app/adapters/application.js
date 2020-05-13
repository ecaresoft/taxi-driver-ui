import RESTAdapter from '@ember-data/adapter/rest';

export default class HomeAdapter extends RESTAdapter {
  namespace = 'api';
  host = 'http://localhost:3000';
}
