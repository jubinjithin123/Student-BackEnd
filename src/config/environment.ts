/**
 * @fileOverview File that has defined various environment variables.
 * @file   environment.ts
 * @author dileep10060@ksfe.com
 * @since  1.0.0
 * @version 1.0.0
 */

import { Get } from '@nestjs/common';
import * as DotEnv from 'dotenv';
import * as GetEnv from 'getenv';

DotEnv.config();

export const Config = {
  db: {
    host: GetEnv.string('DB_HOST'),
    port: GetEnv.string('DB_PORT'),
    user: GetEnv.string('DB_USER'),
    password: GetEnv.string('DB_PASSWORD'),
    database: GetEnv.string('DB_NAME'),
  },
  project: {
    environment: GetEnv.string('ENVIRONMENT'),
    name: GetEnv.string('PROJECT_NAME'),
    port: GetEnv.int('PORT'),
    secretKey: GetEnv.string('SECRET_KEY'),
    tokenExpiryTime: GetEnv.string('TOKEN_EXPIRY_TIME'),
    homeUrl: GetEnv.string('HOME_URL'),
    logPath: GetEnv.string('LOG_PATH'),
    logFileSize: GetEnv.int('LOG_FILE_SIZE'),
    noOfLogFiles: GetEnv.int('NO_OF_LOG_FILES'),
    localPath: GetEnv.string('LOCAL_PATH'),
  },

  ldap: {
    ldap_url: GetEnv.string('LDAP_URL'),
  }, 
};
