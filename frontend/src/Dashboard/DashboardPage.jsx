import React, { useEffect } from "react";
import { styled } from "@mui/system";
import SideBar from "../Dashboard/SideBar/SideBar";
import FriendsSideBar from "../Dashboard/FriendsSideBar/FriendsSideBar";
import Messenger from "../Dashboard/Messenger/Messenger";
import AppBar from "../Dashboard/AppBar/AppBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset, setUser } from "../features/auth/authSlice";
import Room from "./Room/Room";
import { connectWithSocketServer } from '../realtimeCommunication/socketConnection';


const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
});

const DashboardPage = ({socket}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isUserInRoom } = useSelector((state) => state.room);
  const { friends } = useSelector((state) => state.friends);

  useEffect( () => {
    const userInLocalStorage = localStorage.getItem('user')
    if (!userInLocalStorage) {
      onLogout();
    } else {
      dispatch(setUser(JSON.parse(userInLocalStorage)))
      connectWithSocketServer(JSON.parse(userInLocalStorage), dispatch); 
    }
  }, [])

  const onLogout = () => {
    dispatch(reset());
    navigate("/login");
  };





  return (
    <Wrapper>
      <SideBar />
      <FriendsSideBar />
      <Messenger />
      <AppBar onLogout={onLogout} />
      {isUserInRoom && <Room />}
    </Wrapper>
  );
};

export default DashboardPage;
