import { afterEach, test, expect } from 'vitest';
import { render, cleanup } from '@testing-library/svelte';
import { cart } from '../src/stores/cart';
import CartItems from '../src/components/CartItems.svelte';

afterEach(cleanup); // Clean up after each test

test('displays correct number of items in cart', () => {
  cart.addItem({ code: 'prod1', name: 'Product 1', price: 100 });
  cart.addItem({ code: 'prod2', name: 'Product 2', price: 200 });

  const { getAllByRole } = render(CartItems);
  const items = getAllByRole('listitem');

  expect(items.length).toBe(2);
});

test('displays correct item details in cart', () => {
  cart.addItem({ code: 'prod1', name: 'Product 1', price: 100 });

  const { getByText } = render(CartItems);

  expect(getByText('x2 Product 1')).toBeDefined();
  expect(getByText(/1,00\s€/)).toBeDefined(); // Matches any whitespace character
  ; // Assuming formatLocalePrice formats to USD
});


test('updates when item is removed from cart', () => {
  cart.addItem({ code: 'prod1', name: 'Product 1', price: 100 });
  cart.addItem({ code: 'prod2', name: 'Product 2', price: 200 });

  const { getAllByRole, rerender } = render(CartItems);
  let items = getAllByRole('listitem');

  expect(items.length).toBe(2);

  cart.removeItem('prod1');

  // Re-render the component
  rerender({});

  items = getAllByRole('listitem');

  expect(items.length).toBe(1);
});
