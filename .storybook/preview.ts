import '../src/index.css';
import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  //👇 Enables auto-generated documentation for all stories
  tags: ['autodocs'],
};

export default preview;