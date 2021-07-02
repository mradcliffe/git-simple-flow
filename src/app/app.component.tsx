import {
  GitgraphOptions,
  Mode,
  Orientation,
  TemplateName,
} from '@gitgraph/core';
import { Gitgraph } from '@gitgraph/react';
import React from 'react';

import simpleFlow from './simple-flow';

const options: GitgraphOptions = {
  template: TemplateName.BlackArrow,
  orientation: Orientation.VerticalReverse,
  mode: Mode.Compact,
};

const AppComponent = () => (
  <main>
    <Gitgraph options={options}>{simpleFlow}</Gitgraph>
  </main>
);

export default AppComponent;
