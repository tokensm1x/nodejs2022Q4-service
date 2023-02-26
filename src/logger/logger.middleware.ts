import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');
  async use(req: Request, res: Response, next: NextFunction) {
    const rawResponseEnd = res.end;
    const chunkBuffers = [];
    const { url, method, query, body, params } = req;
    const reqDate = new Date().toISOString();
    const requestLog = {
      date: reqDate + ' UTC',
      method,
      query,
      params,
      body,
      url,
    };
    res.end = (...chunk) => {
      const resDate = new Date().toISOString();
      const resArgs = [];
      for (let i = 0; i < chunk.length; i++) {
        resArgs[i] = chunk[i];
      }
      if (resArgs[0]) {
        chunkBuffers.push(Buffer.from(resArgs[0]));
      }
      const body = Buffer.concat(chunkBuffers).toString('utf8');
      res.setHeader('origin', 'restjs-req-res-logging-repo');
      const responseLog = {
        date: resDate + ' UTC',
        statusCode: res.statusCode,
        body: JSON.parse(body) || body || {},
      };
      this.logger.log('request:' + this.toJSON(requestLog));
      this.logger.log('response:' + this.toJSON(responseLog));
      rawResponseEnd.apply(res, resArgs);
      return responseLog as unknown as Response;
    };
    next();
  }

  toJSON(object): string {
    return JSON.stringify(object);
  }
}
