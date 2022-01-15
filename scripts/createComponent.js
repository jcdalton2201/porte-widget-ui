// const chalk = require('chalk');
// const mkdirp = require('mkdirp');
// const fs = require('fs');
// const argv = require('minimist')(process.argv.slice(2));
import chalk from 'chalk';
import mkdirp from 'mkdirp';
import fs from 'fs';
import minimist from 'minimist';
import { argv } from 'process';
// const arguments ='';
console.log(minimist(argv.slice(2)));
let jason = minimist(argv.slice(2));
class CreateComponent {
  constructor() {
    if (jason.name) {
      let paths = jason.name.split('/');
      let name = jason.name;
      let dir = '';
      if (paths.length > 1) {
        name = paths.pop();
        dir = `/${paths.join('/')}`;
      }
      console.log(
        chalk.green(
          `We are going to build component ${name} in dir ${chalk.yellow(dir)}`
        )
      );
      this._buildDir(name, dir);
      this._buildJs(name, dir);
      this._buildSpec(name, dir);
      this._buildSass(name, dir);
      this._buildStory(name, dir);
      this._buildReadMe(name, dir);
    } else {
      console.log(chalk.red('Please add the argument --name=<<name>>'));
    }
  }
  /**
   * This will convert slug string to Camel Cased
   * @param {String} val value of string to change
   */
  __camelCased(val) {
    return val
      .toLocaleLowerCase()
      .split('-')
      .map((item) => item.replace(/^./, (c) => c.toLocaleUpperCase()))
      .join('');
  }
  /**
   *
   * @param {String} name
   * @param {String} dir
   */
  _buildDir(name, dir) {
    mkdirp.sync(`src${dir}/porte-widget-${name}`);
    mkdirp.sync(`spec${dir}/porte-widget-${name}`);
    console.log(
      chalk.green(`we have created a directory at src/porte-widget-${name}`)
    );
  }
  /**
   *
   * @param {String} name
   * @param {String} dir
   */
  _buildStory(name, dir) {
    const file = `src${dir}/porte-widget-${name}/porte-widget-${name}.stories.js`;
    const writeStream = fs.createWriteStream(file);
    writeStream.write(`
    import { document } from 'global';
import '../../dist/porte-widget-${name}/porte-widget-${name}.js';
import readme from './readme.md';
import { withKnobs } from '@storybook/addon-knobs';
export default {
  title: '${name}',
  decorators: [withKnobs],
};
export const ${name} = () => {
  const ${name} = document.createElement('porte-widget-${name}');
  
  return ${name};
};
${name}.story = {
  name: '${name}',
  parameters: {
    notes: readme,
  },
};
    `);
  }
  /**
   *
   * @param {String} name
   * @param {String} dir
   */
  _buildSass(name, dir) {
    const file = `src${dir}/porte-widget-${name}/porte-widget-${name}.scss`;
    const writeStream = fs.createWriteStream(file);
    writeStream.write('');
  }
  /**
   *
   * @param {String} name
   * @param {String} dir
   */
  _buildReadMe(name, dir) {
    const file = `src${dir}/porte-widget-${name}/readme.md`;
    const writeStream = fs.createWriteStream(file);
    writeStream.write('');
  }
  /**
   *
   * @param {String} name
   * @param {String} dir
   */
  _buildJs(name, dir) {
    const file = `src${dir}/porte-widget-${name}/porte-widget-${name}.js`;
    const writeStream = fs.createWriteStream(file);
    writeStream.write(`
import {PorteWidgetBase} from '../utils/porte-widget-base.js';
import { defineElement } from '../utils/define-element.js';
import { html } from 'lit';
import styles from './porte-widget-${name}.scss';
export class PorteWidget${this.__camelCased(name)} extends PorteWidgetBase {
  static get properties() {
    return {}
  }
  static get scope() {
    return {}
  }
  static get styles() {
    return [styles];
  }

  constructor(){
      super();
  }
  firstUpdated() {
    this.buildRefs();
  }
  render(){
    return html\`\`    
  }
}
defineElement('porte-widget-${name}',PorteWidget${this.__camelCased(name)});
`);
  }
  /**
   * This will build a Puppetter tests.
   * @param {String} name
   * @param {String} dir
   */
  _buildSpec(name, dir) {
    const file = `spec${dir}/porte-widget-${name}/porte-widget-${name}.js`;
    const writeStream = fs.createWriteStream(file);
    writeStream.write(`
const puppeteer = require('puppeteer');
describe('Unit and Functional Tests for porte-widget-${name}',()=>{
    let browser = null;
    let page = null;
    let context = null;
    let target = null;
    beforeAll(async() => {
        browser = await puppeteer.launch({headless:false});
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;
        page = await browser.newPage();
        await page.setBypassCSP(true);
        await page.goto('http://localhost:8080');
        await page.addScriptTag({path:'dist/porte-widget-core-ui.js'});

    });
    it('Test we can work',async()=>{

    });
});
`);
  }
}
new CreateComponent();
