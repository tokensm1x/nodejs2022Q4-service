import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');
  async use(req: any, res: any, next: any) {
    const { url, method, query, body, params } = req;
    const requestLog = {
      method,
      query,
      params,
      body,
      url,
    };
    this.logger.log('request:' + JSON.stringify(requestLog));
    next();
  }
}
