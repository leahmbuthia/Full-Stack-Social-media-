import React, { useState, useEffect } from "react";
import NavIcon from "../shared/NavIcon";
import SearchIcon from "../../assets/search-circle.png";
import "./GroupHeader.scss";
import { useCreateGroupControllerMutation } from "../../features/groups/groupsApi";
import { SuccessToast, ToasterContainer } from "../../Toaster";


const GroupHeader = ({ setLatestGroups }) => {
  const [showModal, setShowModal] = useState(false);
  const [GroupName, setGroupName] = useState("");
  const [Description, setGroupDescription] = useState("");
  const [PhotoURL, setPhotoURL] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [createGroupController] = useCreateGroupControllerMutation();

  useEffect(() => {
    // Check local storage to determine if the user has already clicked on the join button for this group
    const isAlreadyJoined = localStorage.getItem(`joined_${GroupName}`);
    if (isAlreadyJoined) {
      // Show an error message or take appropriate action
      ErrorToast("You are already a member of the group");
      closeModal();
    }
  }, [GroupName]);
  


  const handleCreateGroup = async (event) => {
    event.preventDefault();

    if (GroupName.trim() !== "") {
      const groupData = {
        GroupName: GroupName,
        Description: Description,
        PhotoURL: PhotoURL,
      };

      // console.log("Client-Side Group Data:", groupData);

      try {
        await createGroupController(groupData);
        setSuccessMessage('Group created successfully');

        // Set a local storage flag indicating that the user has joined this group
        localStorage.setItem(`joined_${GroupName}`, true);

        setLatestGroups((prevGroups) => [...prevGroups, groupData]);
        closeModal(); // Close the modal after successful creation
      } catch (error) {
        console.error("Error creating group", error);
      }
    } else {
      console.log("No group name found");
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setGroupName("");
    setGroupDescription("");
    setPhotoURL("");
    SuccessToast("Group added successfully");
  };


  return (
    <div className="group-page-header">
      <div className="group-page-title">
      <ToasterContainer />
        <h2>Groups</h2>
      </div>
      <div className="group-page-icon">
        <div className="circled-search-icon">
          <NavIcon url={SearchIcon} />
        </div>
        <div className="create-group-btn">
          <button onClick={openModal}>Create New Group</button>
        </div>
      </div>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="editpost-text">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <h3>Create New Group</h3>
            </div>
            <form onSubmit={handleCreateGroup}>
              <div>
                <label htmlFor="GroupName">GroupName:</label>
                <input
                  type="text"
                  id="GroupName"
                  name="GroupName"
                  value={GroupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="PhotoURL">PhotoURL:</label>
                <input
                  type="text"
                  id="PhotoURL"
                  name="PhotoURL"
                  value={PhotoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  required
                />
              </div>
              {PhotoURL && (
                <div>
                  <img
                    src={PhotoURL}
                    alt="Group Photo"
                    style={{ maxWidth: "100%" }}
                  />
                </div>
              )}
              <div className="des">
                <label htmlFor="Description">Description:</label>
                <textarea
                  id="Description"
                  value={Description}
                  onChange={(e) => setGroupDescription(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Create</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupHeader;
