'use strict';

module.exports = {
  db:  process.env.AGNI_MONGODB_URL || 'mongodb://localhost/agni-dev',
  debug: 'true',
  mongoose: {
    debug: false
  },
  app: {
    name: 'AGNI Fitness'
  },
  facebook: {
    clientID: '1495105934103825',
    clientSecret:  '05e5fa118a171a3c3025ec70de7807f1',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  },
  twitter: {
    clientID: 'TWITTER_CONSUMER_KEY',
    clientSecret: 'CONSUMER_SECRET',
    callbackURL: 'http://localhost:3000/auth/twitter/callback'
  },
  github: {
    clientID: 'DEFAULT_APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/github/callback'
  },
  google: {
    clientID: 'DEFAULT_APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  linkedin: {
    clientID: 'DEFAULT_API_KEY',
    clientSecret: 'SECRET_KEY',
    callbackURL: 'http://localhost:3000/auth/linkedin/callback'
  },
  emailFrom: 'SENDER EMAIL ADDRESS', // sender address like ABC <abc@example.com>
  mailer: {
    service: 'SERVICE_PROVIDER', // Gmail, SMTP
    auth: {
      user: 'EMAIL_ID',
      pass: 'PASSWORD'
    }
  }
};
