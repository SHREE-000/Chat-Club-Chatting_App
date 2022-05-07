import React, { useEffect } from "react";
import { styled } from "@mui/system";
import FriendsListItem from "./FriendsListItem";
import { getFriends, getPendingListFriends } from "../../../features/friends/friendsSlice";
import { useSelector, useDispatch } from "react-redux";


const MainContainer = styled("div")({
  flexGrow: 1,
  width: "100%",
});

const FriendsList = () => {
  const { friends, errorMessage, successMessage } = useSelector((state) => state.friends);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
    
  useEffect( ()=> {
    if (user) {
      dispatch(getFriends())
      dispatch(getPendingListFriends())
    }
  },[errorMessage, successMessage])

  const FRIENDS = [];

  if (friends) {
  friends.map((state) => {
    FRIENDS.push({
      id: state._id,
      username: state.username,
      isOnline: state.isOnline,
    })
  })
};

  return (
    <MainContainer>
      {FRIENDS.map((friends) => {
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
