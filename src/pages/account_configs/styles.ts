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
  max-width: 740px;
  height: 100%;
  margin-top: 30px;
`

export const Options = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
`

export const Title = styled.div`
  font-weight: 400;
  font-size: 28px;
  margin-left: 60px;
`
