
    import { document } from 'global';
import '../../dist/porte-widget-card-number/porte-widget-card-number.js';
import readme from './readme.md';
import { withKnobs } from '@storybook/addon-knobs';
export default {
  title: 'card-number',
  decorators: [withKnobs],
};
export const card-number = () => {
  const card-number = document.createElement('porte-widget-card-number');
  
  return card-number;
};
card-number.story = {
  name: 'card-number',
  parameters: {
    notes: readme,
  },
};
    