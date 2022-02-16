import * as fs from 'fs';
import Log from '../interfaces/Log';
import Command from '../interfaces/command';

/**
 * Utility class unmarshall file to data interfaces and generate execution command from argv
 */
export default class Utility {
  /**
   * Unmarshal log file to defined model for further processing
   * @param {string} dir
   * @return {Promise<Array<Log> | Error>}
   */
  public async unmarshal(dir: string) {
    try {
      const contents = fs.readFileSync(dir, 'utf-8').split(/\r?\n/);

      let logs: Array<Log> = [];

      contents.forEach((line) => {
        if (line.length) {
          const splinter = line.split(' - ');
          logs.push({
            timestamp: splinter[0],
            loglevel: splinter[1],
            meta: JSON.parse(splinter[2]),
          });
        }
      });
      return logs;
    } catch (err) {
      return err;
    }
  }

  /**
   * Generate command object with args
   * @param {Array<string>} args
   * @return {Command}
   */
  public generateCommand(args: Array<string>): Command {
    const command: Command = {
      readFrom: args[1],
      writeTo: args[3],
    };
    return command;
  }
}
