import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const createStore = (storeName, initialState) => {
    return create(
      persist(
        (set) => ({
          state: initialState,
          setState: (newState) => set({ state: newState }),
          clearState: () => set({ state: initialState }),
        }),
        {
          name: storeName,
          storage: createJSONStorage(() => localStorage),
        }
      )
    );
  };

  
const errorStore = createStore("error-storage", null);
const successStore = createStore("success-storage", null);
const productsStore = createStore("products-storage", null);
const keywordStore = createStore("keyword-storage", null);


export {
    errorStore,
    successStore,
    productsStore,
    keywordStore
}
