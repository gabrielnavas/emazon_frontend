import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  max-width: 100vw;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  width: 600px;
`

export const Title = styled.span`
  font-size: 45px;
  font-weight: 900;
  color: #232f3e;
  font-family: Arial;
  margin: 0 0 40px 0;
`

export const Description = styled.p`
  font-size: 20px;
  font-weight: 400;
  color: #6c7778;
  font-family: Arial;
  line-height: 1.5;

  span {
    cursor: pointer;
    color: ${props => props.theme.default.colors.blueAlt};
  }
`

export const ButtonInitSalesMan = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font: 700 16px/16px AEmb,Helvetica,Arial,sans-serif;
  padding: 16px 36px;
  font-size: 24px;
  color: #232f3e;
  background-color: #f90;
  border: 1px solid #f90;
  border-radius: 34px;
  box-shadow: 0 0 16px rgb(0 0 0 / 20%);
  width: 300px;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.default.colors.gold};
    border: 1px solid ${props => props.theme.default.colors.yellow};
  }
`
