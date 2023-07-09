import {faHome } from '@fortawesome/free-solid-svg-icons';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function About() {
  return (
    <>
      <div className="main" >
        <div>

        </div>
        <div className="row">
          <div className="col">
            <header style={{ color: "black" }}>
              <h1
                className="titles"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  color: "#0bbfb7",
                }}
              >
                Welcome to Our Website
              </h1>
            </header>
            <br />
            <h1
              className="titles"
              style={{
                color: "black",
                alignItems: "center",
                textAlign: "center",
                color: "#0bbfb7",
              }}
            >
              PS2Mails
            </h1>
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              Welcome to the world of the Mail!
              <p>
                
                The Gmail user interface initially differed from other web-mail systems with its focus on search and conversation threading of emails, grouping several messages between two or more people onto a single page, an approach that was later copied by its competitors. Gmail's user interface designer, intended users to feel as if they were always on one page and just changing things on that page, rather than having to navigate to other places
              </p>
            </div>

            <h1
              style={{
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                color: "#0bbfb7",
              }}
              className="titles justify-content-center"
            >
              About Us
            </h1>
            <div
              className="row justify-content-center "
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <div className="col-sm-6 col-md-3">
                <div className="card" style={{ width: "18rem" }}>
                  <img
                    src="images/"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body" style={{ textAlign: "center" }}>
                    <h5 className="card-title" style={{ color: "#660066" }}>
                      {" "}
                    Pawan Ramteke
                    </h5>
                    <p ><i class="fa-solid fa-envelope"></i> pawanramteke@gmail.com</p>
              
                    <p className="card-text">
                      <i class="fa-solid fa-phone"></i>+91-77749 97165
                    </p>
                  </div>
                </div>
              </div>

              
            


              <div className="column col-sm-6 col-md-3 ">
                <div className="card" style={{ width: "18rem" }}>
                  <img
                    src="images/shubhashri.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body " style={{ textAlign: "center" }}>
                    <h5 className="card-title " style={{ color: "#660066" }}>
                      Shubhashri Patil
                    </h5>
                    <p><i class="fa-solid fa-envelope"></i> shubhashribpatil@gmail.com</p>
                   

                    <p className="card-text">
                      <i class="fa-solid fa-phone"></i>+91-9834309365
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-md-3">
                <div className="card" style={{ width: "18rem" }}>
                  <img
                    src="images/samrudhhi.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body" style={{ textAlign: "center" }}>
                    <h5 className="card-title" style={{ color: "#660066" }}>
                      {" "}
                     Samruddhi Ghodgavkar
                    </h5>
                    <p ><i class="fa-solid fa-envelope"></i> sonarsamruddhi775@gmail.com</p>
              
                    <p className="card-text">
                      <i class="fa-solid fa-phone"></i>+91-7058660928
                    </p>
                  </div>
                </div>
              </div>



            </div>
            <div className="row">
              <footer
                className="row align-items-center"
                style={{ justifyContent: "center" }}
              >
                © www.soundpulse.com. All rights reserved.
              </footer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
