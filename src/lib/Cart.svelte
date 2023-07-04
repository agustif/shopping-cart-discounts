<script>
  import { cart } from '../stores/cart';
  import { formatLocalePrice } from '../utils/currency';
</script>

<section>
  <ul>
    {#each $cart.items as item (item.code)}
      <li>
        <span>{item.name} - {item.quantity} x {formatLocalePrice(item.price)}</span>
        <button on:click={() => cart.removeItem(item.code)}>Remove</button>
        <button on:click={() => cart.decreaseItem(item.code)}>Decrease</button>
      </li>
    {/each}
  </ul>
  <p>Total: {formatLocalePrice($cart.total)}</p>
  {#if $cart.discounts.length > 0}
    <h2>Discounts:</h2>
    <ul>
      {#each $cart.discounts as discount (discount.code)}
        <li>
          <span>Code: {discount.code} - Discount: {formatLocalePrice(discount.amount)}</span>
        </li>
      {/each}
    </ul>
  {/if}
  <button on:click={cart.clear}>Clear Cart</button>
</section>
