import * as Sentry from '@sentry/nextjs';

const tracesSampleRate = Number.parseFloat(
  process.env.SENTRY_TRACES_SAMPLE_RATE ||
    process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE ||
    '0.1'
);

const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn,
  enabled: Boolean(dsn),
  environment: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV,
  tracesSampleRate: Number.isFinite(tracesSampleRate) ? tracesSampleRate : 0.1,
});
