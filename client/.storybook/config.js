import { configure } from '@storybook/react';

function loadStories() {
  require('./../stories/index.js');
  require('./../src/components/event/event.story.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);