<script lang="ts">
  import { formatLocalePrice } from '../utils/currency';
  import { cart } from '../stores/cart';
  import { onMount } from 'svelte';
  import Button from "../components/Button.svelte"

  export let product;

  let quantityInCart = 0;
  const addToCart = () => {
    cart.addItem(product);
  };
  const removeFromCart = () => {
    cart.removeItem(product.code);
  };

  onMount(() => {
    const unsubscribe = cart.subscribe(({ items }) => {
      const itemInCart = items.find(item => item.code === product.code);
      quantityInCart = itemInCart ? itemInCart.quantity : 0;
    });

    return unsubscribe;
  });
</script>

<div class="product-detail">
  <img src={`${product.code}.jpg`} alt={product.name} />
  <div class="details">
    <div class="container top-5">
      <p class="title">{product.name}</p>
      <p class="price">{formatLocalePrice(product.price)}</p>
    </div>
    <hr />
    <div class="container">

    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam elit turpis, imperdiet ut pretium eu, aliquet sit amet urna. Praesent luctus nunc in dui placerat ornare. Donec in ipsum eget mi tincidunt tincidunt at vitae nisl. Nam interdum dignissim mi, eget placerat erat luctus et. Morbi ligula sapien, semper ut dictum non, iaculis vel turpis. Ut vel purus nulla.</p>
  </div>
  <hr />
  <p class="last">Product code <span>{product.code}</span></p>
  <Button onClick={addToCart}>
    Add {#if quantityInCart > 0}+1{/if} to cart
  </Button>
    {#if quantityInCart > 0}
    <div class="container">

      <p class="bold">{quantityInCart} in cart</p>
      <span>{formatLocalePrice(quantityInCart * product.price)}</span>
    </div>

      <Button className="remove" onClick={removeFromCart}>Remove all</Button>
    {/if}
  </div>
</div>

<style>
  .small {
    height: 0.5rem;
  }
  .top-5 { 
    margin-top: 5rem;
  }
  .last {
    margin-bottom: 5rem;
  }
  .container {
    justify-content: space-between;
    display: flex;
    
    align-items: baseline;
  }
  .product-detail {
    display: flex;
    gap: 1rem;
  }
  .details {
    padding-bottom: 20px;
    padding-right: 25px;
    display: flex;
    flex-direction: column;
  }
  .product-detail img {
    max-width: 55vw;
    max-height: fit-content;
    object-fit: cover;
    padding: 0;
  }
  .title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
  }
  .product-detail p {
    color: #666;
  }
  .price {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  .bold {
    font-weight: bold;
  }
  hr {
    width: 100%;
    border: 1px solid #d8d8d8;
    margin: 0;
  }
</style>
