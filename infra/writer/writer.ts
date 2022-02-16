import * as fs from 'fs';

/**
 * Writer class have write operation responsibility
 */
export default class Writer {
  /**
   * Will write file in the specified directory
   * @param {string} filename
   * @param {string} content
   */
  public async write(filename: string, content: string) {
    try {
      fs.writeFileSync(filename, content);
    } catch (err) {
      console.error(err);
    }
  }
}
