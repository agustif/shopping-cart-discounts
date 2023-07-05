// tests/functional/ProductList.spec.ts
import { test, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/svelte'
// tests/functional/ProductList.spec.ts
// import { test, expect } from 'vitest'
// import { render, fireEvent } from '@vitest/plugin-svelte'
import App from '../src/App.svelte'
import { get } from 'svelte/store'
import { cart } from '../src/stores/cart'

test('adds item to cart from product list', async () => {
  const { getAllByText, getByText } = render(App)

  // Get all '+' buttons and click the first one
  const plusButtons = getAllByText('+')
  await fireEvent.click(plusButtons[0])

  // Check if item was added to cart
  const items = get(cart).items
//   expect(items.find(item => item && item.code === 'TSHIRT')).toBeDefined()
  const addedItem = items.find(item => item.code === 'TSHIRT')
  expect(addedItem).toStrictEqual({
        code: "TSHIRT",
        name: "T-Shirt",
        price: 2000, 
        quantity: 1
    })
})
