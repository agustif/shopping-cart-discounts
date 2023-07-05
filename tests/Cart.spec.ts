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



test('disables checkout button when cart is empty', () => {
  const { getByText } = render(Cart)
  const button = getByText('Add items to cart')

  expect(button.disabled).toBeTruthy()
})

test('enables checkout button when cart has items', () => {
  cart.addItem({ code: 'prod1', name: 'Product 1', price: 100 })

  const { getByText } = render(Cart)
  const button = getByText('Checkout')

  expect(button.disabled).toBeFalsy()
})

test('shows checkout confirmation when checkout button is clicked', async () => {
  cart.addItem({ code: 'prod1', name: 'Product 1', price: 100 })

  const { getByText, queryByText } = render(Cart)
  const button = getByText('Checkout')

  await fireEvent.click(button)

  expect(queryByText('Checkout Confirmation')).toBeDefined()
})

test('shows discounts when there are discounts applied', () => {
  cart.addItem({ code: 'prod1', name: 'Product 1', price: 100, quantity: 3 }) // Assuming this triggers a discount

  const { queryByText } = render(Cart)

  expect(queryByText('Discounts')).toBeDefined()
})
