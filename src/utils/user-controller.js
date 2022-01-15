import { AdApi } from './ad-api';
let user;
export class User {
  constructor(host) {
    this.host = host;
    this.api = new AdApi();
  }
  async __authUser() {
    try {
      user = await this.api.getCall('/porte-widget-bff/auth/user');
      return user;
    } catch (error) {
      user = null;
      return null;
    }
  }
}
