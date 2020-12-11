import React from 'react';
import styled from 'styled-components'
import logo from './Logo.jpg';

const Container = styled.header`
    background-color: #1b5f9e;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: lightgray;
    overflow: hidden;
`

const Title = styled.h2`
    color: white;
    position: absolute;
    top: 10px;
`

const Paragraph = styled.p`
    position: absolute;
    top: 45px;
`


function Header() {
  return (
    <Container>
          <img src={logo} alt="Logo" />
          <Title>Andrena-Privacy</Title>
          <Paragraph>Wie gut kannst du deine Kollegen einschätzen?</Paragraph>
    </Container>
  );
}

export default Header;
