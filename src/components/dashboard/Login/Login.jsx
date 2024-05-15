"use client";
import { loginFetch } from "../../../hooks/useFetch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../Alerts/Loading";
import Form from "./Form";
import { errorStore } from "../../../store/useStore";

export const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onSubmit = (data) => {
    setLoading(true);
    loginFetch(data)
      .then((res) => {
        if (res.status === 201) {
          localStorage.setItem("token", res.data.token);
          navigate("/dashboard");
          setLoading(false);
        } else if (res.status === 404) {
          errorStore.setState({
            status: res.status,
            message: "not found url"
          })
          setLoading(false);
        }
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
    <div className=" flex flex-col justify-center items-center h-screen bg-gradient-to-r from-orange-300 to-orange-600 text-white font-mono">
      {loading ? <Loading /> : <Form data={onSubmit} />}
    </div>
  );
};
