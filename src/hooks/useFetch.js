import axios from "axios";
export const url_api = import.meta.env.VITE_API_URL_DEV;

const api_base = import.meta.env.VITE_API_BASE_URL_DEV;

// axios configuration
export const instance = axios.create({
  baseURL: `${url_api}/${api_base}`,
});

// Añadir un interceptor de petición que añada el token en los headers
instance.interceptors.request.use(config => {
  // Obtener el token del localStorage o donde se guarde
  const token = localStorage.getItem('token');
  // Si hay token, añadirlo al header de autorización
  if (token) {
    config.headers['Authorization'] = 'bearer ' + token;
  }
  // Devolver la configuración modificada
  return config;
});

export const loginFetch = async (data) => {
    const {email, password} = data
    const res = await instance.post('/auth/login', {email, password});
    return res;
}


export const getMany = (keyword) => {
    return async() => {
        const res = await instance.get(`/${keyword}`);
        const data = res.data;
        return data;
    };
};

export const getOne = async(keyword) => {
    return async({id}) => {
    const res = await instance.get(`/${keyword}/${id}`)
    return res.data;
    }
}


export const addOne = async(keyword, data) => {
    const res = await instance.post(`/${keyword}`, data);
    return res.data;
};


export const updateOne = async(keyword, {id, data}) => {
    const res = await instance.patch(`/${keyword}/${id}`, data);
    return res.data;
};


export const deleteOne = async(keyword, id) => {
    const res = await instance.delete(`/${keyword}/${id}`);
    return res.data;

};

export const checkTokenExpired = async (token) => {
    const res = await instance.post(`/auth/authStatus/`, {token});
    return res.data;
}
