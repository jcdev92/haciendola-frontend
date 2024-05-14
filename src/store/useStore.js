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


export {
    errorStore,
}
