import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Mails(props) {
    console.log(1);
    const navigate = useNavigate();
    // const { userId } = props;
    //const { userId } = userLoginData;
    // Extract values from userLoginData object
    // const { userId } = userLoginData;
    const { userLoginData } = props;
    let [tempLoginData, setTempLoginData] = useState(null);
    const [recievedMailList, setRecievedMailList] = useState([]);
    const [sentMailList, setSentMailList] = useState([]);

    const [button, setButton] = useState("recieved");

    useEffect(() => {
        // let data = localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData")) : null;
        // setTempLoginData(data);
        // console.log(tempLoginData);
        // console.log(tempLoginData.userId);
        // getAllRecieved(tempLoginData);
        getAllRecieved();
        console.log(props);
        console.log(userLoginData);
    }, []);

    let getAllRecieved = async () => {
        console.log("2");
        let url = `http://localhost:5050/recieve?userId=1`;
        console.log("2");
        await axios.get(url).then((res) => {
            console.log(res.data);
            console.log("2");
            setRecievedMailList(res.data);
            setButton("recieved");
        })
    }

    let handleRecieve = () => {
        console.log("2");
        setButton("recieved");
        getAllRecieved(tempLoginData);
        console.log("2");
    };

    let handleSent = async () => {

        let url = `http://localhost:5050/sent?userId=${tempLoginData.userId}`
        await axios.get(url).then((res) => {
            console.log(res.data);
            setSentMailList(res.data);
            setButton("sent");
        })
    };

    return (
        <div>
            <div className='row bg-body-secondary p-5 mt-5 g-5 mb-3'>
                <div className='col-3 bg-body-tertiary h-100'>
                    <div className='row mb-3'>
                        <button className='bg-primary rounded-5' onClick={handleRecieve}><h6>Message Recieved</h6></button>
                    </div>
                    <div className='row'>
                        <button className='bg-primary rounded-5' onClick={handleSent}><h6>Message Sent</h6></button>
                    </div>
                </div>
                {button === "recieved" &&
                    recievedMailList.map((item) => (
                        <div className='col-9'>
                            <div className='row bg-info-subtle border-bottom border-black'>
                                <div className='col-md-3 col-sm-6 bg-primary'> {item.user.userName}</div>
                                <div className='col-md-3 col-sm-6 bg-secondary'> {item.subject}</div>
                                <div className='col-md-6 col-sm-12 bg-light-subtle'>{item.message}</div>
                            </div>
                        </div>
                    ))
                }

                {button === "sent" &&
                    <div className='col-9'>
                        <div className='row bg-info-subtle border-bottom border-black'>
                            <div className='col-md-3 col-sm-6 bg-primary'> Mail Sender</div>
                            <div className='col-md-3 col-sm-6 bg-secondary'> mail Subject</div>
                            <div className='col-md-6 col-sm-12 bg-light-subtle'>Message</div>
                        </div>
                    </div>
                }



            </div>
        </div>
    )
};

export default Mails;

