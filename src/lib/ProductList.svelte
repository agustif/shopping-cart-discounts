<script lang="ts">
  import { cart } from '../stores/cart';
  import { formatLocalePrice } from '../utils/currency';
  export let products;
</script>

<section>
  <ul>
      {#each products as product (product.code)}
        <li>
          <img src={`${product.code}_thumb.png`} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{formatLocalePrice(product.price)}</p>
          <button on:click={() => cart.addItem(product)}>Add to Cart</button>
          {#if $cart.items.find(item => item.code === product.code)}
            <div>
              <p>Quantity in cart: {$cart.items.find(item => item.code === product.code).quantity}</p>
              <button on:click={() => cart.addItem(product)}>+</button>
              <button on:click={() => cart.decreaseItem(product.code)}>-</button>
            </div>
          {/if}
        </li>
      {/each}
  </ul>
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
