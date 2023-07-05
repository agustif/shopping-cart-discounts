import { test, expect } from 'vitest'
import { render } from '@testing-library/svelte'
import ProductItemDetail from '../src/lib/ProductItemDetail.svelte'
import { formatLocalePrice } from "../src/utils/currency";
test('renders product details correctly', () => {
    const product = {
      code: 'prod1',
      name: 'Product 1',
      price: 100
    }
  
    const { getByText } = render(ProductItemDetail, { props: { product } })
  
    expect(getByText(product.name)).toBeDefined()
    expect(getByText(product.code)).toBeDefined()
  }) 