// import { PorteWidgetBase } from '../utils/porte-widget-base.js';
import { defineElement } from '../utils/define-element.js';
import { html } from 'lit';
import styles from './porte-widget-card-input.scss';
import { SquidInput } from '@populus/squid/dist/squid-input/squid-input.js';
import { emitEvent } from '@populus/squid/dist/utils/squidEvents.js';
export class PorteWidgetCardInput extends SquidInput {
  static get properties() {
    return {};
  }
  static get scope() {
    return {};
  }
  static get styles() {
    return [...super.styles, styles];
  }
  get value() {
    return this._value;
  }

  // /** When the value changes, make sure the emit events and set up masks */
  set value(_value) {
    const value = this._unmask(_value.toString());
    emitEvent('squid-change', _value, this);
    const input = this.__getInput();
    if (input) {
      this._mask(value);
    }
  }
  constructor() {
    super();
    this._isDelete = false;
    this.unmaskedValue = '';
    this.maskedValue = '';
    this._obfuscatedValue = '';
  }
  firstUpdated() {
    super.connectedCallback();
    this.buildRefs();
    this.hasValidation = true;
    this.maskState = 'hidden';
    this.placeholder = '**** **** **** ****';
    // this.pattern = "^\d{3}-\d{2}-\d{4}$";
    this.minlength = 19;
    this.maxlength = 19;
    this._toggleButtonText();
  }
  render() {
    return html`
      <div id="container" data-ref="wrapper">
        <div class="label-wrapper">
          <label
            class="textfield__label"
            for="squid-input-${this._uid}"
            data-ref="label"
            ><slot></slot>${this._showDisabled}</label
          >
          <button
            class="toggle-button"
            data-ref="toggleButton"
            @click=${this.__showHideToggle}
          >
            Hide
          </button>
        </div>
        <input
          class="textfield__input"
          type="${this._inputType}"
          name="squid-input"
          value=""
          id="squid-input-${this._uid}"
          data-ref="input"
          ?disabled=${this.disabled}
          ?required=${this.required}
          ?readonly=${this.readonly}
          ?autofocus=${this.autofocus}
          ?compact=${this.compact}
          @keydown=${this.__onKeydown}
          @input=${this.__onInput}
          @blur=${this.__onBlur}
          @focus=${this.__onFocus}
          maxlength="${this.maxlength ? this.maxlength : ''}"
          max="${this.max ? this.max : ''}"
          minlength="${this.minlength ? this.minlength : ''}"
          min="${this.min ? this.min : ''}"
          placeholder="${this.placeholder ? this.placeholder : ''}"
          autocomplete="${this.autocomplete ? this.autocomplete : ''}"
          aria-describedby=" helpers-${this._uid} counter-${this._uid}"
          class=""
        />
        <squid-helpers
          id="helpers-${this._uid}"
          data-ref="helpers"
        ></squid-helpers>
      </div>
    `;
  }
  __onBlur() {
    const input = this.__getInput();
    if (input.value === this.placeholder) {
      input.value = '';
    }
    this.checkValidity();
  }

