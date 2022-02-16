import Utility from '../utility/utility';
import Log from '../interfaces/Log';

/**
 * Reader class reads the file from the directory and returns a Model object
 */
export default class Reader {
  private util = new Utility();

  /**
   * Will read the file from the directory and return unmarshalled model
   * @param {string} dir
   * @return {Promise<Array<Log>>}
   */
  public async read(dir: string): Promise<Array<Log>> {
    return await this.util.unmarshal(dir);
  }
}
