/**
 * @fileOverview File that has defined database connectivity.
 * @file   connection.ts
 * @author dileep10060@ksfe.com
 * @since  1.0.0
 * @version 1.0.0
 */

import { MongooseModule } from '@nestjs/mongoose';
import { Config } from './environment';
/*
export const Connection = MongooseModule.forRoot(
  `mongodb://${Config.db.user}:${Config.db.password}@${Config.db.host}:${Config.db.port}/${Config.db.database}`,
);
*/