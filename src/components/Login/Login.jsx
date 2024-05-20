import { useState } from 'react';
"use client";
import { loginFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { Loading } from "../Alerts/Loading";
import Form from "./Form";
import { errorStore, tokenStatusStore, successStore } from "../../store/store";

export const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onSubmit = (data) => {
    setLoading(true);
    loginFetch(data)
      .then((res) => {
        errorStore.getState().clearState()
        if (res.status === 201) {
          localStorage.setItem("token", res.data.token);
          tokenStatusStore.getState().setState({
            isLoggedIn: true
          });
          navigate("/dashboard");
          successStore.getState().clearState()
          setLoading(false);
        } else if (res.status === 404) {
          errorStore.getState().setState({
            statusCode: res.data.statusCode,
            message: res.data.message
          })
          tokenStatusStore.getState().setState({
            isLoggedIn: false
          });
          setLoading(false);
        }
      })
      .catch((err) => {
        err && errorStore.getState().setState({
          statusCode: err.response.data.statusCode,
          message: err.response.data.message
        })
        tokenStatusStore.getState().setState({
          isLoggedIn: false
        });
        setLoading(false);
      });

  };

  return (
    <div className=" flex flex-col justify-center items-center h-screen bg-gradient-to-r from-orange-300 to-orange-600 text-white font-mono">
      {loading === true ? <Loading /> : <Form data={onSubmit} />}
    </div>
  );
};
