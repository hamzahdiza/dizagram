import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { getAllUsersApi } from "../utils/routesAPI";
import ContactComponent from "../components/ContactComponent";
import WelcomeComponent from "../components/WelcomeComponent";

const ChatPage = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem("dizagram-user")) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("dizagram-user")));
    }
  }, []);

  useEffect(() => {
    const dataContacts = async () => {
      try {
        if (currentUser) {
          // Perlu di edit
          const data = await axios.get(`${getAllUsersApi}/${currentUser._id}`);
          setContacts(data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    dataContacts();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <Container>
        <div className="container">
          <ContactComponent contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
          <WelcomeComponent currentUser={currentUser} />
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default ChatPage;
