import styled from 'styled-components'

export const Container = styled.div`
  width: 268px; 
  margin: 5px 5px 10px 5px;

`

export const BorderTop = styled.div`
  border-top: 0.5px solid #ddd;
  height: 20px;
  width: 85%;
`

export const ImgBook = styled.div`
`

export const Title = styled.div`
  color: ${props => props.theme.default.colors.textBlack};
  margin: 5px 0 5px 0;
  font-family: inherit;
  font-size: 14px;
  font-weight: 400;
`

export const Edition = styled.div`
`

export const Language = styled.div`
  color: ${props => props.theme.default.colors.textGray};
  font-family: inherit;
  font-size: 14px;
`

export const Author = styled.div`
  color: ${props => props.theme.default.colors.textGray};
  font-family: inherit;
  font-size: 14px;
`

export const Feedback = styled.div`
  display: flex;
  justify-content: left;
  margin: 5px 0 10px 0;
`

export const Stars = styled.div`
  & svg {
    color: ${props => props.theme.default.colors.gold};
  }
`

export const CommentAmount = styled.div`
  margin-left: 5px;
  font-size: 14px;
  color: ${props => props.theme.default.colors.textBlue};
`

export const TypeCover = styled.div`
  color: ${props => props.theme.default.colors.blue};
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;

`
export const PriceInfo = styled.div`
  display: flex;
  margin: 4px 0 0 0;
`

export const PriceDiscount = styled.div`
  display: flex;
`

export const PriceSymbol = styled.div`
  font-size: 12px;
  color: ${props => props.theme.default.colors.textBlack};
  font-family: inherit;
`

export const PriceWhole = styled.div`
  font-size: 21px;
  color: ${props => props.theme.default.colors.textBlack};
  font-family: inherit;
`

export const PriceFraction = styled.div`
  font-size: 12px;
  color: ${props => props.theme.default.colors.textBlack};
  font-family: inherit;
`

export const PriceOldValue = styled.div`
  margin-left: 5px;
  font-size: 12px;
  color: ${props => props.theme.default.colors.textGray};
  text-decoration: line-through;
  font-family: inherit;
`
