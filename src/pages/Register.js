import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-bootstrap";
// import axios from "axios";

const Register = () => {

  let navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  let [isSuccess, setIsSuccess] = useState(false);
  let [isError, setIsError] = useState(false);

  let signUpSchema = Yup.object({
    name: Yup.string().min(2, "Name should atleast 2 character!!!").max(25, "Too Long!!").required("Please enter your Name"),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(8, "Minimum 8 Charecter Required").required("Please enter your password"),
    confirm_password: Yup.string()
      .required("Please Enter Confirm Password")
      .oneOf([Yup.ref("password"), null], "Password must match")
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values, action) => {
        console.log(values);
        try {
          // BACKEND :: ...
          let url = `http://127.0.0.1:5050/add-user`;
          let data = { userName: values.name, userEmail: values.email, userPassword: values.password };

          console.log(data.userName);
          console.log(data.userEmail);
          console.log(data.userPassword);

          axios.post(url, data)
            .then(response => {
              console.log(response.data);
              if (response.status === 500) {
                throw new Error();
              }
              action.resetForm();
              toast.success("Welcome to PS2mails!!!");
            })
            .catch(error => {
              alert(error)
              console.error(error);
            });
          navigate("/login", { replace: true });
        } catch (err) {
          setIsError(true);
          toast.error('Account is already registered');
        } finally {
          setTimeout(() => {
            setIsError(false);
            setIsSuccess(false);
          }, 3000);
        }

        action.resetForm();

      },
    });

  console.log(errors);
  return (
    <>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h1 className="text-center mb-4">Welcome!</h1>
                <p className="text-center">To the PS2mails</p>

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className={`form-control`}
                      autoComplete="off"
                      name="name"
                      id="name"
                      placeholder="Name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.name && errors.name && (
                      <div className="form-error text-danger">{errors.name}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className={`form-control`}
                      autoComplete="off"
                      name="email"
                      id="email"
                      placeholder="Email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.email && errors.email && (
                      <div className="form-error text-danger">{errors.email}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className={`form-control`}
                      autoComplete="off"
                      name="password"
                      id="password"
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.password && errors.password && (
                      <div className="form-error text-danger">{errors.password}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirm_password">Confirm Password</label>
                    <input
                      type="password"
                      className={`form-control`}
                      autoComplete="off"
                      name="confirm_password"
                      id="confirm_password"
                      placeholder="Confirm Password"
                      value={values.confirm_password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.confirm_password && errors.confirm_password && (
                      <div className="form-error text-danger">{errors.confirm_password}</div>
                    )}
                  </div>
                  <div className="text-center mt-4">
                    <button className="btn btn-warning rounded-pill " type="submit">
                      Registration
                    </button>
                  </div>
                </form>
                <p className="text-center mt-3">
                  Already have an account? <Link to="/login">Sign In now</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <p className="align-items-center">&copy; 2023  PS2mails. All rights reserved.</p>
      </footer>
      <ToastContainer />
    </>



  )
}

export default Register;
