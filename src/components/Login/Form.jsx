/* eslint-disable react/prop-types */
import { ErrorAlert } from "../Alerts/ErrorAlert";
import { FaM } from "react-icons/fa6";
import { AiFillLock } from "react-icons/ai";
import { Button, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { errorStore } from "../../store/store";

const Form = ({data}) => {
    const { register, handleSubmit } = useForm();
    const errorStatus = errorStore.getState().state.statusCode

  return (
    <form
    className="flex max-w-md flex-col gap-4 lg:w-96 font-sans"
    onSubmit={handleSubmit(data)}
  >
    <div className="flex flex-col items-center gap-2 mb-8">
      <h1 className="text-4xl font-bebas drop-shadow-lg">PRODUCTS MANAGER</h1>
      <h1 className="text-4xl font-bebas drop-shadow-lg">LOGIN</h1>
    </div>
    <div className="flex flex-row items-center gap-2">
      <FaM />
      <TextInput
        id="email"
        placeholder="email"
        required
        type="email"
        className="w-full"
        {...register("email", { required: true })}
      />
    </div>
    <div className="flex flex-row items-center gap-2">
      <AiFillLock />
      <TextInput
        id="password"
        required
        type="password"
        placeholder="Password"
        className="w-full"
        {...register("password", { required: true })}
      />
    </div>
    <Button className="hover:scale-125 hover:text-red-700 ease-in-out transition-all delay-150" type="submit">Login</Button>
    {errorStatus ? <ErrorAlert /> : null}
  </form>
  )
}

export default Form