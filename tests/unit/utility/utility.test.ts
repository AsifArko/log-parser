import { LOG_1 } from '../../mocks/logs';
import fs from 'fs';
import Writer from '../../../infra/writer/writer';
import Utility from '../../../infra/utility/utility';
import LogLevel from '../../../infra/enums/logLevel';

describe('Test utility unmarshal file in to Log model', () => {
  const writer: Writer = new Writer();
  const utility: Utility = new Utility();

  describe('A valid input file path is provided', () => {
    const inputFile = 'app.log';
    const path = `${__dirname}/${inputFile}`;
    describe('Should unmarshal application logs into defined Log model', () => {
      beforeAll(async () => {
        await writer.write(path, LOG_1);
      });

      afterAll(async () => {
        fs.unlinkSync(path);
      });

      test('Should pass because valid application log file is provided', async () => {
        expect(fs.readdirSync(__dirname).length).toBe(2);
        const logs = await utility.unmarshal(path);

        const error = logs.filter((log) => log.loglevel === LogLevel.ERROR);
        const info = logs.filter((log) => log.loglevel === LogLevel.INFO);
        const debug = logs.filter((log) => log.loglevel === LogLevel.DEBUG);
        const warn = logs.filter((log) => log.loglevel === LogLevel.WARN);

        expect(logs.length).toBe(13);
        expect(error.length).toBe(2);
        expect(info.length).toBe(3);
        expect(debug.length).toBe(7);
        expect(warn.length).toBe(1);
      });
    });
  });

  describe('A invalid input file path is provided', () => {
    const inputFile = 'app.log';
    const path = `${__dirname}/${inputFile}`;

    describe('Should unmarshal application logs into defined Log model', () => {
      test('Should pass because valid application log file is provided', async () => {
        const response = await utility.unmarshal(path);
        const error = JSON.parse(JSON.stringify(response));
        expect(error.code).toBe('ENOENT');
        expect(error.errno).toBe(-2);
      });
    });
  });
});
