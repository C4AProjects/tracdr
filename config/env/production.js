'use strict';

module.exports = {
  db:  process.env.TRACDR_MONGODB_URL || 'mongodb://localhost/tracdr-prod',
  debug: 'false',
  mongoose: {
    debug: false
  },
  /**
   * Database options that will be passed directly to mongoose.connect
   * Below are some examples.    mongodb://agni_user:agni_password@localhost/agni_db
   * See http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html#mongoclient-connect-options
   * and http://mongoosejs.com/docs/connections.html for more information
   */
  dbOptions: {
    /*
    server: {
        socketOptions: {
            keepAlive: 1
        },
        poolSize: 5
    },
    replset: {
      rs_name: 'myReplicaSet',
      poolSize: 5
    },
    db: {
      w: 1,
      numberOfRetries: 2
    }
    */
  },
  app: {
    name: 'TracDr App - Production'
  },
  facebook: {
    clientID: process.env.FACEBOOK_ID || '1495105934103825',
    clientSecret:  process.env.FACEBOOK_SECRET || '05e5fa118a171a3c3025ec70de7807f1',
    callbackURL: 'http://' + process.env.HOST + '/auth/facebook/callback' || 'http://localhost:3000/auth/facebook/callback'
  },
  twitter: {
    clientID: process.env.TWITTER_CONSUMER_KEY || 'TWITTER_CONSUMER_KEY',
    clientSecret: process.env.TWITTER_CONSUMER_SECRET || 'CONSUMER_SECRET',
    callbackURL: 'http://' + process.env.HOST + '/auth/twitter/callback'
  },
  github: {
    clientID: 'DEFAULT_APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: 'http://' + process.env.HOST + '/auth/github/callback'
  },
  google: {
    clientID: process.env.GOOGLE_CONSUMER_KEY || 'GOOGLE_CONSUMER_KEY',
    clientSecret: process.env.GOOGLE_CONSUMER_SECRET || 'CONSUMER_SECRET',
    callbackURL: 'http://' + process.env.HOST + '/auth/google/callback'
  },
  linkedin: {
    clientID: 'DEFAULT_API_KEY',
    clientSecret: 'SECRET_KEY',
    callbackURL: 'http://' + process.env.HOST + '/auth/linkedin/callback'
  },
  emailFrom: 'SENDER EMAIL ADDRESS', // sender address like ABC <abc@example.com>
  mailer: {
    service: 'SERVICE_PROVIDER',
    auth: {
      user: 'EMAIL_ID',
      pass: 'PASSWORD'
    }
  }
};
