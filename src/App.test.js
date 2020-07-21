import React from 'react';
import { render } from '@testing-library/react';
import AppTest from './AppTest';

test('renders learn react link', () => {
  const { getByText } = render(<AppTest />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
