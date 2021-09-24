import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  max-width: 100vw;
`

export const Section = styled.div`
  display: flex;
  margin-top: 100px;
`

export const Left = styled.div`
  width: 260px;
`

export const Middle = styled.div`
  width: 640px;
`

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  border: 1px #D5D9D9 solid;
  border-radius: 8px;
  padding: 14px 18px;
`

export const ImgBook = styled.div`
`

export const HeaderMiddle = styled.div`
`

export const HeaderTop = styled.div`
  display: flex;
  align-items: baseline;
`

export const Title = styled.div`
  font-size: 28px;
  line-height: 36px;
  font-weight: 400;
  color: #0F1111;
  font-family: inherit;
  font-family: Arial, Helvetica, sans-serif;
`

export const TypeCover = styled.div`
  margin-left: 12px;
  font-size: 24px;
  line-height: 36px;
  font-weight: 500;
  color: #565959;
  font-family: Arial, Helvetica, sans-serif;
`

export const PublishedAt = styled.div`
  margin-left: 12px;
  font-size: 21px;
  line-height: 36px;
  font-weight: 200;
  color: #565959;
  font-family: Arial, Helvetica, sans-serif;
`

export const Edition = styled.div`
  display: flex;
  font-size: 14px;
  line-height: 36px;
  font-weight: 200;
  color: #0F1111;
  font-family: Arial, Helvetica, sans-serif;
`

export const Language = styled.div`
`

export const Separator = styled.i`
  color: #ddd;
  margin: 0 5px 0 5px;

  `

export const Author = styled.div`
  & span:nth-child(1) {
    color: #007185;
  }
  & span:nth-child(2) {
    color: #565959;
  }
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
  margin-left: 20px;
  font-size: 14px;
  color: ${props => props.theme.default.colors.textBlue};
`

export const BarSeparate = styled.div`
  margin-top: 10px;
  border: 0.3px solid #ddd5;
  width: 90%;
`

export const Descrition = styled.div`
  margin-top: 20px;
  color: #333333;
`

export const PriceContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: right;

  & span {
    max-width: 30%;
    color: #0F1111;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
  }
`

export const Price = styled.div`
  display: flex;
  justify-content: right;
  align-items: top;
  color: #B12704;
  width: 70%;
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
`

export const PriceNoDiscount = styled.div`
  display: flex;
  width: 100%;
  justify-content: right;
  color: #565959;
  text-decoration: line-through;
  margin-top: 5px;
  font-size: 14px;
`

export const SavingContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: right;
  color: #565959;
  margin-top: 5px;
  font-size: 14px;
`

export const SavingAmount = styled.div`
`

export const SavingsPercentage = styled.div`
`

export const ButtonAddToCart = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 215px;
  height: 35px;
  background: #FFD814;
  border-color: #FCD200;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 20px;
`
