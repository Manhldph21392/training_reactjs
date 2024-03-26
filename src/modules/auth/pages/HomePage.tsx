import { Button } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../../slices/userSlices";

type Props = {};

const HomePage = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setUser(null));
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div>
      <h1> HomePage</h1>
      <Button type="primary">
        <Link to="/list-data">Products List</Link>
      </Button>
      <Button type="primary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default HomePage;
