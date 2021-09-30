import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 2px solid #ddd;
  padding: 25px 0 15px 0;
  margin: 10px 0 30px 0;
  width: 85%;
`

export const ButtonNextPage = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 11px;
  margin: 0 3px 0 3px;
  background-color: ${({ isPrimaryPage, isLastPage }) => isPrimaryPage || isLastPage ? '#0000' : 'linear-gradient(to bottom,#f7f8fa,#e7e9ec)'};
  color: ${props => props.isPrimaryPage ? '#555' : '#222'};
  font-weight: 400;
  font-size: 14px;
  outline: none;
  border-radius: 3px;
  border: ${({ isPrimaryPage, isLastPage }) => isPrimaryPage || isLastPage ? '1px solid #0000' : '1px solid #aaa'};
  cursor: ${({ isPrimaryPage, isLastPage }) => isPrimaryPage || isLastPage ? 'default' : 'pointer'};

  & svg {
    color: ${props => props.isPrimaryPage || props.isPrimaryPage ? '#555' : '#222'};
    font-size: 18px;
    ${props => props.isRightButton ? 'margin-right: 7px;' : 'margin-left: 7px;'};
    
  }

  &:hover {
    ${props => props.isPrimaryPage ? 'none' : 'border: 1px solid #333;'};
  }
`

export const ButtonPageNumber = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 13px;
  margin: 0 1px 0 1px;
  background: 'linear-gradient(to bottom,#f7f8fa,#e7e9ec)';
  border-radius: 3px;
  outline: none;
  border: ${props => props.currectPage ? `1px solid ${props.theme.default.colors.gold}}` : '1px solid #777'};
  color: ${props => props.currectPage ? `${props.theme.default.colors.gold}` : '1px solid #6c6e73'};
  cursor: pointer;

  &:hover {
    border: 1px solid #333;
  }
`

export const Dots = styled.span`
  color: #333;
  margin: 0 10px 0 10px;
`

export const ButtonLimit = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 11px;
  margin: 0 3px 0 3px;
  background-color: #ffff;
  border: none;
  outline: none;
`
