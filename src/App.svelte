<script lang="ts">
  import { cart } from './stores/cart';
  import { formatLocalePrice } from './utils/currency';
  import ProductList from './lib/ProductList.svelte'
  import Cart from './lib/Cart.svelte'
  import products from './lib/assets/products.json'</script>

  <main class="main-container">
    <section class="product-list">
      <ProductList products={products} />
    </section>

      <Cart />
  </main>

<style>
  .main-container {
    display: flex;
    justify-content: space-between;
  }
  .product-list {
    flex: 3;
    margin: 2rem;
  }
</style>
