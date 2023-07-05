// tests/functional/Discounts.spec.ts
import { test, expect } from 'vitest'
import { render } from '@testing-library/svelte'
import Discounts from '../src/components/Discounts.svelte'
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

  const { getByText, queryByText } = render(Discounts)

  // Check if discounts are applied
  expect(queryByText('Discounts')).toBeNull()
console.log("discounts:",queryByText('Discounts'))
  // Check if discount details are correct
  expect(getByText(`x1 ${cap.name} offer`)).toBeNull()
  expect(getByText(`x1 ${tshirt.name} offer`)).toBeNull()

  // Check if total savings are correct
  // Should be 100 (one cap is free) + 200*3*0.25 (25% off for t-shirts)
  expect(getByText('Total savings: -250,00 €')).toBeNull()
})
