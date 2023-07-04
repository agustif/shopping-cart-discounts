<script lang="ts">
  import { cart } from '../stores/cart';
  import { formatLocalePrice } from '../utils/currency';
</script>

<section>
  <ul>
    {#each $cart.items as item (item.code)}
      <li>
        <span>{item.name} - {item.quantity} x {formatLocalePrice(item.price)}</span>
        <button on:click={() => cart.removeItem(item.code)}>Remove</button>
        <button on:click={() => cart.decreaseItem(item.code)}>-</button>
        <button on:click={() => cart.addItem(item)}>+</button>

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

<style>
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  button {
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #fff;
    cursor: pointer;
  }
</style>