import React, { useRef, useState } from "react";
import { isEmail } from "validator";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";


function SendMail(props) {

    const navigate = useNavigate();

    let formRef = useRef();
    let [isSuccess, setIsSuccess] = useState(false);
    let [isError, setIsError] = useState(false);

    const { userLoginData } = props;

    const { userId = "" } = userLoginData || {};

    let [mail, setMail] = useState({
        email: "",
        sender_id: userId || null,
        subject: "",
        message: ""
    });

    let loginData = localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData")) : null;

    mail.sender_id = loginData.userId;
    // if (userId != "" && userId) {
    //     mail.sender_id = userId;
    // }

    function validateEmailFormat(email) {
        return isEmail(email);
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        let newMail = { ...mail, [name]: value };
        console.log(newMail);
        setMail(newMail);
    }


    let sendMail = async () => {

        try {
            formRef.current.classList.add("was-validated");
            if (!validateEmailFormat(mail.email)) {
                toast.error('Invalid email format or not entered');
                return;
            }

            const formData = new FormData();

            // console.log(Object.keys(formValues))
            Object.keys(mail).forEach(key => {
                formData.append(key, mail[key]); // formdata:{ email: "email"}
            });

            // let data = { email: mail.email, sender_id: userId, subject: mail.subject, message: mail.message }
            let uri = `http://localhost:5050/send-mail`;

            const { status, data } = await axios.post(uri, formData);
            console.log(data, status);

            if (status != 500) {
                toast.success("Mail Sent Successfully!!!");
            }
            let newMail = {
                email: "",
                sender_id: "",
                subject: "",
                message: ""
            };

            setMail(newMail);

            formRef.current.classList.remove("was-validated");

            //  window.location.href = "http://localhost:3000/home";
        } catch (err) {
            toast.error('Error');
        } finally {
            setTimeout(() => {
                toast.dismiss();
            }, 5000);
        }
        navigate("/home", { replace: true });
    };

    return (
        <>
            <div>

            </div>
            <marquee className="mymarquee" behavior="scroll" direction="left" style={{ color: "#0bbfb7", fontFamily: "" }}>
                Enjoy the fastest mailing service,You've Got Questions. We've Got Email.
            </marquee>
            <div className="row mymain d-flex flex-coloumn">

                <div className="col-sm-8 col-md-4">
                    <div className="mybrand">
                        <i className="fa-solid fa-envelope" /> | PS2MAILS
                    </div>
                    <div className="mycontact">
                        <div className="myacct">
                            <h4>SEND MAIL</h4>
                        </div>
                        <hr />

                        <form ref={formRef} onSubmit={sendMail} className="needs-validation">

                            <div className="row p-2">

                                <input
                                    className="form-control mb-2 inputs"
                                    type="email"
                                    name="email"
                                    placeholder="To Email"
                                    value={mail.mailEmail}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="invalid-feedback">
                                    Please enter a valid email
                                </div>

                                <input
                                    className="form-control col inputs"
                                    style={{ margin: "0 4px" }}
                                    type="text"
                                    name="subject"
                                    placeholder="Subject.."
                                    value={mail.subject}
                                    onChange={handleChange}
                                    required
                                />
                                <div className="invalid-feedback">
                                    Please enter subect
                                </div>
                            </div>



                            <textarea
                                className="form-control inputs"
                                cols={30}
                                rows={3}
                                name="message"
                                placeholder="Message"
                                minLength={8}
                                value={mail.message}
                                onChange={handleChange}
                                required
                            />

                            <div className="row justify-content-center m-3">
                                <button
                                    className="btn col-sm-6 text-white"
                                    style={{ backgroundColor: "#0bbfb7", fontWeight: "bold" }}
                                    type="submit"
                                    onClick={sendMail}

                                > SEND MAIL </button>
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
                {isSuccess && <div className="alert alert-success">Mail Sent Successfully</div>}
                {isError && <div className="alert alert-danger">Error</div>}
            </div>
            <ToastContainer />

        </>
    );
}

export default SendMail;
