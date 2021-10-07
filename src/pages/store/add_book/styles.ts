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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 260px;
  margin-right: 80px;
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
  flex-direction: row;
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

export const ModalContainer = styled.div`
  padding: 50px;
  min-width: 600px;
  min-height: 250px;
`

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

export const Selected = styled.span`
  color: #f82e;
`

export const NonSelected = styled.span`
  color: #999;
  font-style: italic;
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
  flex-direction: column;
  width: 100%;
`

export const ButtonAddImg = styled.button`
  width: 200px;
  height: 150px;
  background: #ddda;
  border: 1px solid none;
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
