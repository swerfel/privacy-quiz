import React from 'react';
import styled from 'styled-components'

const Container = styled.header`
    background-color: #282c34;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: lightgray
`

const Title = styled.h2`
    color: white;
    font-size: calc(10px + 2vmin);
`


function Header() {
  return (
    <Container>
          <Title>Andrena-Privacy</Title>
          <p>Wie gut kannst du deine Kollegen einschätzen?</p>
    </Container>
  );
}

export default Header;
