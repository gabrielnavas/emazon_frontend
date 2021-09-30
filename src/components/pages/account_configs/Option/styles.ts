import styled from 'styled-components'

export const Container = styled.li`
  display: flex;
  border-radius: 8px;
  width: 340px;
  height: 95px;
  padding: 14px 0 14px 0;
  margin-top: 15px;
  font-family: inherit;
  border: 1px #D5D9D9 solid;
  cursor: pointer;
  
  &:hover {
    background-color: #e8e8e8;
  }
`

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  & svg {
    font-size: 38px ;
    color: ${props => props.theme.default.colors.blueLight};
  }
`

export const Infos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 75%;
`

export const Title = styled.div`
  color: #111;
  font-size: 17px;
  font-weight: 500;
`

export const Description = styled.div`
  color: #565959;
  font-size: 14px;
  font-weight: 500;
  flex-wrap: wrap
`
