import React, { useContext, useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Settings.css";
import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { Context } from "../../context/Context";
import swal from "sweetalert";
const Settings = () => {
  const PF = "http://localhost:5000/images/";
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put(`/users/${user._id}`, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  const handleFile = (e) => {
    setClicked(true);
    setFile(e.target.files[0]);
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`/${user._id}`, {
        data: {
          userId: user._id,
        },
      });
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">
            <DeleteIcon onClick={handleDelete} />
          </span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={!clicked ? PF + user.profilePic : URL.createObjectURL(file)}
              alt=""
            />
            <label htmlFor="fileInput">
              <AccountCircleIcon className="settingsPPIcon" />
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              // onClick={(e) => setClicked(true)}
              // onChange={(e) => setFile(e.target.files[0])}
              onChange={(e) => handleFile(e)}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            name="name"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "10px" }}
            >
              <div>
                {/* {swal({
                  title: "Successfully Added",
                  icon: "success",
                  buttons: false,
                  timer: 3000,
                })} */}
              </div>
              Profile has been Updated...
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
};

export default Settings;
