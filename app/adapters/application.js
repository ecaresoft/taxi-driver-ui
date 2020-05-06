import RESTAdapter from '@ember-data/adapter/rest';

export default class HomeAdapter extends RESTAdapter {
  namespace = 'api';
  // host = process.env.BACKEND || 'http://localhost:3000';
  host = 'http://localhost:3000';
}
