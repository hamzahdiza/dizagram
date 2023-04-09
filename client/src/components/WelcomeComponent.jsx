import styled from "styled-components";
import Lolo from "../assets/lolo.gif";
import React, { useState, useEffect } from "react";

const WelcomeComponent = ({ currentUser }) => {
  return (
    <>
      <Container>
        <img src={Lolo} alt="Lolo" />
        <h1>
          <span> Welcome!</span>
        </h1>
        <h3>Please select a chat to Start messaging.</h3>
      </Container>
    </>
  );
};

export default WelcomeComponent;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
