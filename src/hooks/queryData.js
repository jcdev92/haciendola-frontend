/* eslint-disable no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMany } from "./useFetch";

  //CREATE hook
  export function 
  useCreate(keyword) {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (item) => {
        //send api update request here
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return Promise.resolve();
      },
      //client side optimistic update
      onMutate: (newData) => {
        queryClient.setQueryData([keyword], (prevData) => [
          ...prevData,
          {
            ...newData,
            id: (Math.random() + 1).toString(36).substring(7),
          },
        ]);
      },
      onSettled: () => queryClient.invalidateQueries({ queryKey: [keyword] }),
    });
  }
  
  //READ hook
  export function useGet(keyword) {
    return useQuery({
      queryKey: [keyword],
      queryFn: getMany(keyword),
      refetchOnWindowFocus: false,
    })
  }
  
  //UPDATE hook 
  export function useUpdate(keyword) {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (item) => {
        //send api update request here
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return Promise.resolve();
      },
      //client side optimistic update
      onMutate: (newItem) => {
        queryClient.setQueryData([keyword], (prevData) =>
          prevData?.map((prevItem) =>
            prevItem.id === newItem.id ? newItem : prevItem,
          ),
        );
      },
      onSettled: () => queryClient.invalidateQueries({ queryKey: [keyword] }),
    });
  }
  
  //DELETE hook
  export function useDelete(keyword) {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (itemId) => {
        //send api update request here
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return Promise.resolve();
      },
      //client side optimistic update
      onMutate: (itemId) => {
        queryClient.setQueryData([keyword], (prevData) =>
          prevData?.filter((item) => item.id !== itemId),
        );
      },
      onSettled: () => queryClient.invalidateQueries({ queryKey: [keyword] }),
    });
  }