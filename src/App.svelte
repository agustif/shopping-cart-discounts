<script lang="ts">
  import ProductList from './components/ProductList.svelte'
  import Cart from './components/Cart.svelte'
  import products from './config/products.json'
</script>

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
