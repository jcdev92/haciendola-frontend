/* eslint-disable no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addOne, deleteOne, getMany, updateOne } from "./useFetch";

  
  // CREATE hook (corrected)
  export function useCreate(keyword) {
    const queryClient = useQueryClient();
    const mutation = useMutation(async (data) => await addOne(keyword, data), 
    {
      onSuccess: () => {
        queryClient.invalidateQueries(keyword);
      },
    });
    return mutation;
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
      mutationFn: async ({id, data}) => await updateOne(keyword, {id, data}),
      onSettled: () => queryClient.invalidateQueries({ queryKey: [keyword] }),
    });
  }
  
  //DELETE hook
  export function useDelete(keyword) {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (itemId) => await deleteOne(keyword, itemId),
      onSettled: () => queryClient.invalidateQueries({ queryKey: [keyword] }),
    });
  }