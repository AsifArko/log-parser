import * as fs from 'fs';

import Service from '../../../infra/service/service';
import Writer from '../../../infra/writer/writer';
import Command from '../../../infra/interfaces/command';

import { LOG_1, LOG_2, LOG_3 } from '../../mocks/logs';

describe('Test service execution for log files where error log may or may not exists', () => {
  const service = new Service();
  const writer: Writer = new Writer();

  const inputFile = 'app.log';
  const outputFile = 'errors.json';

  describe('Test service execution for a log file with two error log', () => {
    beforeAll(async () => {
      await writer.write(`${__dirname}/${inputFile}`, LOG_1);
    });

    afterAll(async () => {
      fs.unlinkSync(`${__dirname}/${inputFile}`);
      fs.unlinkSync(`${__dirname}/${outputFile}`);
    });

    test('Should pass. It creates a errors.json file with two error objects inside an array', async () => {
      expect(fs.readdirSync(__dirname).length).toBe(2);

      const command: Command = {
        readFrom: `${__dirname}/${inputFile}`,
        writeTo: `${__dirname}/${outputFile}`,
      };

      await service.execute(command);

      expect(fs.readdirSync(__dirname).length).toBe(3);

      const errors = JSON.parse(fs.readFileSync(`${__dirname}/errors.json`, 'utf8'));
      expect(errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            timestamp: 1628475171259,
            loglevel: 'error',
            transactionId: '9abc55b2-807b-4361-9dbe-aa88b1b2e978',
            err: 'Not found',
          }),
          expect.objectContaining({
            timestamp: 1628475171259,
            loglevel: 'error',
            transactionId: '8cbr6tb2-807b-4361-9dbe-aa88b1b2y76g',
            err: 'Bad request',
          }),
        ]),
      );
    });
  });

  describe('Test service execution for a log file with one error log', () => {
    beforeAll(async () => {
      await writer.write(`${__dirname}/${inputFile}`, LOG_2);
    });

    afterAll(async () => {
      fs.unlinkSync(`${__dirname}/${inputFile}`);
      fs.unlinkSync(`${__dirname}/${outputFile}`);
    });

    test('Should pass. It creates a errors.json file with one error objects inside an array', async () => {
      expect(fs.readdirSync(__dirname).length).toBe(2);

      const command: Command = {
        readFrom: `${__dirname}/${inputFile}`,
        writeTo: `${__dirname}/${outputFile}`,
      };

      await service.execute(command);

      expect(fs.readdirSync(__dirname).length).toBe(3);

      const errors = JSON.parse(fs.readFileSync(`${__dirname}/errors.json`, 'utf8'));
      expect(errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            timestamp: 1628475171259,
            loglevel: 'error',
            transactionId: '9abc55b2-807b-4361-9dbe-aa88b1b2e978',
            err: 'Not found',
          }),
        ]),
      );
    });
  });

  describe('Test service execution for a log file with no error log but others', () => {
    beforeAll(async () => {
      await writer.write(`${__dirname}/${inputFile}`, LOG_3);
    });

    afterAll(async () => {
      fs.unlinkSync(`${__dirname}/${inputFile}`);
      fs.unlinkSync(`${__dirname}/${outputFile}`);
    });

    test('Should pass. It creates a errors.json file with empty array', async () => {
      expect(fs.readdirSync(__dirname).length).toBe(2);

      const command: Command = {
        readFrom: `${__dirname}/${inputFile}`,
        writeTo: `${__dirname}/${outputFile}`,
      };

      await service.execute(command);

      expect(fs.readdirSync(__dirname).length).toBe(3);

      const errors = JSON.parse(fs.readFileSync(`${__dirname}/errors.json`, 'utf8'));
      expect(errors.length).toEqual(0);
    });
  });

  describe('Test service execution for a empty log file', () => {
    beforeAll(async () => {
      await writer.write(`${__dirname}/${inputFile}`, '');
    });

    afterAll(async () => {
      fs.unlinkSync(`${__dirname}/${inputFile}`);
      fs.unlinkSync(`${__dirname}/${outputFile}`);
    });

    test('Should pass. It creates a errors.json file with empty array since there are not logs in the actual app log', async () => {
      expect(fs.readdirSync(__dirname).length).toBe(2);

      const command: Command = {
        readFrom: `${__dirname}/${inputFile}`,
        writeTo: `${__dirname}/${outputFile}`,
      };

      await service.execute(command);

      expect(fs.readdirSync(__dirname).length).toBe(3);

      const errors = JSON.parse(fs.readFileSync(`${__dirname}/errors.json`, 'utf8'));
      expect(errors.length).toEqual(0);
    });
  });
});
