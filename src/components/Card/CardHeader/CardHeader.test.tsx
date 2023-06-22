import React from 'react';
import { render, screen } from '@testing-library/react';
import CardHeader from './CardHeader';

test('renders CardHeader title', async () => {
  const title = 'Hello world';
  render(<CardHeader title={title} />);
  const titleElement = await screen.findByTestId('title');
  expect(titleElement).toBeInTheDocument();
  expect(titleElement.textContent).toBe(title);
});

test('renders CardHeader subtitle', async () => {
  const subtitle = 'Hello world';
  render(<CardHeader subtitle={subtitle} />);
  const subtitleElement = await screen.findByTestId('subtitle');
  expect(subtitleElement).toBeInTheDocument();
  expect(subtitleElement.textContent).toBe(subtitle);
});
