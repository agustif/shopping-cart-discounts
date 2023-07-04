<script lang="ts">
  import ProductList from './lib/ProductList.svelte'
  import Cart from './lib/Cart.svelte'
  import products from './lib/assets/products.json'
</script>

<main>

  <ProductList products={products} />
  <Cart />

</main>

