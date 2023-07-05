<script>
  import { cart } from '../stores/cart';
  import { formatLocalePrice } from '../utils/currency';

  let totalDiscount = 0;
  // Recalculate total discount amount whenever $cart.discounts changes
  $: totalDiscount = $cart.discounts.reduce((total, discount) => total + discount.amount, 0);
  </script>
  
  <h3>Discounts</h3>
    <hr />
    <ul>
      {#each $cart.discounts as discount (discount.code)}
        <li>
          <span class="discount-item">x{discount.count || 1} {discount.name} offer</span>
          <p class="discount-amount">-{formatLocalePrice(discount.amount)}</p>
        </li>
      {/each}
    </ul>
    
    <div class="total">
      <h3>Total savings</h3>
      <p>-{formatLocalePrice(totalDiscount)}</p>
    </div>

<style>
  .total {
    display: flex;
    align-items: center;
  }
  .discount-item {
    width: 100%;
  }
  .discount-amount {
    font-size: 120%;
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
  hr {
    width: 100%;
    border: 1px solid #ccc;
    margin: 0;
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