  __onFocus() {
    setTimeout(() => {
      const input = this.__getInput();
      if (input.value === '') {
        input.setSelectionRange(0, 0);
      } else {
        const firstPlaceholder = input.value.indexOf('_');
        input.setSelectionRange(firstPlaceholder, firstPlaceholder);
      }
    });
  }
  __onInput(evt) {
    if (!evt.inputType && this._isDelete) {
      evt.inputType = 'deleteContentBackward';
    }
    if (evt.inputType !== 'deleteContentBackward') {
      this._parseAddtion(evt);
    } else {
      this._parseDeletion(evt);
    }
  }
  __onKeydown(evt) {
    const deleteKeys = [8, 64];
    const { key } = evt;
    const input = this.__getInput();
    const { selectionStart } = input;
    this._isDelete = deleteKeys.includes(evt.keyCode);
    this._cachedValue = this.unmaskedValue || '';
    this._cachedSelection = selectionStart;
    if (key.match(/[0-9]$/)) {
      input.value = '';
    } else {
      if (key.toString().includes('Arrow')) {
        setTimeout(() => {
          this._cachedSelection = input.selectionStart;
        });
      }
    }
  }
  __onPaste(evt) {
    const pastedValue = evt.clipboardData.getData('text/plain');
    this._mask(pastedValue);
  }
  _parseAddtion(evt) {
    const oldValue = this._addMask(this._cachedValue);
    const newValue = this._unmask(
      oldValue.slice(0, this._cachedSelection) +
        this.__getInput().value +
        oldValue.slice(this._cachedSelection)
    );
    this._mask(newValue, evt);
  }
  _parseDeletion(evt) {
    const maskedValue = this._addMask(this._cachedValue);
    const value = this._unmask(
      `${maskedValue.slice(0, this._cachedSelection - 1)}${maskedValue.slice(
        this._cachedSelection
      )}`
    );
    this._mask(value, evt);
  }
  _unmask(value = '') {
    return value.replace(/\D/g, '').slice(0, 16);
  }
  _addMask(value = '') {
    const placeholderCharacter = '*';
    const unmaskedValue = this._unmask(value);
    const firstFour = unmaskedValue.slice(0, 4).padEnd(4, placeholderCharacter);
    const secondFour = unmaskedValue
      .slice(4, 8)
      .padEnd(4, placeholderCharacter);
    const thirdFour = unmaskedValue
      .slice(8, 12)
      .padEnd(4, placeholderCharacter);
    const lastFour = unmaskedValue
      .slice(12, 16)
      .padEnd(4, placeholderCharacter);

    let maskedValue = '';
    if (firstFour.length === 4) {
      maskedValue += `${firstFour} `;
    } else {
      maskedValue += firstFour;
    }
    if (secondFour.length === 4) {
      maskedValue += `${secondFour} `;
    } else {
      maskedValue += secondFour;
    }
    if (thirdFour.length === 4) {
      maskedValue += `${thirdFour} `;
    } else {
      maskedValue += thirdFour;
    }

    maskedValue += lastFour;

    this.maskedValue = maskedValue;
    return maskedValue;
  }
  async _mask(value = '', evt = {}) {
    const unmaskedValue = this._unmask(value);
    const maskedValue = this._addMask(unmaskedValue);
    const isDelete = evt.inputType === 'deleteContentBackward';
    this.unmaskedValue = unmaskedValue;
    this.maskedValue = maskedValue;

    const obfuscateValue = await this._obfuscate(maskedValue);
    const start = isDelete ? this._cachedSelection : unmaskedValue.length;
    this._manageCursor(obfuscateValue, start, evt);
    this._isDelete = undefined;
  }
  _manageCursor(maskedValue, selectionStart, evt = {}) {
    if (selectionStart >= 4 && selectionStart < 8) {
      selectionStart += 1;
    } else if (selectionStart >= 8 && selectionStart < 12) {
      selectionStart += 2;
    } else if (selectionStart >= 12) {
      selectionStart += 3;
    }

    if (evt.inputType === 'deleteContentBackward') {
      selectionStart = this._cachedSelection - 1;
    }

    this.__getInput().setSelectionRange(selectionStart, selectionStart);
  }
  _obfuscate(value = '') {
    return new Promise((resolve) => {
      const input = this.__getInput();
      let obfuscatedValue =
        value.slice(0, 15).replace(/[0-9]/g, '•') + value.slice(15, 19);
      this._obfuscatedValue = obfuscatedValue;
      this._value = this.unmaskedValue.slice(0, 16);
      if (this.maskState === 'visible') {
        input.value = value;
      } else {
        input.value = this._obfuscatedValue;
      }
      resolve(this.maskedValue);
    });
  }
  /**
   * toggle the text to show or hide ssn
   */
  _toggleButtonText() {
    const toggleButton = this.renderRoot.querySelector('button');
    if (this.maskState === 'hidden') {
      toggleButton.innerHTML = 'Show';
    } else if (this.maskState === 'visible') {
      toggleButton.innerHTML = 'Hide';
    }
  }
  /**
   * toggle the value of input from hidden to showing the value
   */
  __showHideToggle() {
    const input = this.__getInput();
    if (this.maskState === 'visible') {
      this.maskState = 'hidden';
      input.value = this._obfuscatedValue;
    } else {
      this.maskState = 'visible';
      input.value = this.maskedValue;
    }
    this._toggleButtonText();
  }
  /**
   * Overwrite the checkValidity to handel error messages
   */
  checkValidity() {
    if (this?._value?.length < 16) {
      this.setCustomValidity('Please enter in a valid ssn');
      return false;
    } else {
      this.setCustomValidity('');
    }
    return super.checkValidity();
  }
}
defineElement('porte-widget-card-input', PorteWidgetCardInput);
