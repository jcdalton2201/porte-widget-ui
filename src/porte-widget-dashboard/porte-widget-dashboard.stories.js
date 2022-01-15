
    import { document } from 'global';
import '../../dist/porte-widget-dashboard/porte-widget-dashboard.js';
import readme from './readme.md';
import { withKnobs } from '@storybook/addon-knobs';
export default {
  title: 'dashboard',
  decorators: [withKnobs],
};
export const dashboard = () => {
  const dashboard = document.createElement('porte-widget-dashboard');
  
  return dashboard;
};
dashboard.story = {
  name: 'dashboard',
  parameters: {
    notes: readme,
  },
};
    