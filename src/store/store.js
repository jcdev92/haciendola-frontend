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

  
const errorStore = createStore("error-storage", {
    statusCode: null,
    message: null,
});

const successStore = createStore("success-storage", {
    statusCode: null,
    message: null,
});

const tokenStatusStore = createStore("token-storage", {
  isLoggedIn: false,
});



export {
    errorStore,
    successStore,
    tokenStatusStore,
}
