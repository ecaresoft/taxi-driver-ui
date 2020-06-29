'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'tax-engine-ui',
    podModulePrefix: 'tax-engine-ui/pods',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      baseUrl: '',
      basePath: 'api'
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'staging') {
    ENV.APP.baseUrl = 'http://taxi-driver-stg-lb-284963706.us-west-2.elb.amazonaws.com:3000';
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  ENV.APP.apiUrl = `${ENV.APP.baseUrl}/${ENV.APP.basePath}`;

  return ENV;
};
