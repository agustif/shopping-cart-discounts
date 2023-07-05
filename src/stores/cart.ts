import { writable } from 'svelte/store';
import discountsConfig from '../config/discounts.json'; // import the discounts JSON


enum DiscountType {
  BUY_X_GET_Y_FREE = 'buyXGetYFree',
  BULK_DISCOUNT = 'bulkDiscount',
};

const createCart = () => {
  let initialState = {
    items: [],
    total: 0,
    discounts: [],
    showConfirm: false,
  };
  // Try to load the cart from localStorage
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    initialState = JSON.parse(savedCart);
  }

  const { subscribe, set, update } = writable(initialState);

  const findItem = (state, productCode) => state.items.find((item) => item.code === productCode);
  const findItemIndex = (state, productCode) => state.items.findIndex((item) => item.code === productCode);
  
  // Apply discounts logic
  const applyDiscounts = (state) => {
    // Reset total and discounts
    state.total = 0;
    state.discounts = [];

    state.items.forEach((item) => {
      let discount = 0;
      let total = item.price * item.quantity;

      const discountConfig = discountsConfig[item.code];

      if (discountConfig) {
        switch (discountConfig.type) {
          case DiscountType.BUY_X_GET_Y_FREE:
            if (item.quantity >= discountConfig.requiredQuantity) {
              const freeItems = Math.floor(item.quantity / discountConfig.requiredQuantity) * discountConfig.freeQuantity;
              discount = freeItems * item.price;
            }
            break;
          case DiscountType.BULK_DISCOUNT:
            if (item.quantity >= discountConfig.requiredQuantity) {
              discount = total * (discountConfig.discountPercentage / 100);
            }
            break;
          default:
            break;
        }
      }

      state.total += total - discount;
      const discountData = {
        code: item.code,
        amount: discount,
        count: null,
        name: item.name
      }
      // We keep track of the times the discount was applied for buyXGetYFree
      if (discountConfig && discountConfig.type === DiscountType.BUY_X_GET_Y_FREE)
      {
        discountData.count = discount / item.price;
      }
      if (discount > 0) {
        // We keep track of the discounts applied
        state.discounts.push(discountData);
      }
    });

    return state;
  };

  // Adds one product item (stock/unit) to the cart
  const addItem = (product) => {
    update((state) => {
      let existingItem = findItem(state, product.code);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      // Apply discounts when adding to cart
      state = applyDiscounts(state);
      return state;
    });
  };

  // Removes all added items from product code from the cart
  const removeItem = (productCode) => {
    update((state) => {
      const itemIndex = findItemIndex(state, productCode);

      if (itemIndex !== -1) {
        state.items.splice(itemIndex, 1);
      }
      // We apply the discounts again when removing from cart
      state = applyDiscounts(state);
      return state;
    });
  };

  // Decreases by one the cart order of the product code
  const decreaseItem = (productCode) => {
    update((state) => {
      let existingItem = findItem(state, productCode);

      if (existingItem) {
        existingItem.quantity -= 1;

        if (existingItem.quantity === 0) {
          const itemIndex = findItemIndex(state, productCode);
          state.items.splice(itemIndex, 1);
        }
      }
      // We apply the discounts again when decreasing stock
      state = applyDiscounts(state);
      return state;
    });
  };

  const clear = () => {
    set({ items: [], total: 0, discounts: [], showConfirm: false });
  };

  const showConfirm = () => {
    update((state) => {
      state.showConfirm = true;
      return state;
    });
  };
   // Subscribe to changes in the cart
   subscribe(value => {
    // Save the current state of the cart to localStorage
    localStorage.setItem('cart', JSON.stringify(value));
  });

  
  return {
    subscribe,
    addItem,
    removeItem,
    decreaseItem,
    clear,
    showConfirm,
  };
};

export const cart = createCart();
