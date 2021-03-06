import styled from 'styled-components'
import Image from 'next/image'

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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 470px;
  padding-left: 10px;
  margin-right: 30px;
  max-height: 600px;
  border: 1px solid #ddd;
`

export const Middle = styled.div`
  width: 640px;
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`

export const Label = styled.span`
  padding-left: 2px;
  padding-bottom: 2px;
  font-weight: 700;
  font-size: 14px;
  color: #111;
  line-height: 1;
`

export const Title = styled.span`
  padding-left: 2px;
  padding-bottom: 2px;
  margin-top: 5px;
  margin-right: 10px;
  font-weight: 600;
  font-size: 18px;
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

export const InputTextArea = styled.textarea`
  height: 31px;
  padding: 3px 7px;
  margin: 5px 0;
  min-width: 100%;
  max-width: 100%;
  min-height: 200px;
  max-height: 800px;
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

export const Dimensions = styled.div`
  display: flex;
  flex-direction: column;
`

export const InputNumber = styled.input`
  height: 31px;
  padding: 3px 7px;
  margin: 5px 20px 5px 0;
  width: 80px;
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

export const Bar = styled.div`
  width: 100%;
  border-top: 1px solid #ddd;
  margin-top: 5px;
  padding-top: 10px;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
`

export const PublishedAt = styled.input`
  height: 31px;
  padding: 3px 7px;
  margin: 5px 20px 5px 0;
  width: 150px;
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

export const ButtonSelectModal = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font: 800 15px/15px AEmb,Helvetica,Arial,sans-serif;
  padding: 10px 16px;
  font-size: 17px;
  color: #232f3e;
  background-color: ${props => props.theme.default.colors.gold};
  border: 1px solid ${props => props.theme.default.colors.yellow};
  border-radius: 24px;
  box-shadow: 0 0 16px rgb(0 0 0 / 20%);
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.default.colors.gold};
    border: 1px solid ${props => props.theme.default.colors.yellow};
  }
`

export const ButtonFinish = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font: 800 15px/15px AEmb,Helvetica,Arial,sans-serif;
  padding: 13px 70px;
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

export const Imgs = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
`

export const ButtonAddImg = styled.button`
  width: 183px;
  height: 268px;
  background: #ddda;
  cursor: pointer;
  border: 1px solid  #0000;

  & svg {
    font-size: 50px;
  }

  &:hover {
    color: ${props => props.theme.default.colors.gold};
    border: 1px solid  ${props => props.theme.default.colors.gold};
    background: #2221;
  }
`

export const ImageBookContainer = styled.li`
  border: 1px solid  #0000;
  cursor: pointer;
  
    &:hover {
      border: 1px solid  ${props => props.theme.default.colors.gold};
      background: #2221;
    }
    
`

export const ImageBook = styled(Image)``

export const Error = styled.span`
  display: flex;
  flex-direction: column;
  margin: 0 0 15px 0;
  color: ${props => props.theme.default.colors.textError};
`

export const DependenciesIDs = styled.div`
  margin: 20px 0;
`
