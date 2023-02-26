import { ConsoleLogger, Injectable } from '@nestjs/common';
import 'dotenv/config';
import * as path from 'path';
import { mkdir, readdir } from 'fs/promises';
import { statSync } from 'fs';
import { writeFile, appendFile } from 'fs/promises';

@Injectable()
export class LoggerService extends ConsoleLogger {
  private logLevel = +process.env.LOG_LEVEL;
  private fileSize = +process.env.LOG_FILE_SIZE;
  private logsDirname = './logs';

  constructor() {
    super();
  }

  async log(message: any): Promise<void> {
    super.log(message);
    await this.saveLogs(message);
  }

  async error(message: any): Promise<void> {
    if (this.logLevel < 2) return;
    super.error(message);
    await this.saveLogs(message, true);
  }

  async warn(message: any): Promise<void> {
    if (this.logLevel < 3) return;
    super.warn(message);
    await this.saveLogs(message);
  }

  async debug(message: any): Promise<void> {
    if (this.logLevel < 4) return;
    super.debug(message);
    await this.saveLogs(message);
  }

  async verbose(message: any): Promise<void> {
    if (this.logLevel < 5) return;
    super.verbose(message);
    await this.saveLogs(message);
  }

  async saveLogs(message, isError?): Promise<void> {
    await mkdir(path.join(__dirname, `logs`), { recursive: true });
    const dirname = path.resolve(__dirname, `logs`);
    const files = await readdir(dirname);
    const date = new Date();
    if (files.length) {
      const filesWithDates = files
        .map((el) => {
          const { ctime, size } = statSync(path.join(__dirname, `logs/${el}`));
          return {
            name: el,
            time: new Date(ctime.toISOString()),
            size: size / 1000,
          };
        })
        .sort((a: any, b: any) => {
          return b.time - a.time;
        });
      const logFile = filesWithDates[0];
      if (logFile.size > this.fileSize) {
        await this.createLogFile(message, date);
      } else {
        await appendFile(
          path.join(__dirname, `logs/${logFile.name}`),
          `${date.toISOString()} UTC ${isError ? 'ERROR' : 'LOG'}: ` +
            message +
            '\n',
        );
      }
    } else {
      await this.createLogFile(message, date);
    }
  }

  async createLogFile(message, date): Promise<void> {
    await writeFile(
      path.join(
        __dirname,
        `logs/app-${date.getDate()}-${date.getMonth()}-${date.getFullYear()}_${Date.now()}.log`,
      ),
      `${date.toISOString()} LOG: ` + message + '\n',
    );
  }
}
