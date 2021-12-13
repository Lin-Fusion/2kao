import { Service } from 'egg';

/**
 * Test Service
 */
export default class Error extends Service {
  public async error(error: string) {
    this.ctx.body={
      "suceess":false,
      "error":error
    }
  }
}
