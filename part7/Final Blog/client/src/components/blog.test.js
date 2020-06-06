import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  let component;
  let likeHandler;

  beforeEach(() => {
    likeHandler = jest.fn();
    const blog = {
      author: 'test-author',
      title: 'test-title',
      url: 'test-url',
      user: {
        name: 'test-name',
      },
    };

    component = render(<Blog blog={blog} handleLike={likeHandler} />);
  });

  test('render blogs', () => {
    expect(component.container).toHaveTextContent('test-author');
  });

  test('only title and author feild are visible', () => {
    const minInfoDiv = component.container.querySelector('.minInfo');
    expect(minInfoDiv).toBeDefined();

    const detailInfoDiv = component.container.querySelector('.detailInfo');
    expect(detailInfoDiv).toBeNull();
  });

  test('more feilds are shown when show button is clicked', () => {
    const showBtn = component.getByText('Show');
    fireEvent.click(showBtn);

    const detailInfoDiv = component.container.querySelector('.detailInfo');
    expect(detailInfoDiv).toBeDefined();
  });

  test('like button calls likeHandler', () => {
    const showBtn = component.getByText('Show');
    fireEvent.click(showBtn);

    const LikeBtn = component.getByText('like');
    fireEvent.click(LikeBtn);
    fireEvent.click(LikeBtn);

    expect(likeHandler.mock.calls).toHaveLength(2);
  });
});
