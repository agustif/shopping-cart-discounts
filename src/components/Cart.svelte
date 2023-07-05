<script lang="ts">
  import { cart } from '../stores/cart';
  import { formatLocalePrice } from '../utils/currency';

  let totalDiscount = 0;
  let showModal = false;
  // Recalculate total discount amount whenever $cart.discounts changes
  $: totalDiscount = $cart.discounts.reduce((total, discount) => total + discount.amount, 0);
</script>

<section class="cart">
  <div>

    <h2>Details</h2>
    <hr />
  </div>
  <div class="cart-item-list">

  <ul >
    {#each $cart.items as item (item.code)}
      <li class="cart-item-detail">
        <p class="cart-item-name">x{item.quantity} {item.name}</p>
        <p> {formatLocalePrice(item.price)}</p>
      </li>
    {/each}
  </ul>
</div>

  {#if $cart.discounts.length > 0}
    <h3>Discounts</h3>
    <hr />
    <ul>
      {#each $cart.discounts as discount (discount.code)}
        <li>
          <span class="discount-item">x{discount.count || 1} {discount.name} offer</span>
          <p class="discount-amount"> -{formatLocalePrice(discount.amount)}</p>
        </li>
      {/each}
    </ul>
  {/if}
  <div>
    <div class="total-container">

      <h3>Total discount</h3><p> {formatLocalePrice(totalDiscount)}</p>
    </div>
    {#if !showModal}
    <button on:click={() => showModal = true}>Checkout</button>
    {/if}

  </div>

  {#if showModal}
    <div>
      <div>
        <hr />
        <div  class="total-container">
          <h3>Cart total</h3>
          <p>{formatLocalePrice($cart.total)}</p>
        </div>
        <button class="close-button" on:click={() => showModal = false}>Close</button>
        <button on:click={() => alert("Your order has been processed")}>Confirm</button>
      </div>
    </div>
  {/if}
</section>

<style>
  .total-container{
    display: flex;
    align-items: center;

  }
  .discount-item{
    width: 100%;
  }
  .discount-amount {
    font-size: 120%;
  }
    .cart-item-list {
      height: 100%;
      align-items: start;
      justify-content: flex-start;
  }
  .cart {
    min-height: 80vh;
    flex: 1;
    border-left: 1px solid #ccc;
    padding: 1rem;
    background-color: #DBDCE0;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
  .cart-item-detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 270px;
    margin-bottom: 0;
    padding-bottom: 0;
    line-height: 1;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: -10px;
  }
  button {
    padding: 0.75rem 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #fff;
    color: black;
    cursor: pointer;
    justify-self: center;
    width: 100%;
    font-size: 120%;
    background-color: #6E51F6;
    color: white;
  }
  .close-button {
    background-color: #a90000;
  }
  .close-button:hover {
    background-color: #a93d3d;
  }
  button:hover {
    background-color: #513da9;
    color: white;
    transition: all 0.3s ease-in-out;
  }
  hr {
    width: 100%;
    border: 1px solid #ccc;
    margin: 0;
  }
  h2 {
    font-weight: 400;
    text-align: left;
    width: 100%;
    padding-top: 16px;
  }
  h3 {
    font-weight: 400;
    text-align: left;
    color: #8c8c8c;
    width: 100%;
    font-size: 80%;
    text-transform: uppercase;
  }
</style>