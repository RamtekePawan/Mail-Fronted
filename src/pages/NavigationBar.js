import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faInfoCircle,
    faEnvelope,
    faUserPlus,
    faSignOutAlt,
    faAddressCard,
    faUsersLine,
    faHome,
    faSignIn,
    faMailForward
} from "@fortawesome/free-solid-svg-icons";
import { Nav, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";


function NavigationBar(props) {
    const navigate = useNavigate()
    const { userLoginData, setUserLoginData } = props;

    let logOutAction = () => {
        localStorage.removeItem("loginData");
        localStorage.removeItem("loginStatus");
        setUserLoginData(null);
        navigate("/login");
    }
    return (
        <div>
            {/* Navigation Bar */}
            <nav
                className="navbar navbar-expand-lg sticky-top"
                style={{
                    backgroundColor: "#d8edec",
                    borderRadius: "5px 5px 20px 20px",
                }}
            >


                <div className="container-fluid">
                    <Nav.Link className="navbar-brand" as={Link} to="/home">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Circle-icons-mail.svg/204px-Circle-icons-mail.svg.png"

                            width={30}
                            height={30}
                        />
                    </Nav.Link>
                    <Nav.Link className="navbar-brand" as={Link} to="/home" style={{ color: "#0bbfb7" }}>
                        <b>PS2Mails</b>
                    </Nav.Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {/* me means padding from end change it to ms so it will give padding in the start  */}

                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                            {/* User List */}
                            {userLoginData && userLoginData.admin &&
                                <li className="nav-item mytags">
                                    <Nav.Link
                                        as={Link}
                                        to="/userList"
                                        className="nav-link active "
                                        aria-current="page"

                                        style={{ color: "#0bbfb7", margin: "0 5px" }}
                                    >
                                        <OverlayTrigger
                                            overlay={<Tooltip id="tooltip">User List</Tooltip>}
                                            placement="bottom"
                                        >
                                            <FontAwesomeIcon icon={faUsersLine} size="2x" />
                                        </OverlayTrigger>
                                    </Nav.Link>
                                </li>
                            }


                            {/* Login */}
                            {!userLoginData &&
                                <li className="nav-item ">
                                    <Nav.Link
                                        // href="http://localhost:3000/home"
                                        as={Link}
                                        to="/login"
                                        style={{ color: "#800080", textDecoration: "none" }}
                                    >
                                        <OverlayTrigger
                                            overlay={<Tooltip id="tooltip">Login</Tooltip>}
                                            placement="bottom"
                                        >
                                            <button
                                                className=" btn"
                                                type="button"
                                                style={{
                                                    color: "#efbbff",
                                                    background: "#0bbfb7",
                                                    marginRight: 2,
                                                }}
                                            >
                                                {" "}
                                                <FontAwesomeIcon icon={faSignIn} />
                                            </button>
                                        </OverlayTrigger>
                                    </Nav.Link>
                                </li>
                            }


                            {/* Home */}
                            {userLoginData &&
                                <li className="nav-item ">
                                    <Nav.Link
                                        // href="http://localhost:3000/home"
                                        as={Link}
                                        to="/home"
                                        style={{ color: "#800080", textDecoration: "none" }}
                                    >
                                        <OverlayTrigger
                                            overlay={<Tooltip id="tooltip">Home</Tooltip>}
                                            placement="bottom"
                                        >
                                            <button
                                                className=" btn"
                                                type="button"
                                                style={{
                                                    color: "#efbbff",
                                                    background: "#0bbfb7",
                                                    marginRight: 2,
                                                }}
                                            >
                                                {" "}
                                                <FontAwesomeIcon icon={faHome} />
                                            </button>
                                        </OverlayTrigger>
                                    </Nav.Link>
                                </li>
                            }

                            {/* mails Recieved */}
                            {userLoginData &&
                                <li className="nav-item mytags">
                                    <Nav.Link
                                        className="nav-link active"
                                        aria-current="page"
                                        as={Link}
                                        to="/mail"
                                        style={{ color: "#0bbfb7", margin: "0 5px" }}
                                    >
                                        <OverlayTrigger
                                            overlay={<Tooltip id="tooltip">Gmail</Tooltip>}
                                            placement="bottom"
                                        >
                                            <FontAwesomeIcon icon={faEnvelope} size="2x" />
                                        </OverlayTrigger>
                                    </Nav.Link>
                                </li>
                            }

                        {userLoginData &&
                                <li className="nav-item mytags">
                                    <Nav.Link
                                        className="nav-link active"
                                        aria-current="page"
                                        as={Link}
                                        to="/send-mail"
                                        style={{ color: "#0bbfb7", margin: "0 5px" }}
                                    >
                                        <OverlayTrigger
                                            overlay={<Tooltip id="tooltip">Send Mail</Tooltip>}
                                            placement="bottom"
                                        >
                                            <FontAwesomeIcon icon={faMailForward} size="2x" />
                                        </OverlayTrigger>
                                    </Nav.Link>
                                </li>
                            }


                            {/* About */}
                            <li className="nav-item mytags">
                                <Nav.Link
                                    className="nav-link active "
                                    aria-current="page"
                                    as={Link}
                                    to="/about"
                                    // href="http://localhost:3000/about"
                                    // target="_blank"
                                    style={{ color: "#0bbfb7", margin: "0 5px" }}
                                >
                                    <OverlayTrigger
                                        overlay={<Tooltip id="tooltip">About</Tooltip>}
                                        placement="bottom"
                                    >
                                        <FontAwesomeIcon icon={faInfoCircle} size="2x" />
                                    </OverlayTrigger>
                                </Nav.Link>
                            </li>

                            {/* Contact us */}
                            <li className="nav-item mytags">
                                <Nav.Link
                                    className="nav-link active "
                                    aria-current="page"
                                    as={Link}
                                    to="/contact"
                                    //href="http://localhost:3000/contact"
                                    // target="_blank"
                                    style={{ color: "#0bbfb7", margin: "0 5px" }}
                                >
                                    <OverlayTrigger
                                        overlay={<Tooltip id="tooltip">Contact</Tooltip>}
                                        placement="bottom"
                                    >
                                        <FontAwesomeIcon icon={faAddressCard} size="2x" />
                                    </OverlayTrigger>
                                </Nav.Link>
                            </li>


                            {/* Registration */}
                            {!userLoginData &&
                                <li className="nav-item mt-2">
                                    <Nav.Link
                                        as={Link}
                                        to="/register"
                                        //href="http://localhost:3000/register"
                                        // target="_blank"
                                        style={{ color: "#0bbfb7", textDecoration: "none" }}
                                    >
                                        <OverlayTrigger
                                            overlay={<Tooltip id="tooltip">Register</Tooltip>}
                                            placement="bottom"
                                        >
                                            <button
                                                className=" btn"
                                                type="button"
                                                style={{
                                                    color: "#efbbff",
                                                    background: "#0bbfb7",
                                                    marginRight: 2,
                                                }}
                                            >
                                                {" "}
                                                <FontAwesomeIcon icon={faUserPlus} />
                                            </button>
                                        </OverlayTrigger>
                                    </Nav.Link>
                                </li>
                            }

                            {/* Log Out */}
                            {userLoginData &&
                                <li className="nav-item mt-2">
                                    <Nav.Link
                                        // href="http://localhost:3000/login"
                                        as={Link}
                                        to="/login"
                                        onClick={logOutAction}
                                        style={{ color: "#800080", textDecoration: "none", margin: "0 5px" }}
                                    >
                                        <OverlayTrigger
                                            overlay={<Tooltip id="tooltip">Logout</Tooltip>}
                                            placement="bottom"
                                        >
                                            <button
                                                className="btn"
                                                type="button"
                                                style={{
                                                    color: "#efbbff",
                                                    background: "#0bbfb7",
                                                    marginRight: 2,
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faSignOutAlt} />
                                            </button>
                                        </OverlayTrigger>
                                    </Nav.Link>
                                </li>
                            }


                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default NavigationBar
