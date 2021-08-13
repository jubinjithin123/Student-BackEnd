/**
 * @fileOverview File that has defined various functions to log the application events.
 * @file   logger.service.ts
 * @author dileep10060@ksfe.com
 * @since  1.0.0
 * @version 1.0.0
 */

import { createLogger, transports, format, Logger } from 'winston';
import { Injectable } from '@nestjs/common';

import { Config } from '../config';

@Injectable()
export class LoggerService {
  private LOG_FILE_PATH = `${Config.project.logPath}/app.log`;
  private ERR_LOG_FILE_PATH = `${Config.project.logPath}/error.log`;
  private size = Config.project.logFileSize;
  private multiplier = 1024;
  private MAX_FILE_SIZE = this.size * this.multiplier * this.multiplier; // 25MB
  private MAX_FILES = Config.project.noOfLogFiles;

  private logger: Logger;

  private options = {
    file: {
      level: 'info',
      filename: this.LOG_FILE_PATH,
      handleExceptions: true,
      json: true,
      maxsize: this.MAX_FILE_SIZE,
      maxFiles: this.MAX_FILES,
      colorize: false,
    },
    error: {
      level: 'error',
      filename: this.ERR_LOG_FILE_PATH,
      handleExceptions: true,
      json: true,
      maxsize: this.MAX_FILE_SIZE,
      maxFiles: this.MAX_FILES,
      colorize: false,
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    },
  };

  constructor() {
    this.logger = createLogger({
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.json(),
      ),
      transports: [
        new transports.File(this.options.file),
        new transports.File(this.options.error),
        // new transports.Console(this.options.console),
      ],
      exitOnError: false, // do not exit on handled exceptions
    });
  }

  getLogger(): Logger {
    return this.logger;
  }
}
