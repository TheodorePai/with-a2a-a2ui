import { LOG_CONFIG } from './config.js';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LOG_LEVEL = LOG_CONFIG.level;

const LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
};

function shouldLog(level: LogLevel): boolean {
  return LEVELS[level] >= LEVELS[LOG_LEVEL];
}

function formatTimestamp(): string {
  return new Date().toISOString();
}

export const logger = {
  debug(message: string, ...args: unknown[]): void {
    if (shouldLog('debug')) {
      console.debug(`[${formatTimestamp()}] [DEBUG]`, message, ...args);
    }
  },

  info(message: string, ...args: unknown[]): void {
    if (shouldLog('info')) {
      console.info(`[${formatTimestamp()}] [INFO]`, message, ...args);
    }
  },

  warn(message: string, ...args: unknown[]): void {
    if (shouldLog('warn')) {
      console.warn(`[${formatTimestamp()}] [WARN]`, message, ...args);
    }
  },

  error(message: string, ...args: unknown[]): void {
    if (shouldLog('error')) {
      console.error(`[${formatTimestamp()}] [ERROR]`, message, ...args);
    }
  }
};
