import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

test('demo', () => {
  expect(true).toBe(true);
});

test('Renders the main page', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  expect(true).toBeTruthy();
});
