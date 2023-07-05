<script>
  import { cart } from '../stores/cart';
  import { formatLocalePrice } from '../utils/currency';
</script>
  
<ul class="cart-item-list">
  {#each $cart.items as item (item.code)}
    <li class="cart-item-detail">
      <p>x{item.quantity} {item.name}</p>
      <p>{formatLocalePrice(item.price)}</p>
    </li>
  {/each}
</ul>

<style>
  .cart-item-list {
    height: 100%;
    align-items: start;
    justify-content: flex-start;
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
</style>
