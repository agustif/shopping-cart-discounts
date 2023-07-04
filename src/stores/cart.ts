import { writable } from 'svelte/store';

const createCart = () => {
  const { subscribe, set, update } = writable({
    items: [],
    total: 0,
    discounts: [],
  });

  const findItem = (state, productCode) => state.items.find((item) => item.code === productCode);
  const findItemIndex = (state, productCode) => state.items.findIndex((item) => item.code === productCode);

  const applyDiscounts = (state) => {
    // Reset total and discounts
    state.total = 0;
    state.discounts = [];

    state.items.forEach((item) => {
      let discount = 0;
      let total = item.price * item.quantity;

      // Apply CAP discount
      if (item.code === 'CAP' && item.quantity >= 3) {
        const freeItems = Math.floor(item.quantity / 3);
        discount = freeItems * item.price;
      }

      // Apply TSHIRT discount
      if (item.code === 'TSHIRT' && item.quantity >= 3) {
        discount = total * 0.25;
      }

      state.total += total - discount;
      if (discount > 0) {
        state.discounts.push({
          code: item.code,
          amount: discount,
        });
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

      state = applyDiscounts(state);
      return state;
    });
  };

  const clear = () => {
    set({ items: [], total: 0, discounts: [] });
  };

  return {
    subscribe,
    addItem,
    removeItem,
    decreaseItem,
    clear,
  };
};

export const cart = createCart();
