import styled from 'styled-components'

export const ButtonSelectForm = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font: 800 15px/15px AEmb,Helvetica,Arial,sans-serif;
  padding: 5px 16px;
  font-size: 17px;
  color: #232f3e;
  background-color: ${props => props.theme.default.colors.gold};
  border: 1px solid ${props => props.theme.default.colors.yellow};
  border-radius: 24px;
  box-shadow: 0 0 16px rgb(0 0 0 / 20%);
  cursor: pointer;
  max-width: 200px;

  &:hover {
    background-color: ${props => props.theme.default.colors.gold};
    border: 1px solid ${props => props.theme.default.colors.yellow};
  }
`

export const Selected = styled.span`
  color: #f82e;
`

export const ModalContainer = styled.div`
  padding: 50px;
  min-width: 600px;
  min-height: 250px;
`

export const List = styled.ul`
  max-height: 400px;
  overflow: auto;
`

export const ItemList = styled.li`
  width: 90%;
  margin: 5px 0;
  padding: 5px 5px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;

  &:hover {
    border-bottom: 1px solid #f90;
  }
`

export const NonSelected = styled.span`
  color: #999;
  font-style: italic;
`

export const ButtonSearchModal = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font: 800 15px/15px AEmb,Helvetica,Arial,sans-serif;
  padding: 10px 40px;
  margin: 50px 0;
  font-size: 21px;
  color: #232f3e;
  background-color: #f90e;
  border: 1px solid #f90e;
  border-radius: 24px;
  box-shadow: 0 0 16px rgb(0 0 0 / 20%);
  cursor: pointer;


  &:hover {
    background-color: ${props => props.theme.default.colors.gold};
    border: 1px solid ${props => props.theme.default.colors.yellow};
  }
`
