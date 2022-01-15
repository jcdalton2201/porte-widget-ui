
    import { document } from 'global';
import '../../dist/porte-widget-balance/porte-widget-balance.js';
import readme from './readme.md';
import { withKnobs } from '@storybook/addon-knobs';
export default {
  title: 'balance',
  decorators: [withKnobs],
};
export const balance = () => {
  const balance = document.createElement('porte-widget-balance');
  
  return balance;
};
balance.story = {
  name: 'balance',
  parameters: {
    notes: readme,
  },
};
    