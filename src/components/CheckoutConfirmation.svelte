<script>
  import Button from "./Button.svelte"
  import { formatLocalePrice } from '../utils/currency';
  import { cart } from '../stores/cart';
</script>

<div>
  <hr />
    <div class="total-container">
      <h3>Cart total</h3>
      <p>{formatLocalePrice($cart.total)}</p>
    </div>
  <Button onClick={
  () => {
    alert("Your order has been processed");
    cart.clear();
  }}> Confirm </Button>
</div>

<style>
  .total-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
