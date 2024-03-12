import React, { useState, useEffect } from "react";
import "./FriendsCard.scss";
import FriendIcon from "../../assets/friend-icon.png";
import Button from "../shared/Button";
import axios from "axios";
import { useAddFriendsMutation, useGetFriendsQuery } from "../../features/friends/friendsApi";
import { SuccessToast, ErrorToast, LoadingToast, ToasterContainer } from "../../Toaster";

const FriendsCard = () => {
  const [addFriends]=useAddFriendsMutation()
  const { data: friendships } = useGetFriendsQuery();
  const [users, setUsers] = useState([]);
  const [User1ID, setUser1ID] = useState('');

  useEffect(() => {
    // Fetch users and set User1ID from localStorage
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8100/api/v1/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const userData = await response.json();
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const userID = localStorage.getItem('UserID');
    setUser1ID(userID);

    fetchUsers();
  }, []);

  const handleAddFriend = async (userID) => {
    try {
      // Check if the user is already a friend
      const isAlreadyFriend = friendships.some(friendship => friendship.User2ID === userID);
      if (isAlreadyFriend) {
        ErrorToast("Already friends");
        return;
      }

      // Add user as a friend
      const newFriendship = {
        User1ID: User1ID,
        User2ID: userID
      };
      const res=await addFriends(newFriendship)
      SuccessToast("You are now friends");
    } catch (error) {
      console.error('Error adding friend:', error.message);
    }
  };

  return (
    <div className="friendsContainer">
      <ToasterContainer/>
      <div className=""></div>
      <div className="friends-menu">
        {users.map((user, index) => (
          <div className="friendsCard" key={index}>
            <div className="friend">
              <div className="friends-card-top">
                <div className="img-name">
                  <img src={user.image} alt={user.name} />
                  <div className="friends-name">
                    <p>{user.Username}</p>
                    <p>{user.TagName}</p>
                  </div>
                  <div className="actions">
                    <button
                      className="add"
                      onClick={() => handleAddFriend(user.UserID)}
                    >
                      Add Friend
                    </button>
                    <button className="rem">Remove</button>
                  </div>
                </div>
                <img src={FriendIcon} alt={user.name} />
              </div>
              <div className="btn">
                <Button msg="Message" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsCard;
