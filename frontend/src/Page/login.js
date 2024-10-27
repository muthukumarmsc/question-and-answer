import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import { login } from '../redux/actions';
import '../App.css';
import Config from "../Config"


function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        if (localStorage.getItem("userToken")){
          navigate("/dashboard");
        }
      },[])

    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema : Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            password: Yup.string()
              .required('Required')
        }),
        onSubmit: async values => {
          let reqData = {
              email : values.email,
              password: values.password
          }
          await dispatch(login(reqData));
          navigate("/dashboard");
        },
      });

  return (
    <div>
       <form className="form-container" onSubmit={formik.handleSubmit}>
            <h2 className="form-title">Login</h2>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}               
                    value={formik.values.email}
                />
                { formik.errors.email && <span className='error-msg'>{formik.errors.email}</span> }
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}  
                />
                { formik.errors.password && <span className='error-msg'>{formik.errors.password}</span> }
            </div>
            <button type="submit" className="submit-button">Submit</button>
            <a href='/register'>Sign Up</a>
        </form>
    </div>
  );
}

export default Login;
