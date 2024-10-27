import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

import Config from "../Config"

export const userLogin = (token) => ({
  type: "USER_LOGIN",
  payload: token,
});
export const userRegister = (body={}) => ({
  type: "USER_REGISTER",
  payload: body,
});
export const selectOption = (id, option) => ({
    type: 'SELECT_OPTION',
    payload: { id, option },
  });
  
  export const nextQuestion = () => ({
    type: 'NEXT_QUESTION',
  });
  
  export const resetQuestion = () => ({
    type: 'RESET_QUESTION',
  });
  export const logout = () => ({
    type: 'LOGOUT',
  });

  export const login = (reqData) => {
    return async (dispatch) => {
      try {
        const response = await axios.post(`${Config.serverUrl}api/v1/user/login`, reqData);
        if (response && response.data && response.data.status) {
          const token = (response.data && response.data.access_token) ? response.data.access_token : "";          
          localStorage.setItem('userToken', token);
          dispatch(userLogin(token));
        }
        toast(response.data.message);
        return {
          loading: false,
          result: response.data
      }
      } catch (error) {
        console.error('Login error:', error);
        return {
            loading: false,
            error: error.response.data.errors
        }
      }
    };
  };

  export const register = (reqData) => {
    console.log("reqData:",reqData)
    return async (dispatch) => {
      try {
        const response = await axios.post(`${Config.serverUrl}api/v1/user/register`, reqData);
        if (response && response.data && response.data.status) {
          dispatch(userRegister(response.data));
        }
        toast(response.data.message);
        return {
          loading: false,
          result: response.data
      }
      } catch (error) {
        console.error('Login error:', error);
        return {
            loading: false,
            error: error.response.data.errors
        }
      }
    };
  };

  export const logoutUser = () => {
    return (dispatch) => {
      localStorage.removeItem('userToken'); 
      dispatch(logout());
    };
  };
  