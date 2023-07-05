import { get } from 'svelte/store';
import { cart } from '../src/stores/cart';
import { expect, test, beforeEach } from 'vitest';

test('cart store', () => {
  beforeEach(() => {
    // Clear the cart before each test
    cart.clear();
  });

  test('adds an item to the cart', () => {
    const product = { code: 'prod1', name: 'Product 1', price: 100 };
    cart.addItem(product);

    const state = get(cart);
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual({ ...product, quantity: 1 });
  });

  test('removes an item from the cart', () => {
    const product = { code: 'prod1', name: 'Product 1', price: 100 };
    cart.addItem(product);
    cart.removeItem(product.code);

    const state = get(cart);
    expect(state.items).toHaveLength(0);
  });

  test('decreases the quantity of an item in the cart', () => {
    const product = { code: 'prod1', name: 'Product 1', price: 100 };
    cart.addItem(product);
    cart.addItem(product);
    cart.decreaseItem(product.code);

    const state = get(cart);
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(1);
  });
});
