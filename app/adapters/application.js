import RESTAdapter from '@ember-data/adapter/rest';
import ENV from 'tax-engine-ui/config/environment';

export default class HomeAdapter extends RESTAdapter {
  host =  ENV.APP.baseUrl
  namespace = ENV.APP.basePath
}
