import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import Config from "../Config"
import '../App.css';
import { register } from '../redux/actions';


function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        if (localStorage.getItem("userToken")){
          navigate("/dashboard");
        }
      },[])

    const registervalidationSchema = Yup.object({
        username: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        password: Yup.string()
          .min(8, 'Password is too short - should be 6 chars minimum')
          .required('Required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
    });

    const formik = useFormik({
        initialValues: {
          username: '',
          password: '',
          email: '',
        },
        validationSchema: registervalidationSchema,
        onSubmit: async values => {
            let reqData = {
                username: values.username,
                email : values.email,
                password: values.password
            }
            await dispatch(register(reqData));
            navigate("/login");
            // axios({
            //     url: Config.serverUrl + "api/v1/user/register",
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     method: "POST",
            //     data: reqData,
            // }).then((res) => {
            //     if (res && res.data && res.data.status) {
            //         navigate("/login");
            //     }
            //     toast(res.data.message)
            // })
            // .catch((err) => {
            //     // if (err && err.response && err.response.data) {
            //     //     setErrors(err.response.data.errors);
            //     // }
            //     console.log("err:",err)
            // });
        },
      });

  return (
    <div>
    <form className="form-container" onSubmit={formik.handleSubmit}>
         <h2 className="form-title">Register</h2>
         <div className="form-group">
             <label htmlFor="email">Username</label>
             <input
                 type="username"
                 id="username"
                 name="username"
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}               
                 value={formik.values.username}
             />
             { formik.errors.username && <span className='error-msg'>{formik.errors.username}</span> }
         </div>
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
         <a href='/login'>Sign In</a>
     </form>
 </div>
  );
}

export default Register;
