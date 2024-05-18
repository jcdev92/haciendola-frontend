/* eslint-disable no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addOne, checkTokenExpired, deleteOne, getMany, loginFetch, updateOne } from "./useFetch";
import { errorStore, successStore, tokenStatusStore } from "../store/useStore";

  
  // CREATE hook (corrected)
  export function useCreate(keyword) {
    const queryClient = useQueryClient();
    const mutation = useMutation(async (data) => await addOne(keyword, data), 
    {
      onSuccess: () => {
        queryClient.invalidateQueries(keyword);
        successStore.getState().setState({
          statusCode: 200,
          message: "Data added successfully"
        })
        errorStore.getState().clearState()
      },
      onError: (err) => {
        errorStore.getState().setState({
          statusCode: err.response.data.statusCode,
          message: err.response.data.message.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(", ")
        })
        successStore.getState().clearState()
      }
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
      onSuccess: () => {
        successStore.getState().setState({
          statusCode: 200,
          message: "Data updated successfully"
        })
        errorStore.getState().clearState()
      },
      onError: (err) => {
        errorStore.getState().setState({
          statusCode: err.response.data.message.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
          message: err.response.data.message
        })
        successStore.getState().clearState()
      },
      onSettled: () => queryClient.invalidateQueries({ queryKey: [keyword] }),
    });
  }
  
  //DELETE hook
  export function useDelete(keyword) {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (itemId) => await deleteOne(keyword, itemId),
      onSuccess: () => {
        successStore.getState().setState({
          statusCode: 200,
          message: "Data deleted successfully"
        })
        errorStore.getState().clearState()
      },
      onError: (err) => {
        errorStore.getState().setState({
          statusCode: err.response.data.message.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
          message: err.response.data.message
        })
        successStore.getState().clearState()
      },
      onSettled: () => queryClient.invalidateQueries({ queryKey: [keyword] }),
    });
  }
  
  export function checkTokenStatus(token) {
    if (token === null) {
      errorStore.getState().setState({
        statusCode: 401,
        message: "You have to login first"
      })
      tokenStatusStore.getState().setState({
        isLoggedIn: false
      });
    }
  
    checkTokenExpired(token)
      .catch((err) => {
        errorStore.getState().setState({
          statusCode: err.response.data.message,
          message: err.response.data.message
        })
        tokenStatusStore.getState().setState({
          isLoggedIn: false
        });
      });
  }

