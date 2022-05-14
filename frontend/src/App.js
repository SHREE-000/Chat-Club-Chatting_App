import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./authPages/LoginPage/LoginPage";
import RegisterPage from "./authPages/RegisterPage/RegisterPage";
import DashboardPage from "./Dashboard/DashboardPage";
import PureContact from "./HomePage/PureContact";
import HomePage from "./HomePage/HomePage";
import PureService from "./HomePage/PureService";
// import { useSocket } from "./features/customHooks/useSocket";
// import { useDispatch } from "react-redux";

// import {
//   setFriendOnlineUsingSocket,
//   socketErrorAlertForSocket,
// } from "./features/friends/friendsSlice";


function App() {

// const dispatch = useDispatch();

  // eslint-disable-next-line
  // useSocket({
  //   socketSetup: (socket) => {
  //     // add global socket events here
  //     socket.on("online-status", (data) =>
  //       dispatch(
  //         setFriendOnlineUsingSocket({
  //           id: data.userId,
  //           status: data.isOnline,
  //         })
  //       )
  //     );
  //   },

  //   errorCallback: (error) => {
  //     dispatch(socketErrorAlertForSocket(error));
  //     console.log(error);
  //   },

  //   // connectCallback: (data) => {
  //   //   console.log("connected to socket");
  //   // },
  // });

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/service" element={<PureService />} />
          <Route path="/contact" element={<PureContact />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
