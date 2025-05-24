import * as Sentry from '@sentry/node'

// Ensure to call this before importing any other modules!
Sentry.init({
  dsn: 'https://434eae9599a512b3ee976ec36c1602be@o4509338600013824.ingest.de.sentry.io/4509338608336976',

  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/node/configuration/options/#sendDefaultPii
  sendDefaultPii: true
})
