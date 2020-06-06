import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Togglable from './Togglable';

describe('<Togglable />', () => {
  let component;

  beforeEach(() => {
    component = render(
      <Togglable btnName='Show'>
        <div className='testDiv' />
      </Togglable>
    );
  });

  test('renders its children', () => {
    expect(component.container.querySelector('.testDiv')).toBeDefined();
  });

  test('at start children are hidden', () => {
    const div = component.container.querySelector('.togglableContent');
    expect(div).toHaveStyle('display: none');
  });

  test('after click of button components are shown', () => {
    const button = component.container.querySelector('button');

    fireEvent.click(button);

    const div = component.container.querySelector('.togglableContent');
    expect(div).not.toHaveStyle('display: none');
  });

  test('component is hidden after clicking cancel button', () => {
    const button = component.getByText('Show');

    fireEvent.click(button);

    const cancelBtn = component.getByText('Cancel');
    fireEvent.click(cancelBtn);

    const div = component.container.querySelector('.togglableContent');

    expect(div).toHaveStyle('display: none');
  });
});
