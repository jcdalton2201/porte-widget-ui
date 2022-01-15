import { LitElement } from 'lit';
import { AdApi } from './ad-api.js';
export class PorteWidgetBase extends LitElement {
  constructor() {
    super();
    this.refs = {};
    this.uuid = this.uuidv4();
    this.api = new AdApi();
  }
  /**
   * Construct and dispatch a new CustomEvent
   * that is composed (traverses shadow boundary)
   * and that bubbles
   * @param {string} name - Event name to emit
   * @param {any} detail - The detail property of the CustomEvent
   * @return void
   */
  emitEvent(name, detail) {
    const customEvent = new CustomEvent(name, {
      detail,
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(customEvent);
  }
  /**
   * bind this to the method
   * @param {String} methodName
   * @returns void
   */
  bindMethod(methodName) {
    this[methodName] = this[methodName].bind(this);
  }
  /**
   * binds the array of methods with this.
   * @param {Array<String>} methods
   * @returns void
   */
  bindMethods(methods = []) {
    methods.forEach((method) => this.bindMethod(method));
  }
  /**
   * Return any renderRoot element with [data-ref]
   * equal to the first argument
   * @param {string} ref
   * @return {HTMLElement}
   */
  ref(ref = '') {
    return this.renderRoot
      ? this.renderRoot.querySelector(`[data-ref="${ref}"]`)
      : null;
  }

  buildRefs() {
    if (this.renderRoot) {
      this.renderRoot
        .querySelectorAll('[data-ref]')
        .forEach((ref) => (this.refs[ref.dataset.ref] = ref));
    }
  }
  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}
