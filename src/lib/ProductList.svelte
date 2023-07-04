<script lang="ts">
  import { cart } from '../stores/cart';
  import { formatLocalePrice } from '../utils/currency';
  export let products;
</script>
  
<ul>
    {#each products as product (product.code)}
      <li>
        <h3>{product.name}</h3>
        <p>{formatLocalePrice(product.price)}</p>
        <button on:click={() => cart.addItem(product)}>Add to Cart</button>
      </li>
    {/each}
  </ul>