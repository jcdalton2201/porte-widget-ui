
    import { document } from 'global';
import '../../dist/porte-widget-app/porte-widget-app.js';
import readme from './readme.md';
import { withKnobs } from '@storybook/addon-knobs';
export default {
  title: 'app',
  decorators: [withKnobs],
};
export const app = () => {
  const app = document.createElement('porte-widget-app');
  
  return app;
};
app.story = {
  name: 'app',
  parameters: {
    notes: readme,
  },
};
    