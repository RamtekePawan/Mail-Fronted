import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {faHome } from '@fortawesome/free-solid-svg-icons';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function UserList() {
  const [userList, setUserList] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const url = "http://localhost:4000/readAll";
      const res = await fetch(url);
      const list = await res.json();
      setUserList(list);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (item) => {
    try {
      if (item.email === 'rakesh123@gmail.com') {
        toast.error("You cannot delete the admin");
        return;
      }
      const confirmDelete = window.confirm(`Do you want to delete ${item.email}`);
      if (confirmDelete) {
        const url = `http://localhost:4000/deleteUser?email=${item.email}`;
        const res = await fetch(url);
        if (res.status === 500) {
          const errorMessage = await res.text();
          throw new Error(errorMessage);
        }
        getUsers();
        toast.success("User deleted successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setEditedUser(user);
  };

  const handleCancelEdit = () => {
    setEditUser(null);
  };

  const handleInputChange = (e) => {
    setEditedUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveEdit = async () => {
    try {
      const url = `http://localhost:4000/updateUser`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedUser),
      });
  
      if (res.status === 500) {
        const errorMessage = await res.text();
        throw new Error(errorMessage);
      }
  
      setEditUser(null);
      getUsers();
      toast.success("User updated successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  

  return (
    <>
      <div
        className="row justify-content-center"
        style={{ backgroundColor: "", height: "100vh" }}
      >
        <div className="col-sm-12 col-md-11">
        
          <a href="http://localhost:3000/home" style={{color: '#800080', textDecoration: 'none'}}>  <OverlayTrigger
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
                        marginBottom: "5px"
                      }}
                    >
                      {" "}
                      <FontAwesomeIcon icon={faHome} />
                    </button>
                  </OverlayTrigger></a>

                  <h1
            className="form-control-lg d-flex justify-content-center"
            style={{ color: "#0bbfb7", backgroundColor: "" }}
          >
            PS2Mails UserList
          

          </h1>
          <div className="form-control">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">D.O.B</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {userList.map((item, index) => (
                  <tr key={item.email}>
                    <th scope="row">{index + 1}</th>
                    <td className="text-capitalize">{item.firstname}</td>
                    <td className="text-capitalize">{item.lastname}</td>
                    <td>{item.email}</td>
                    <td>{item.dob}</td>
                    <td>{item.gender}</td>
                    <td className="fs-6">
                      {editUser && editUser.email === item.email ? (
                        <>
                          <input
                            type="text"
                            name="firstname"
                            value={editedUser.firstname}
                            onChange={handleInputChange}
                          />
                          <input
                            type="text"
                            name="lastname"
                            value={editedUser.lastname}
                            onChange={handleInputChange}
                          />
                          <input
                            type="text"
                            name="dob"
                            value={editedUser.dob}
                            onChange={handleInputChange}
                          />
                          <input
                            type="text"
                            name="gender"
                            value={editedUser.gender}
                            onChange={handleInputChange}
                          />
                          <button
                            className="btn"
                            onClick={handleSaveEdit}
                            style={{ backgroundColor: "#efbbff" }}
                          >
                            <i class="fa-solid fa-check"></i>
                          </button>{" "}
                          <button
                            className="btn"
                            onClick={handleCancelEdit}
                            style={{ backgroundColor: "#efbbff" }}
                          >
                            <i class="fa-solid fa-xmark"></i>{" "}
                            </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn"
                            onClick={() => handleEdit(item)}
                            style={{ backgroundColor: "#efbbff" }}
                          >
                            <i class="fa-solid fa-user-pen"></i>
                          </button>{" "}
                          {(
                            <button
                              className="btn"
                              onClick={() => deleteUser(item)}
                              style={{ backgroundColor: "#efbbff" }}
                            >
                              <i class="fa-solid fa-user-slash"></i>{" "}
                            </button>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />

    </>
  );
}

export default UserList;  