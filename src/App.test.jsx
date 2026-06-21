import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

beforeAll(() => {
  if (window.HTMLMediaElement) {
    window.HTMLMediaElement.prototype.play = jest.fn();
  }
});

test('renders the title screen', () => {
  const { container } = render(<App />);
  expect(container.querySelector('.App')).toBeInTheDocument();
});
