'use strict';

module.exports = {
  // App name
  appName: 'Rocket Rides',

  // Public domain of Rocket Rides
  publicDomain: 'http://localhost:3000',

  // Server port
  port: 3000,

  // Secret for cookie sessions
  secret: 'YOUR_SECRET',

  // Configuration for Stripe
  // API Keys: https://dashboard.stripe.com/account/apikeys
  // Connect Settings: https://dashboard.stripe.com/account/applications/settings
  stripe: {
    secretKey: 'sk_live_0Lyg92PieKjWU24kMwDNMpaA00cBrQyl31',
    publishableKey: 'pk_live_rgst8ZiOfxYZbV2crM4HlhPo00D4xd0oeI',
    clientId: 'ca_HBHzn2Adfpjrqc1WNmyg3jRUdEliXti1',
    authorizeUri: 'https://connect.stripe.com/express/oauth/authorize',
    tokenUri: 'https://connect.stripe.com/oauth/token'
  },

  // Configuration for MongoDB
  mongoUri: 'mongodb://localhost/rocketrides',

  // Configuration for Google Cloud (only useful if you want to deploy to GCP)
  gcloud: {
    projectId: 'YOUR_PROJECT_ID'
  }
};
