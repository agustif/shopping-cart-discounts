<script lang="ts">
  import ProductList from './lib/ProductList.svelte'
  import Cart from './lib/Cart.svelte'

  const products = [
    { code: 'TSHIRT', name: 'T-Shirt', price: 2000 },
    { code: 'MUG', name: 'Mug', price: 750 },
    { code: 'CAP', name: 'Cap', price: 500 },
  ];
</script>

<main>

  <ProductList products={products} />
  <Cart />

</main>

