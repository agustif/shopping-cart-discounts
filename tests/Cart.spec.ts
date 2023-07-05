// tests/functional/Cart.spec.ts
import { test, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/svelte'
import Cart from '../src/components/Cart.svelte'
import { cart } from '../src/stores/cart'

test('adds multiple items to cart and checks out', async () => {
  const item = {
    code: 'prod1',
    name: 'Product 1',
    price: 100
  }

  // Add item to cart twice
  cart.addItem(item)
  cart.addItem(item)

  const { getByText, queryByText } = render(Cart)

  // Check if item is in cart and quantity is 2
  expect(getByText(`x2 ${item.name}`)).toBeDefined()

  // Click on checkout button
  await fireEvent.click(getByText('Checkout'))

  // Check if checkout modal is shown
  expect(queryByText('Cart total')).toBeDefined()

  // Check if total price is correct
  expect(queryByText(`Price: ${item.price * 2}`)).toBeDefined()
})



test('enables checkout button when cart has items', () => {
  cart.addItem({ code: 'prod1', name: 'Product 1', price: 100 })

  const { getByText } = render(Cart)
  const button = getByText('Checkout')

  expect(button.disabled).toBeFalsy()
})
