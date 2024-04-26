import React from 'react';
import renderer from 'react-test-renderer';

import RegisterScreen from './register';

describe('<RegisterScreen />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<RegisterScreen />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});