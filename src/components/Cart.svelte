<script lang="ts">
  import { cart } from '../stores/cart';
  import Button from "../components/Button.svelte";
  import CheckoutConfirmation from './CheckoutConfirmation.svelte';
  import Discounts from './Discounts.svelte';
  import CartItems from './CartItems.svelte';
  import Heading from './Heading.svelte';
</script>

<section class="container">
  <Heading>Details</Heading>
  <CartItems />
  {#if $cart.discounts.length > 0}
    <Discounts />
  {/if}
  
  {#if !$cart.showConfirm}
    <Button disabled={$cart.total === 0} onClick={() => cart.showConfirm()}>  
      {#if $cart.items.length > 0}
      Checkout
      {:else}
      Add items to cart
      {/if}
    </Button>
  {:else}
    <CheckoutConfirmation />
  {/if}
</section>

<style>
  .container {
    min-height: 67vh;
    flex: 1;
    border-left: 1px solid #ccc;
    padding: 2rem;
    background-color: #DBDCE0;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
</style>
