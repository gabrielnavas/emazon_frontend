import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  min-height: 100vh;
  max-width: 100vw;
`

export const Card = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  padding: 30px 40px;
  color: #111;
  max-width: 510px;
  margin-top: 0px;
`

export const Title = styled.span`
  font-weight: 400;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 28px;
  line-height: 1.3;
  margin-bottom: 18px;
  width: 100%;
  margin: 26px 0 35px 0;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

export const FormGroup = styled.div`
  margin-bottom: 15px;
  width: 100%;
`

export const Label = styled.div`
  padding-left: 2px;
  padding-bottom: 2px;
  font-weight: 700;
  font-size: 13px;
  color: #111;
  line-height: 1;
`

export const InputText = styled.input`
  height: 31px;
  padding: 3px 7px;
  margin: 5px 0;
  width: 100%;
  border: 1px solid ${props => props.isError
      ? props.theme.default.colors.textError
      : '#a6a6a6'
    };
  border-radius: 6px;
  outline: none;

  &:focus {
    border: 1px solid ${props => props.isError
      ? props.theme.default.colors.textError
      : props => props.theme.default.colors.yellowAlt
    };
    -webkit-box-shadow: 0px 0px 4px 0.5px ${props => props.isError
      ? props.theme.default.colors.textError
      : props => props.theme.default.colors.yellowAlt
    };
    -moz-box-shadow: 0px 0px 4px 0.5px ${props => props.isError
      ? props.theme.default.colors.textError
      : props => props.theme.default.colors.yellowAlt
    };
    box-shadow: 0px 0px 4px 0.5px ${props => props.isError
      ? props.theme.default.colors.textError
      : props => props.theme.default.colors.yellowAlt
    };
  }
`

export const GlobalErrors = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 8px 0; 
`

export const FormInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 11px;
  width: 100%;
  line-height: 1.1;
  color: ${props => props.isError
      ? props.theme.default.colors.textError
      : '#2b2b2b'
  };

  & svg {
    color: ${props => props.isError
      ? props.theme.default.colors.textError
      : props.theme.default.colors.blueAlt
    };
    font-size: 18px;
  }
`

export const ButtonFinish = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: linear-gradient(to bottom,#f7dfa5,#f0c14b);
  border-color: #a88734 #9c7e31 #846a29;
  border-style: solid;
  border-width: 1px;
  color: #111;
  font-size: 13px;
  border-radius: 3px;
  height: 29px;
  margin-bottom: 20px;
  cursor: pointer;
  `

export const LegalText = styled.div`
  width: 100%;
  color: #111;
  font-size: 12px;
  margin-bottom: 20px;
  margin-left: 5px;
  
  & span {
    color: ${props => props.theme.default.colors.blueAlt};
    text-decoration: none;
  }
`

export const BarSeparatePage = styled.div`
  width: 85%;
  height: 5px;
  margin: 40px 0 10px 0;
  background: linear-gradient(to bottom,rgba(0,0,0,.14),rgba(0,0,0,.03) 3px,transparent);
  color: #111;
`

export const FooterPage = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export const FooterOptions = styled.nav`
  display: flex;
`

export const OptionLink = styled.div`
  color: ${props => props.theme.default.colors.blueAlt};
  text-decoration: none;
  font-size: 12px;
  margin: 20px;
`

export const Signature = styled.div`
  color: #555;
  font-size: 11px;
  font-family: inherit;
`

export const CpfOrCnpjInput = styled.input`
  height: 100%;
  padding: 3px 7px;
  width: 100%;
  border: none;
  outline: none;
  border-bottom-right-radius: 6px;
  border-top-right-radius: 6px;

  &:focus {
    border: 1px solid ${props => props.isError
      ? props.theme.default.colors.textError
      : props => props.theme.default.colors.yellowAlt
    };
    -webkit-box-shadow: 0px 0px 4px 0.5px ${props => props.isError
      ? props.theme.default.colors.textError
      : props => props.theme.default.colors.yellowAlt
    };
    -moz-box-shadow: 0px 0px 4px 0.5px ${props => props.isError
      ? props.theme.default.colors.textError
      : props => props.theme.default.colors.yellowAlt
    };
    box-shadow: 0px 0px 4px 0.5px ${props => props.isError
      ? props.theme.default.colors.textError
      : props => props.theme.default.colors.yellowAlt
    };
  }
`

export const CpfOrCnpj = styled.div`
  display: flex;

  height: 31px;
  padding: 0 0 0 7px 0;
  width: 100%;
  border: 1px solid ${props => props.isError
      ? props.theme.default.colors.textError
      : '#a6a6a6'
    };
  border-radius: 6px;
  outline: none;

  & select {
    border: none;
    background-color: #0000;
    outline: none;
  }
`
