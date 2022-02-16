import Reader from '../reader/reader';
import Writer from '../writer/writer';
import LogLevel from '../enums/logLevel';
import Command from '../interfaces/command';
import Log from '../interfaces/Log';
import ErrorLog from '../interfaces/ErrorLog';

/**
 * service class executes Read/Transform/Write operations
 */
class Service {
  private reader: Reader = new Reader();
  private writer: Writer = new Writer();

  /**
   * Executes command [Read from readDir and write to writeDir]
   * @param {Command} command
   */
  public async execute(command: Command) {
    try {
      const logs = await this.reader.read(command.readFrom);
      const errors = logs.filter((log) => log.loglevel === LogLevel.ERROR);
      const transformed = this.transform(errors);
      await this.writer.write(command.writeTo, JSON.stringify(transformed, null, 2));
    } catch (err) {
      throw err;
    }
  }

  /**
   * Transform input log model into output model
   * @param {Array<Log>} logs
   * @return {Array<ErrorLog>}
   */
  public transform(logs: Array<Log>): Array<ErrorLog> {
    return logs.map((log) => ({
      timestamp: new Date(log.timestamp).getTime(),
      loglevel: log.loglevel,
      transactionId: log.meta.transactionId,
      err: log.meta.err,
    }));
  }
}

export default Service;
