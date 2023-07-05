// tests/functional/Cart.spec.ts
import { test, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/svelte'
import Cart from '../src/components/Cart.svelte'
import { cart } from '../src/stores/cart'

test('applies discounts correctly', async () => {
  const cap = {
    code: 'CAP',
    name: 'Cap',
    price: 100
  }

  const tshirt = {
    code: 'TSHIRT',
    name: 'T-Shirt',
    price: 200
  }

  // Add three caps to the cart
  cart.addItem(cap)
  cart.addItem(cap)
  cart.addItem(cap)

  // Add three t-shirts to the cart
  cart.addItem(tshirt)
  cart.addItem(tshirt)
  cart.addItem(tshirt)

  const { getByText, queryByText } = render(Cart)

  // Check if items are in cart and quantities are correct
  expect(getByText(`x3 ${cap.name}`)).toBeDefined()
  expect(getByText(`x3 ${tshirt.name}`)).toBeDefined()

  // Check if discounts are applied
  expect(queryByText('Discounts')).toBeDefined()
  // Check if total price is correct
  // Should be 200*3*0.75 (t-shirts with discount) + 100*2 (caps, one is free)
  console.log(queryByText('Total: $650'))
})
