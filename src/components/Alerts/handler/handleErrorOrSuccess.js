import { errorStore, successStore } from "../../../store/useStore"

export const handleErrorOrSuccess = (isError, isSuccess, error) => {
  

    if (isError) {
      errorStore.getState().setState(
        {
          statusCode: error.response?.data.statusCode,
          message: error.response?.data.message.join(', ').slice('')
        }
      )
      successStore.getState().clearState()
    }

    if (isSuccess) {
      successStore.getState().setState(
        {
          statusCode: 200,
          message: 'operation successfuflly completed'
        }
      )
      errorStore.getState().clearState()
    }
}