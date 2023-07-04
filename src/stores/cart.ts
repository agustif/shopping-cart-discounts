import { writable } from 'svelte/store';

const initialState = {
  items: [],
  total: 0,
};

const createCart = () => {
  const { subscribe, set, update } = writable(initialState);

  const findItemIndex = (items, productCode) => {
    return items.findIndex((item) => item.code === productCode);
  }

  const addItem = (product) => {
    update((state) => {
      const index = findItemIndex(state.items, product.code);

      if (index !== -1) {
        state.items[index].quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }

      state.total += product.price;
      return state;
    });
  }

  const deleteItem = (productCode) => {
    update((state) => {
      const index = findItemIndex(state.items, productCode);

      if (index !== -1) {
        const item = state.items[index];
        state.total -= item.price * item.quantity;
        state.items.splice(index, 1);
      }

      return state;
    });
  }

  function clear() {
    set(initialState);
  }

  return {
    subscribe,
    addItem,
    deleteItem,
    clear,
  };
}

export const cart = createCart();
