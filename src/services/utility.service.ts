/**
 * @fileOverview File that has defined various utility methods.
 * @file   utility.service.ts
 * @author dileep10060@ksfe.com
 * @since  1.0.0
 * @version 1.0.0
 */

import * as crypto from 'crypto';
//import * as moment from 'moment';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilityService {
  /* eslint-disable */
  public isObjectEmpty(obj: any): boolean {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
  public generateHash(message: string): string {
    const cryp = crypto.createHash('sha512');
    cryp.update(message);
    const hashedText = cryp.digest('hex');
    return hashedText;
  }

  public generateRandomHash(length: number): string {
    return crypto.randomBytes(length).toString('hex');
  }

  public getFileExtension(filename: string): string | undefined {
    return filename.split('.').pop();
  }

  public sanitizeInteger(input: number): number {
    return parseInt(input.toString().replace(/[^0-9\/ ]/g, ''));
  }

  public sanitizeString(input: string): string {
    return input.toString().replace(/[^a-zA-Z\/ ]/g, '');
  }

  public sanitizeAlphaNumericInput(input: string): string {
    return input.toString().replace(/[^a-zA-Z0-9\/.,_\*()@\-+= ]/g, '');
  }

  public removeObjectPrototype(input: Object): any {
    return JSON.parse(JSON.stringify(input));
  }

 /* public convertUTCToIST(inputDate: Date): string {
    let d = new Date(inputDate);
    let newDate = d.getTime() + 5.5 * 60 * 60 * 1000;
    return moment(newDate).format('YYYY-MM-DD HH:mm:ss');
  } */
  /* eslint-enable */
}
