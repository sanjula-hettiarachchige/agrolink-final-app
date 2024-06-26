import React from 'react';
import renderer from 'react-test-renderer';

import Home from '.';

describe('<Home />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});