
    import { document } from 'global';
import '../../dist/porte-widget-card-input/porte-widget-card-input.js';
import readme from './readme.md';
import { withKnobs } from '@storybook/addon-knobs';
export default {
  title: 'card-input',
  decorators: [withKnobs],
};
export const card-input = () => {
  const card-input = document.createElement('porte-widget-card-input');
  
  return card-input;
};
card-input.story = {
  name: 'card-input',
  parameters: {
    notes: readme,
  },
};
    