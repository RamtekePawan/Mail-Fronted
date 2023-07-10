import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Mails(props) {
    console.log(1);
    const navigate = useNavigate();
    const { userLoginData } = props;

    const { userId = "" } = userLoginData || {};
    // Extract values from userLoginData object
    // const { userId } = userLoginData;
    //const { userLoginData } = props;
    // let [tempLoginData, setTempLoginData] = useState(null);
    const [recievedMailList, setRecievedMailList] = useState([]);
    const [sentMailList, setSentMailList] = useState([]);

    const [button, setButton] = useState("recieved");

    useEffect(() => {
        // let data = localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData")) : null;
        // setTempLoginData(data);
        // console.log(tempLoginData);
        // console.log(tempLoginData.userId);
        // getAllRecieved(tempLoginData);
        if (userId != "" && userId) {
            getAllRecieved();
        }
    }, []);
    console.log("Mail wala UserData :" + JSON.stringify(userLoginData));
    let getAllRecieved = async () => {

        let url = `http://localhost:5050/recieve?userId=${userId}`;
        console.log("2");
        await axios.get(url).then((res) => {
            console.log(res.data);
            setRecievedMailList(res.data);
            setButton("recieved");
        })
    }

    let handleRecieve = () => {
        getAllRecieved();
        setButton("recieved");
    };

    let handleSent = async () => {
        let url = `http://localhost:5050/sent?userId=${userId}`
        await axios.get(url).then((res) => {
            console.log(res.data);
            setSentMailList(res.data);
            setButton("sent");
        })
    };

    return (
        <div>
            <div className='row bg-body-secondary p-5 mt-5 g-5 mb-3 d-flex'>
                <div className='col-3 bg-body-tertiary ' style={{ height: "auto" }}>
                    <div className='row mb-3'>
                        <button className='bg-primary rounded-5' onClick={handleRecieve}><h6>Message Recieved</h6></button>
                    </div>
                    <div className='row mb-3'>
                        <button className='bg-primary rounded-5' onClick={handleSent}><h6>Message Sent</h6></button>
                    </div>
                </div>

                <div className='col-9'>

                    {button === "recieved" &&
                        recievedMailList.map((item) => (
                            <div className='col-9'>
                                <div className='row bg-info-subtle border-bottom border-black'>
                                    <div className='col-md-2 col-sm-6 bg-primary'> {item.user.userName}</div>
                                    <div className='col-md-2 col-sm-6 bg-primary'>Recieved</div>
                                    <div className='col-md-2 col-sm-6 bg-secondary'> {item.subject}</div>
                                    <div className='col-md-6 col-sm-12 bg-light-subtle'>{item.message}</div>
                                </div>
                            </div>
                        ))
                    }

                    {button === "sent" &&
                        sentMailList.map((item) => (
                            <div className='col-9'>
                                <div className='row bg-info-subtle border-bottom border-black'>
                                    <div className='col-md-2 col-sm-6 bg-primary'>{item.user.userName}</div>
                                    <div className='col-md-2 col-sm-6 bg-primary'>Sent</div>
                                    <div className='col-md-2 col-sm-6 bg-secondary'>{item.subject}</div>
                                    <div className='col-md-6 col-sm-12 bg-light-subtle'>{item.message}</div>
                                </div>
                            </div>
                        ))
                    }
                </div>


            </div>
        </div>
    )
};

export default Mails;

