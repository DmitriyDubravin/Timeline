import React from 'react';
import { storiesOf } from '@storybook/react';
import Event from './event';

storiesOf('Event', module)
  .add('event', () => (
    <Event />
  ));