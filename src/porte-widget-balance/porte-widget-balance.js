import { PorteWidgetBase } from '../utils/porte-widget-base.js';
import { defineElement } from '../utils/define-element.js';
import { html } from 'lit';
import styles from './porte-widget-balance.scss';
import { AdApi } from '../utils/ad-api.js';
import '@populus/squid/dist/squid-container/squid-container.js';
import '@populus/squid/dist/squid-hero-number/squid-hero-number.js';
export class PorteWidgetBalance extends PorteWidgetBase {
  static get properties() {
    return {
      userId: {
        type: String,
      },
      balance: {
        type: String,
        attribute: false,
      },
    };
  }
  static get scope() {
    return {};
  }
  static get styles() {
    return [styles];
  }

  constructor() {
    super();
    this.api = new AdApi();
    this.balance = '0.0';
  }
  firstUpdated() {
    this.buildRefs();
    this.getUserBalance();
  }
  render() {
    return html`
      <squid-container elevation="2" padding="medium" radius="4">
      <div class='title'>${this.account_name}</div>
      <squid-hero-number number="${this.balance}" label="balance" local="en-US" currency="USD" aligment="center">
      </squid-hero-number
      
      </squid-container>
    `;
  }
  async getUserBalance() {
    let response = await this.api.getCall(
      `/porte-widget-bff/balance/${this.userId}`
    );
    console.log(response);
    this.balance = response.balance;
    this.account_name = response.account_name;
  }
}
defineElement('porte-widget-balance', PorteWidgetBalance);
