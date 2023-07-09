import React, { useRef, useState } from "react";
import { isEmail } from "validator";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";



function Login(props) {

  const { setUserLoginData } = props;

  const navigate = useNavigate();
  let formRef = useRef();
  let [isSuccess, setIsSuccess] = useState(false);

  let [isError, setIsError] = useState(false);

  let [user, setUser] = useState({
    email: "",
    password: "",
  });

  const validateEmailFormat = (email) => {
    return isEmail(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newuser = { ...user, [name]: value };
    console.log(newuser);
    setUser(newuser);
  }

  let addLogin = async () => {
    //event.preventdefault();
    try {
      formRef.current.classList.add("was-validated");
      if (!validateEmailFormat(user.email)) {
        setIsError(true);
        return;
      }

      //  Backend...
      let formValues = { email: user.email, password: user.password };
      let url = `http://127.0.0.1:5050/login-user`;
      // let res = await fetch(url, {
      //   method: "POST",
      //   body: data,
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      const formData = new FormData();
      // console.log(Object.keys(formValues))
      Object.keys(formValues).forEach(key => {
        formData.append(key, formValues[key]); // formdata:{ email: "email"}
      });

      const { status, data } = await axios.post(url, formData);
      console.log(data, status);
      if (data.isAdmin) {
        toast.success('Welcome Admin!');
        setTimeout(() => {

        }, 2000);
        return;
      }

      setUserLoginData(data); //stores to local storage
      localStorage.setItem("loginData", JSON.stringify(data));
      toast.success('Login Successful');

      //  let loginData = await res.json();
      setTimeout(() => {
        navigate("/home");
        // window.location.href = "http://localhost:3000/home";
      }, 2000);

    } catch (err) {
      toast.error(err.message);
      setIsError(true);
    } finally {
      setTimeout(() => {
        setIsError(false);
        setIsSuccess(false);
      }, 5000);
    }

  };

  return (
    <>
      <div
        className="row d-flex flex-column justify-content-center align-items-center"
        style={{ backgroundColor: "#efbbff", height: "100vh" }}
      >
        <div className="col-sm-8 col-md-6 col-lg-4">
          <div className="mybrand">
            <i className="fa-solid fa-envelope" /> | PS2Mails
          </div>

          <div className="mylogin">
            <div
              style={{
                textAlign: "center",
                margin: "8px 0",
                marginBottom: 20,
                fontSize: 19,
              }}
            >
              <h4>Log in to Ps2mails</h4>
            </div>

            {/* Form */}
            <form ref={formRef} className="needs-validation">
              {/* Email */}
              <div>
                <input
                  type="text"
                  className={`inputs form-control mb-3 p-2 ${isError ? "is-invalid" : isSuccess ? "is-valid" : ""
                    }`}

                  placeholder="Email address"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">
                  Invalid email address or not registered
                </div>

              </div>
              {/* Password */}
              <div>
                <input
                  type="password"
                  className="inputs form-control mb-3 p-2"
                  name="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">
                  Please enter a valid password.
                </div>

              </div>
              {/* LoginButton */}
              <butto
                className="btn w-100 text-white btn-lg mb-3 mylogins"
                onClick={addLogin}
                style={{ backgroundColor: "#be29ec", fontWeight: "bold" }}

              >LogIn</butto>
              <div
                style={{ textAlign: "center", color: "#800080", fontSize: 14 }}
              >
                <a
                  href="http://localhost:3000/register"
                  style={{ color: "#800080", textDecoration: "none" }}
                >
                  <span className="mytext">Register for PS2mails</span>
                </a>
              </div>
            </form>
          </div>
        </div>

        <br />
        <div className="row">
          <footer
            className="row text"
            style={{ justifyContent: "center" }}
          >
            © www.ps2mails.com. All rights reserved.
          </footer>
        </div>
        {isSuccess && toast.success('Login Successful')}

      </div>
      <ToastContainer />
    </>
  );
}

export default Login;






