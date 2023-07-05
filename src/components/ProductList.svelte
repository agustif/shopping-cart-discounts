<script lang="ts">
  import { cart } from '../stores/cart';
  import { formatLocalePrice } from '../utils/currency';
  import ProductItemDetail from './ProductItemDetail.svelte';
  export let products;
  let selectedProduct = null;
</script>

<section>
  <h1>Your cart</h1>
  <hr />
  <div class="list">
    <div class="list-header">
      <h3 class="product-details-header">PRODUCT DETAILS</h3>
      <h3>QUANTITY</h3>
      <h3>PRICE</h3>
      <h3>TOTAL</h3>
    </div>
    {#each products as product (product.code)}
    <div class="list-item" on:click={() => selectedProduct = product} on:keydown={(e) => {if (e.key === 'Enter') selectedProduct = product}}>
        <div class="product-details">
          <img src={`${product.code}_thumb.png`} alt={product.name} />
          <div>
            <p class="product-title">{product.name}</p>
            <p class="product-code-text">Product code <span class="product-code">{Math.random().toString(36).slice(2, 7)}</span></p>
          </div>
        </div>
        <div class="quantity">
          <button on:click={() => cart.decreaseItem(product.code)}>-</button>
          {$cart.items.find(item => item.code === product.code) ? $cart.items.find(item => item.code === product.code).quantity : 0}
          <button on:click={() => cart.addItem(product)}>+</button>
        </div>
        <div class="price">{formatLocalePrice(product.price)}</div>
        <div class="total">{formatLocalePrice(($cart.items.find(item => item.code === product.code)?.quantity || 0) * product.price)}</div>
      </div>
    {/each}
  </div>

  {#if selectedProduct}
    <div class="modal">
      <div class="modal-content">
        <button class="close-product" on:click={() => selectedProduct = null}><img src="cross.svg" alt="Close product" /></button>
        <ProductItemDetail product={selectedProduct} />
      </div>
    </div>
  {/if}
</section>


<style>
  .close-product{
    position: fixed;
    top: 50px;
    right: 10%;
    background: none;
    border: none;
    color: #6E51F6;
    font-size: 80%;
    font-weight: 300;
    padding: 1rem;
    cursor: pointer;
  }
  h1 {
    font-size: 1.5rem;
    font-weight: 400;
    margin-bottom: 1rem;
  }
  .list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    flex: 3;
  }
  .list-header, .list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .list-header h3 {
    color: #A6A7B2;
    font-size: 80%;
    font-weight: 300;
    flex: 1;
    text-align: center;
  }
  .product-title {
    color: #6E51F6;
  }
  .list-header .product-details-header {
    flex: 2;
    text-align: left;
  }
  .product-details {
    display: flex;
    align-items: center;
    flex: 2;
  }
  .product-details img {
    width: 72px;
    height: 72px;
    object-fit: cover;
    margin-right: 1rem;
    border-radius: 5%;
    border: 1px solid #ccc;
  }
  .quantity {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
    justify-content: center;
  }
  .price, .total {
    flex: 1;
    text-align: center;
  }
  button {
    padding: 0.5rem 1rem;
    border: 0px solid transparent;
    border-radius: 4px;
    background: transparent;
    cursor: pointer;
    font-size: 150%;
    color: #6E51F6;
  }
  .product-code {
    text-transform: uppercase;
  }
  .product-code-text {
    font-size: 90%;
    margin-top: -12px;
    color: #A6A7B2;
  }
  hr {
  border: 1px solid #DBDCE0;
  margin: 0;
  }

  .modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4);
  }

  .modal-content {
    background-color: #fefefe;
    margin: 3% auto;
    border: 1px solid #888;
    width: 80%;
  }
</style>
