"use client";
import { loginFetch } from "../../../hooks/useFetch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../Alerts/Loading";
import Form from "./Form";
import { errorStore, productsStore } from "../../../store/useStore";

export const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onSubmit = (data) => {
    setLoading(true);
    loginFetch(data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        productsStore.setState(res.data.products);
        navigate("/dashboard");
        setLoading(false);
      })
      .catch((err) => {
        err && errorStore.setState({
          status: err.response.data.statusCode,
          message: err.response.data.message
        })
        setLoading(false);
      });
  };

  return (
    <div className=" flex flex-col justify-center items-center h-screen bg-gradient-to-r from-blue-800 to-indigo-900 text-white font-mono">
      {loading ? <Loading /> : <Form data={onSubmit} />}
    </div>
  );
};
