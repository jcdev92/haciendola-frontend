import { errorStore, successStore } from "../../../store/useStore"

export const handleErrorOrSuccess = (isError, isSuccess, error, status) => {
  

    if (isError) {
      errorStore.setState(
        {
          status: status.response?.data.statusCode,
          message: error.response?.data.message.join(' ').split('')
        }
      )
    }

    if (isSuccess) {
      successStore.setState(
        {
          status: 200,
          message: 'operation successfuflly completed'
        }
      )
    }
}