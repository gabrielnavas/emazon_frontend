import styled from 'styled-components'

export const Container = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color:  ${({ theme }) => theme.default.colors.darkBlue};
  height: 60px;
  width: 100%;
`

export const ContainerLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

export const ContainerFill = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

export const ContainerRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

export const HeaderLink = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 56px;
  min-width: 75px;
  padding: 0 8px 0 8px;
  margin: 0 13px 0 13px;
  cursor: pointer;
  border: 1.2px solid #0000;

  &:hover {
    border: 1.2px solid white;
    border-radius: 5px;
  }
`

export const Logo = styled.span`
  color: white;
  font-weight: bold;
  font-size: 23px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI';
  border-bottom: 5px ridge ${props => props.theme.default.colors.gold};
`

export const InputSearch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 38px;
  width: 600px;
  border-radius: 5px;
  margin: 0 50px 0 50px;
`

export const FieldSearch = styled.input`
  height: 100%;
  width: 85%;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  border: 2px solid #0000;
 
  outline: none;
  font-size: 15px;
  font-family: inherit;
  padding: 7px 10px 10px 7px;

  &:focus {
    border: 2px solid ${({ theme }) => theme.default.colors.yellow};
    
  }
`

export const ButtonSearch = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  
  background: ${({ theme }) => theme.default.colors.yellow};
  outline: none;
  border: none;
  height: 100%;
  width: 15%;

  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;

  cursor: pointer;

  & svg {
    color: #131921;
    font-size: 20px;
  }

  &:hover {
    background: ${({ theme }) => theme.default.colors.yellowAlt};
  }

`

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  font-family: inherit;
  color: white;
  font-weight: bold;
  > :nth-child(1) {
    font-weight: 300;
  }
`

export const Orders = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  font-family: inherit;
  text-align: left;
  color: white;
  font-weight: bold;
  > :nth-child(1) {
    font-weight: 300;
  }
`

export const Cart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & svg {
    color: white;
    font-size: 44px;
    position: absolute;
    top: -13px;
    left: -25px;
  }
  position: relative;
`

export const AmountBooks = styled.span`
  color: ${({ theme }) => theme.default.colors.yellowAlt};
  font-size: 16px;
  position: absolute;
  font-weight: bold;
  top: -21px;
  left: -8px;
`
