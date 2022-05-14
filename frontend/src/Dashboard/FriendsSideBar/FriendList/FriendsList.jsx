import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import FriendsListItem from "./FriendsListItem";
import { setFriends } from "../../../features/friends/friendsSlice";
import { useSelector, useDispatch } from "react-redux";

const MainContainer = styled("div")({
  flexGrow: 1,
  width: "100%",
});

const FriendsList = () => {
  const { friends, onlineUsers } = useSelector((state) => state.friends);
  const frnd = JSON.parse(JSON.stringify(friends));
  // const [modifiedUsers, setModifiedUsers] = useState([])
  

  // useEffect(() => {
  //   const checkOnlineUsers = (friends = [], onlineUsers = []) => {
  //     friends.forEach((f) => {
  //       onlineUsers.forEach((user) => {
  //         if (user.userId === f.id) {
  //           let modifiedUser = { ...f };
  //           modifiedUser.isOnline = true;
  //           setModifiedUsers([...modifiedUsers, modifiedUser])
  //         }
  //       });
  //     });
  //   };
  //   checkOnlineUsers(friends, onlineUsers)
  // }, [friends]);

  // const checkOnlineUsers = (friends = [], onlineUsers = []) => {
  //   friends.forEach((f) => {
  //     const isUserOnline = onlineUsers.find((user) => user.userId === f.id);
  //     f.isOnline = isUserOnline ? true : false;
  //   });

  //   return friends;
  // };

  const checkOnlineUsers = (friends = [], onlineUsers = []) => {
    friends.forEach((f) => {
      const isUserOnline = onlineUsers.find((user) => user.userId === f.id);
      f.isOnline = isUserOnline ? true : false;
    });

    return friends;
  };

  return (
    <MainContainer>
      {checkOnlineUsers(frnd, onlineUsers).map((friends) => {
        return (
          <FriendsListItem
            username={friends.username}
            id={friends.id}
            key={friends.id}
            isOnline={friends.isOnline || false}
          />
        );
      })}
    </MainContainer>
  );
};

export default FriendsList;
