import { PorteWidgetBase } from '../utils/porte-widget-base.js';
import { defineElement } from '../utils/define-element.js';
import { html } from 'lit';
import styles from './porte-widget-card-number.scss';
import '@populus/squid/dist/squid-input/squid-input.js';
import '@populus/squid/dist/squid-button/squid-button.js';
import '@populus/squid/dist/squid-input-mask/squid-input-mask.js';
import '../porte-widget-card-input/porte-widget-card-input.js';
export class PorteWidgetCardNumber extends PorteWidgetBase {
  static get properties() {
    return {};
  }
  static get scope() {
    return {};
  }
  static get styles() {
    return [styles];
  }

  constructor() {
    super();
  }
  firstUpdated() {
    this.buildRefs();
  }
  async getEncrypt() {
    let data = {
      values: [],
    };
    this.renderRoot.querySelectorAll('[formInput]').forEach((item) => {
      let value = item.value;
      if (item.getAttribute('data-ref')) {
        value = item.value.replace('/', '');
      }
      data.values.push({
        name: item.getAttribute('data-ref'),
        value: value,
      });
    });
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const response = await fetch(
      'https://secure-cert.shieldconex.com/iframe/dbfcf7303d3c9cc254c8d8cfd299bf56',
      { method: 'POST', body: JSON.stringify(data), headers: headers }
    );
    const encryptData = await response.json();
    console.log(encryptData.bfid);
  }
  clearForm() {
    this.renderRoot
      .querySelectorAll('[formInput]')
      .forEach((item) => (item.value = ''));
  }
  render() {
    return html`
      <div class="container">
        <form
          name="creditCardForm"
          name="creditCardForm"
          data-ref="creditCardForm"
          action="javascript:void(0)"
        >
          <squid-input formInput data-ref="CardholderName"
            >Full Name</squid-input
          >
          <porte-widget-card-input formInput data-ref="CardNumber"
            >Card Number</porte-widget-card-input
          >
          <!--<squid-input formInput data-ref="CardNumber" mask="11111111111111"
            >Card Number</squid-input
          >-->
          <squid-input-mask formInput data-ref="CardVerification" mask="111"
            >card Verification</squid-input-mask
          >
          <squid-input-mask formInput data-ref="CardExpiration" mask="11/1111"
            >Card Expiration</squid-input-mask
          >
          <div class="buttons">
            <squid-button variant="progressive" @click=${this.clearForm}
              >Clear</squid-button
            >
            <squid-button @click=${this.getEncrypt}>Submit</squid-button>
          </div>
        </form>
      </div>
    `;
  }
}
defineElement('porte-widget-card-number', PorteWidgetCardNumber);
