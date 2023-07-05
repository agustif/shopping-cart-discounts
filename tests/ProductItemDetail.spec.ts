import { test, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/svelte'
import ProductItemDetail from '../src/components/ProductItemDetail.svelte'
import { cart } from '../src/stores/cart'

// Function to reset the cart store
function resetCart() {
  cart.clear();
}

test('adds product to cart when button is clicked', async () => {
  resetCart(); // Reset the cart before the test

  const product = {
    code: 'prod1',
    name: 'Product 1',
    price: 100
  }

  const { getByText } = render(ProductItemDetail, { props: { product } })

  const addToCartButton = getByText('Add to cart')
  await fireEvent.click(addToCartButton)

  // Check that the product was added to the cart
  let cartItem;
  cart.subscribe(({ items }) => {
    cartItem = items.find(item => item.code === product.code);
  })();
  expect(cartItem).toBeDefined()
  expect(cartItem.quantity).toBe(1)
})
