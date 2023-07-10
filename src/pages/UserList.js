import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

function UserList() {
  const [userList, setUserList] = useState([]); // array of objects
  const [editUser, setEditUser] = useState(null);//useState({name:"",email})
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const url = "http://localhost:5050/get-users";
      const res = await axios.post(url);
      const list = await res.data;
      setUserList(list);
      console.log(list);
    } catch (error) {
      console.error(error);
    }
  };


  const deleteUser = async (item) => {
    try {
      if (item.userEmail === 'admin@gmail.com') {
        toast.error("You cannot delete the admin");
        return;
      }
      const confirmDelete = window.confirm(`Do you want to delete ${item.userEmail}`);
      if (confirmDelete) {
        const url = `http://localhost:5050/delete-user?email=${item.userEmail}`;
        const res = await axios.get(url);
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

      const url = `http://localhost:5050/update-user2`;
      // const formData = new FormData();
      // formData.append('userEmail', editedUser.userEmail);
      // formData.append('userName', editedUser.userName);
      // formData.append('userPassword', editedUser.userPassword);

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

          {/* Heading */}
          <h1
            className="form-control-lg d-flex justify-content-center"
            style={{ color: "#0bbfb7"}}
          >
            PS2Mails userList
          </h1>

        {/* Table */}
          <div className="form-control">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>

              <tbody>
                {/* Table Body Mapping */}
                {userList.map((item, index) => (
                  <tr key={item.userEmail}>

                    <th scope="row">{index + 1}</th>
                    <td className="text-capitalize">{item.userName}</td>
                    <td>{item.userEmail}</td>
                    <td>{item.userPassword}</td>
                    <td className="fs-6">
                      {editUser && editUser.userEmail === item.userEmail ? (
                        <>

                          <input
                            type="text"
                            name="userName"
                            value={editedUser.userName}
                            onChange={handleInputChange}
                          />
                          <input
                            type="text"
                            name="userEmail"
                            value={editedUser.userEmail}
                            onChange={handleInputChange}
                          />
                          <input
                            type="text"
                            name="userPassword"
                            value={editedUser.userPassword}
                            onChange={handleInputChange}
                          />

                          <button
                            className="btn"
                            onClick={handleSaveEdit}
                            style={{ backgroundColor: "#efbbff" }}
                          >
                            <i className="fa-solid fa-check"></i>
                          </button>{" "}
                          <button
                            className="btn"
                            onClick={handleCancelEdit}
                            style={{ backgroundColor: "#efbbff" }}
                          >
                            <i className="fa-solid fa-xmark"></i>{" "}
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn"
                            onClick={() => handleEdit(item)}
                            style={{ backgroundColor: "#efbbff" }}
                          >
                            <i className="fa-solid fa-user-pen"></i>
                          </button>{" "}
                          {(
                            <button
                              className="btn"
                              onClick={() => deleteUser(item)}
                              style={{ backgroundColor: "#efbbff" }}
                            >
                              <i className="fa-solid fa-user-slash"></i>{" "}
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