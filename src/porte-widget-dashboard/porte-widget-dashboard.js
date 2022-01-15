import { PorteWidgetBase } from '../utils/porte-widget-base.js';
import { defineElement } from '../utils/define-element.js';
import { html } from 'lit';
import styles from './porte-widget-dashboard.scss';
import { AdApi } from '../utils/ad-api.js';
import '@populus/squid/dist/squid-container/squid-container.js';
import '@populus/squid/dist/squid-button/squid-button.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Icons } from '../utils/icons.js';
import { OldPorteApi } from '../utils/old-porte-api.js';
export class PorteWidgetDashboard extends PorteWidgetBase {
  static get properties() {
    return {
      userId: {
        type: String,
      },
      data: {
        type: Object,
      },
      old: {
        type: Boolean,
        attribute: true,
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
    this.oldApi = new OldPorteApi();
    this.data = {};
    this.local =
      navigator.languages && navigator.languages.length
        ? navigator.languages[0]
        : navigator.language;
    this.numberStyle = {
      style: 'currency',
      currency: 'USD',
    };
    this.rtf1 = new Intl.RelativeTimeFormat('en', { style: 'narrow' });
    this.old = false;
  }
  firstUpdated() {
    this.buildRefs();
    this.getUserDashboard();
  }
  render() {
    //prettier-ignore
    return html` <div class="main">
      <div class="balance">
        <span class='balanceLabel'>Available Balance</span>
          ${new Intl.NumberFormat(this.local, this.numberStyle).format(this.data?.accountDashboard?.currentCheckingBalance?.amount)}
      </div>
      <div class="savings">
        <squid-container bgColor='#0C5C6F' radius='4'  padding="small">
          <div class="savingMain">
            <div class="savingsLabel">Saving Account</div>
            <div>
            ${new Intl.NumberFormat(this.local, this.numberStyle).format(this.data?.accountDashboard?.currentSavingsBalance?.amount)}
            </div>
            <squid-button variant="text">${unsafeHTML(Icons.circleRight())}</squid-button>
          </div>
        </squid-container>
      </div>
      <div class="budget">
        <squid-container bgColor='white' radius='4' padding="small">
        <div class="budgetSpan">
          <span class="budgetLabel">Budget:<span class='bugetCurrentData'>${new Intl.DateTimeFormat(this.local,{month:'long', year:'numeric'}).format(Date.now())}</span></span>
          ${new Intl.NumberFormat(this.local, this.numberStyle).format(this.data?.budgetDashboard?.amount)}
        </div>
          <div> You are <b>${new Intl.NumberFormat(this.local, this.numberStyle).format(this.data?.budgetDashboard?.monthInfo?.earned - this.data?.budgetDashboard?.monthInfo?.spent)}</b> under your budget!</div>
        </squid-container>
      </div>
      <div class="CTA">
        <div>
          <squid-button >${unsafeHTML(Icons.transfer())}</squid-button>
          <span>Transfer money</span>
        </div>
        <div>
          <squid-button >${unsafeHTML(Icons.payment())}</squid-button>
          <span>Request money</span>
        </div>
        <div>
          <squid-button >${unsafeHTML(Icons.clock())}</squid-button>
          <span>Schedule payment</span>
        </div>
        <div>
          <squid-button >${unsafeHTML(Icons.phone())}</squid-button>
          <span>Tap up mobile</span>
        </div>
      </div>
      <div class="transaction">
        <squid-container bgColor='white' radius='4' padding="small">
        <div class="transactionTitle"><div>Transactions</div><div><squid-button variant="right">View All</div></div>
          ${this.data?.transactionDashboard?.transactions.map(transaction => html`
          <div class="transactionRow">
          <div class="icon"></div>
          <div class="transactionName">
          <span>${transaction?.customerMemo}</span>
          <span>${new Intl.DateTimeFormat(this.local,{month:'short', day:'2-digit'}).format(new Date(transaction.transactionDate))}</span>
          </div>
          <div class="transactionAmount">
          <span>${new Intl.NumberFormat(this.local, this.numberStyle).format(transaction?.amount)}</span>
          <span>${transaction?.accountTypeName}</span>
          </div>
          </div>`)}
          
          <div class="transactionTitle"><div>RetailRewards</div><div><squid-button variant="right">View All</div></div>
          ${this.data?.paybackRewardDashboard?.paybackRewardsResponseList.map(rewards => html`
          <div class="transactionRow">
          <div class="icon"></div>
          <div class="transactionName">
          <span>${rewards?.preMessage}</span>
          <span>${rewards?.merchantName}</span>
          </div>
          <div class="transactionAmount">
            <div class="icon"></div>
            </div>
          </div>`)}
        </squid-container>
      </div>
      <div class="promotion">
        <squid-container bgColor='white' radius='4' padding="small">
          <div class='promotionSpan'>
            <div>Earn up to $500!</div>
            <div>Earn $50 for each person you invite. We’ll also send them $50. Invite more friends, earn more money.</div>
            <div class="promotionButton">
              <squid-button> Refer a Friend</spuid-button>
            </div>
          </div>
        </squid-container>
      </div>
    </div>`;
  }
  async getUserDashboard() {
    let response;
    if (this.old) {
      response = await this.oldApi.getCall('/v2/api/dashboard/v7 ');
      response = response.returnData;
    } else {
      response = await this.api.getCall(
        `/porte-widget-bff/user/${this.userId}/dashboard`
      );
    }
    this.data = response;
    console.log(this.data);
  }
}
defineElement('porte-widget-dashboard', PorteWidgetDashboard);
