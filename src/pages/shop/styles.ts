import styled from 'styled-components'

export const Container = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  max-width: 100vw;
`

export const BookList = styled.ul`
  display: flex;
  width: 86%;
  flex-wrap: wrap;
`

export const MessageDontHaveBooks = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: #444;
  font-weight: 700;
  font-size: 30px;
  padding: 50px;
`
