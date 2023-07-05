<script lang="ts">
  import ProductList from './components/ProductList.svelte'
  import Cart from './components/Cart.svelte'
  import products from './config/products.json'
</script>

<ProductList products={products} />  
<Cart />
