import React, { useState, useContext } from "react";
import styled from "styled-components";
import Typed from "react-typed";
import axios from 'axios';
import { ThemeContext, LoginContext } from "../state/context";
import banner from '../assests/banner.svg'
import { useIdentityContext } from "react-netlify-identity";
import { FaGithub, FaBitbucket } from 'react-icons/fa';
import Navbar from '../components/navbar';
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: white;
  @media(max-width:800px){
    flex-direction:column;

  }
  @media(max-height:450px){
      flex-direction:row;
      align-items:center;
  }
`;
const Hero = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background:url(${banner});
  background-repeat:no-repeat;
  background-size:100%;
  flex-direction: column;
  h1 {
    color: rgb(74, 74, 125);
    font-size: 3em;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    margin-bottom: 0;
    text-align: center;
    @media(max-width:800px){
        font-size:2.5em;
      }
  }
  p {
    margin-bottom: 5%;
    @media(max-height:450px){
        font-size:1em;
      }
  }
  @media(max-width:800px){
    width:100%;
  }
`;

const Details = styled.div`
  width: 50%;
  margin-left:10%;
  height:80%;
  display: flex;
  flex-direction:column;
  justify-content:center; 
  align-items:center;
  text-align:center;

  p {
    font-size:2.5rem;
    color:white;
  }
`;
const Button = styled.button`
margin-top:5%;
background: #091E42;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 30px;
border:none;
outline:none;
width:13rem;
height:3rem;
font-size:1.5rem;
color:white;
`;
const Sign = styled.div`
 width:80%;
 margin-top:3vh;
 height:30%;
 border-radius:10px;
 display:flex;
 flex-direction:column;
 justify-content:center;
 border: 2px solid rgb(30, 20, 93);
 align-items:center;
 h2{
     color:rgb(74, 74, 125);
     font-size:1.5em;
     @media(max-height:450px){
        font-size:1em
    }
 }
 @media(max-width:800px){
    height:25%;
}
@media(max-height:450px){
    height:25%;
}
`
const Socials = styled.div`
    display:flex;
    width:100%;
    margin-bottom:10%;
    justify-content:center;
    svg{
        font-size:2em;
       margin:0 3%;
       color: rgb(30, 20, 93);
`;

enum providers {
  Github = "github",
  Bitbucket = "bitbucket"
}
const Home = () => {
  const { settings, loginProvider, isLoggedIn, logoutUser, user } = useIdentityContext()
  const [show, setShow] = useState(false)
  const clicked = () => {
    setShow(true)
  }
  const loadingContext = useContext(LoginContext)
  const emailMessage = JSON.stringify({
    name: user && user.user_metadata.full_name,
    message: `Welcome to PrizeMi
    <p>We are pleased to have you as part of elite software developers who pride themselves in doing the job and getting the right pay for it.</p>
    <p>Get Started on PrizeMi</p>`
  })
  const authenticate = async (value: providers) => {
    await loginProvider(value)
    const isSignedUp = user && Buffer.from(user.role, 'base64').toString('utf8').split('_')[1]
    !isSignedUp && await axios.post('/.netlify/functions/send_mail', emailMessage)
  }



  return (
    <Container>
      <Hero>
        <Navbar/>
        <Details>
        <p>
        Feature Based Price Management For Developers
        </p>
        <Button>Get Started </Button>
        </Details>
        {show && <Sign>
          {!isLoggedIn &&
            <div>
              <h2>SIGN UP/LOGIN WITH </h2>
              <Socials>
                {settings && settings.external.github && <FaGithub onClick={() => authenticate(providers.Github)} />}
                {settings && settings.external.bitbucket && <FaBitbucket onClick={() => authenticate(providers.Bitbucket)} />}
              </Socials>
            </div>
          }
        </Sign>}
      </Hero>
      {/* <Icon>
        {isLoggedIn && user &&
          <div>
            <span>
              Hello {user.user_metadata.full_name.split(' ')[0]}</span>
            <button onClick={logoutUser}>Logout</button>
          </div>}
      </Icon> */}
    </Container>
  );
};

export default Home;
