<script>
  import { cart } from '../stores/cart';
  import { formatLocalePrice } from '../utils/currency';

</script>

<section>
  <ul>
    {#each $cart.items as item (item.code)}
      <li>
        <span>{item.name} - {item.quantity} x {formatLocalePrice(item.price)}</span>
        <button on:click={() => cart.deleteItem(item.code)}>Remove</button>
      </li>
    {/each}
  </ul>
  <p>Total: {formatLocalePrice($cart.total)}</p>
  <button on:click={cart.clear}>Clear Cart</button>
</section>