import { ConsoleLogger, Injectable } from '@nestjs/common';
import 'dotenv/config';

@Injectable()
export class LoggerService extends ConsoleLogger {
  private logLevel = +process.env.LOG_LEVEL;

  constructor() {
    super();
  }

  async log(message: any): Promise<void> {
    if (this.logLevel < 1) return;
    super.log(message);
    this.saveLogs(message);
  }

  async error(message: any): Promise<void> {
    if (this.logLevel < 2) return;
    super.error(message);
    this.saveLogs(message);
  }

  async warn(message: any): Promise<void> {
    if (this.logLevel < 3) return;
    super.warn(message);
    this.saveLogs(message);
  }

  async debug(message: any): Promise<void> {
    if (this.logLevel < 4) return;
    super.debug(message);
    this.saveLogs(message);
  }

  async verbose(message: any): Promise<void> {
    if (this.logLevel < 5) return;
    super.verbose(message);
    this.saveLogs(message);
  }

  async saveLogs(message) {
    console.group('saveLogs');
    console.log('message', message);
    console.groupEnd();
  }
}
