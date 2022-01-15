import { PorteWidgetBase } from '../utils/porte-widget-base.js';
import { defineElement } from '../utils/define-element.js';
import { html } from 'lit';
import styles from './porte-widget-app.scss';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '@populus/squid/dist/squid-a/squid-a.js';
import '@populus/squid/dist/squid-accordion-group/squid-accordion-group.js';
import '@populus/squid/dist/squid-accordion/squid-accordion.js';
import { Icons } from '../utils/icons.js';
import { User } from '../utils/user-controller.js';
import '../porte-widget-balance/porte-widget-balance.js';
import '../porte-widget-dashboard/porte-widget-dashboard.js';
import { AdApi } from '../utils/ad-api.js';
export class PorteWidgetApp extends PorteWidgetBase {
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
    this.navElement = 'Welcome to Porte';
    this.userController = new User();
    this.api = new AdApi();
  }
  async firstUpdated() {
    this.buildRefs();
    await this.__getUser();
    await this.__getDashBoard();
  }
  render() {
    //prettier-ignore
    return html`
      <div class="container">
        <header>
          <div class="logo">
          ${unsafeHTML(Icons.logo())}
          </div>
          <div class="title">Porte Widget App</div>
          <div class="search"></div>
          <div class="login">
            ${!this.user? unsafeHTML('<squid-a href="/porte-widget-bff/auth/okta" size="small">signin</squid-a>')
    : unsafeHTML(
      `${this.user.name} <squid-a variant='destructive' href="/porte-widget-bff/auth/logout" size="small">sign out</squid-a>`
    )}
          </div>
        </header>
        <nav>${this.navBar}</nav>
        <div class="sink">${this.navElement}</div>
        <footer>
          <div class="logo">
          ${unsafeHTML(Icons.logo())}&#169; Porte&trade; All Rights Reserved
          </div>
        </footer>
      </div>
    `;
  }
  async __getUser() {
    // try {
    //   this.user = await this.userController.__authUser();
    //   if (this.user) {
    //     this.navElement = html` <div class="balance">
    //       <porte-widget-dashboard
    //         userId="${this.user.id}"
    //       ></porte-widget-dashboard>
    //       <porte-widget-dashboard
    //         userId="${this.user.id}"
    //         old
    //       ></porte-widget-dashboard>
    //     </div>`;
    //     // this.navElement = 'Thanks for login';
    //   }
    //   this.requestUpdate();
    // } catch (error) {
    //   console.error(error);
    //   this.user = undefined;
    // }
  }
  async __getDashBoard() {
    this.dashboard = await this.api.getCall(
      'cqrs-bff/dashboards/d664120e-b553-471f-8461-4388627e394f'
    );
    console.log(this.dashboard);
  }
}
defineElement('porte-widget-app', PorteWidgetApp);
