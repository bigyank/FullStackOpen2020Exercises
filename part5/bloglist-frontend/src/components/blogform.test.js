import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';

describe('<BlogForm />', () => {
  let component;
  let createBlog;
  beforeEach(() => {
    createBlog = jest.fn();
    component = render(<BlogForm addNewBlog={createBlog} />);
  });

  test('all input feilds are rendered', () => {
    const form = component.container.querySelector('form');

    const authorFeild = component.container.querySelector('#author');
    const titleFeild = component.container.querySelector('#title');
    const urlFeild = component.container.querySelector('#url');

    fireEvent.change(authorFeild, {
      target: { value: 'test author' },
    });

    fireEvent.change(urlFeild, {
      target: { value: 'test url' },
    });

    fireEvent.change(titleFeild, {
      target: { value: 'test title' },
    });
    fireEvent.submit(form);

    expect(createBlog.mock.calls[0][0].author).toBe('test author');
    expect(createBlog.mock.calls[0][0].title).toBe('test title');
    expect(createBlog.mock.calls[0][0].url).toBe('test url');
  });

  test('updates parent state and calls onSubmit', () => {
    const input = component.container.querySelector('input');
    const form = component.container.querySelector('form');

    fireEvent.change(input, {
      target: { value: 'testing of forms could be easier' },
    });
    fireEvent.submit(form);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe(
      'testing of forms could be easier'
    );
  });
});
