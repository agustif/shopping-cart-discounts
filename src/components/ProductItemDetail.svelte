<script lang="ts">
    import { formatLocalePrice } from '../utils/currency';
    export let product;
  </script>
  
  <div class="product-detail">
    <img src={`${product.code}.jpg`} alt={product.name} />
    <div>
      <h2>{product.name}</h2>
      <p>Product code: <span>{product.code}</span></p>
      <p>Price: {formatLocalePrice(product.price)}</p>
    </div>
  </div>
  
  <style>
    .product-detail {
      display: flex;
      gap: 1rem;
      max-height: 80vh;
    }
    .product-detail img {
        max-width: 58vw;
      max-height: fit-content;
      object-fit: cover;
    }
    .product-detail h2 {
      margin: 0;
    }
  </style>
  