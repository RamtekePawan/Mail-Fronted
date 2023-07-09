import React, { useRef, useState } from "react";
import { isEmail } from "validator";
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {faHome } from '@fortawesome/free-solid-svg-icons';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Contact() {
  let formRef = useRef();
  let [isSuccess, setIsSuccess] = useState(false);
  let [isError, setIsError] = useState(false);
  let [user, setUser] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  const validateEmailFormat = (email) => {
    return isEmail(email);
  };

  let changeName = (e) => {
    let newUser = { ...user, name: e.target.value };
    setUser(newUser);
  };

  let changeEmail = (e) => {
    let newUser = { ...user, email: e.target.value };
    setUser(newUser);
    setIsError(false); // Reset the error state on input change
  };

 

  let changeMessage = (e) => {
    let newUser = { ...user, message: e.target.value };
    setUser(newUser);
  };

  let addContact = async () => {
    try {
      formRef.current.classList.add("was-validated");
      if (!validateEmailFormat(user.email)) {
        toast.error('Invalid email format or not entered');
        return;
      }
  
      let uri = `http://localhost:4000/addContact?name=${user.name}&email=${user.email}&number=${user.number}&message=${user.message}`;
      let res = await fetch(uri);
  
      let newUser = {
        name: "",
        email: "",
        number: "",
        message: "",
      };
      setUser(newUser);
  
      formRef.current.classList.remove("was-validated");
      toast.success('Thank you for contacting us');
      window.location.href = "http://localhost:3000/home";
    } catch (err) {
      toast.error('Error');
    } finally {
      setTimeout(() => {
        toast.dismiss();
      }, 5000);
    }
  };

  return (
    <>
    <div>
     
        </div>
        <marquee className="mymarquee" behavior="scroll" direction="left" style={{ color: "#0bbfb7", fontFamily:""}}>
          Enjoy the fastest mailing service,You've Got Questions. We've Got Email.
        </marquee>
      <div className="row mymain d-flex flex-coloumn">
        
        <div className="col-sm-8 col-md-4">
          <div className="mybrand">
            <i className="fa-solid fa-envelope" /> | PS2MAILS
          </div>
          <div className="mycontact">
            <div className="myacct">
              <h4>Contact Us</h4>
            </div>
            <hr />
           
            <form ref={formRef} className="needs-validation">
              <div className="row p-2">
                <input
                  className="form-control col inputs"
                  style={{ margin: "0 4px" }}
                  type="text"
                  id="nameId"
                  placeholder="Your Name"
                  minLength={4}
                  value={user.name}
                  onChange={changeName}
                  required
                />
                 <div className="invalid-feedback">
                  Please enter name
                </div>
              </div>
              <input
                className="form-control mb-2 inputs"
                type="email"
                id="emailId"
                placeholder="Your Email"
                minLength={10}
                value={user.email}
                onChange={changeEmail}
                required
              />
              <div className="invalid-feedback">
                  Please enter a valid email
                </div>
              
              <textarea
                className="form-control inputs"
                cols={30}
                rows={3}
                id="messageId"
                placeholder="Message"
                defaultValue={""}
                minLength={8}
                value={user.message}
                onChange={changeMessage}
                required
              />
              <div className="invalid-feedback">
                  Please give the valuable feedback/issues
                </div>
              <div className="row justify-content-center m-3">
                <input
                  className="btn col-sm-6 text-white"
                  style={{ backgroundColor: "#0bbfb7", fontWeight: "bold" }}
                  type="button"
                  onClick={addContact}
                  defaultValue="Send Message"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <footer
            className="row align-items-center"
            style={{ justifyContent: "center" }}
          >
            © www.PS2Mails.com. All rights reserved.
          </footer>
        </div>
        {isSuccess && <div className="alert alert-success">Thank you for contacting us</div>}
        {isError && <div className="alert alert-danger">Error</div>}
      </div>
      <ToastContainer />

    </>
  );
}

export default Contact;
