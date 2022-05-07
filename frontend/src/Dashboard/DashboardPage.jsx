import React, { useEffect } from "react";
import { styled } from "@mui/system";
import SideBar from "../Dashboard/SideBar/SideBar";
import FriendsSideBar from "../Dashboard/FriendsSideBar/FriendsSideBar";
import Messenger from "../Dashboard/Messenger/Messenger";
import AppBar from "../Dashboard/AppBar/AppBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../features/auth/authSlice";
// import { connectWithSocketServer } from "../realtimeCommunication/socketConnection";
import { setFriendOnlineUsingSocket } from '../features/friends/friendsSlice'


const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
});

const DashboardPage = ({socket}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(reset());
    navigate("/login");
  };


  if (!user) {
    onLogout();
  } else {
    if (user) {
      // connectWithSocketServer(user);
    }
  }

  // useEffect( () => {

  //   if (socket) {
  //     socket.on('online-status', (data) => {
  //       // dispatch(setFriendOnlineUsingSocket(data))
  //     },[])
  //   }

  // })

  // useEffect(() => {
  //   const userDetails = localStorage.getItem("user");

  //   if (!user && !userDetails) {
  //     onLogout();
  //   } else {
  //     if (userDetails) {
  //       connectWithSocketServer(JSON.parse(userDetails));
  //     }
  //   }
  // }, [onLogout]);

  return (
    <Wrapper>
      <SideBar />
      <FriendsSideBar />
      <Messenger />
      <AppBar onLogout={onLogout} />
    </Wrapper>
  );
};

export default DashboardPage;
