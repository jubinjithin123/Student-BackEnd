/**
 * @fileOverview File that has defined various validation methods.
 * @file   validator.service.ts
 * @author dileep10060@ksfe.com
 * @since  1.0.0
 * @version 1.0.0
 */

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Config } from '../config';

@Injectable()
export class ValidatorService {
  public validateEmail(input: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(input).toLowerCase());
  }

  public validateString(input: string): boolean {
    const regeX = /^[a-zA-Z ]*$/;
    return regeX.test(input);
  }

  public validateAlphaNumeric(input: string): boolean {
    const regeX = /^[a-zA-Z0-9,.\/_()\- ]*$/;
    return regeX.test(input);
  }

  public validateMobileNumber(input: string): boolean {
    if (input.length < 10) {
      return false;
    }
    return true;
  }

  public validateDate(input: string): boolean {
    const regeX = /^\d{2}\/\d{2}\/\d{4}$/;
    return regeX.test(input);
  }

  async verifyToken(token: string): Promise<boolean> {
    const jwtService: JwtService = new JwtService({});
    const verifiedToken = await jwtService.verify(token, {
      secret: Config.project.secretKey,
    });
    console.log(verifiedToken);
    return true;
  }
}
