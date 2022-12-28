import styled from 'styled-components';
import colors from 'config/theme';
import { Stack } from '@mui/material';
export const Logo = styled.div`
  max-width: 192px;
  max-height: 88px;
  cursor: pointer;
  display: flex;
  margin-right: 32px;
  span{
    max-width: 200px;
    max-height: 50px;
  }
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  @media (max-width:757px) {
    margin-right: 4px;
    max-width: 143px;
    span{
      max-width: 144px;
      max-height: 41px;
    }
    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: cover;
    }
  }
  @media (max-width:899px){
    display: none;
  }
`;
export const MobileStack = styled(Stack)`
  width: 100%;
  max-width:868px;
  @media (max-width:899px){
    flex-grow: 1;
    .MuiStack-root-fLuFxz{
      width: 100%;
    }
    // @media (max-width: 560px){
    //   .MuiStack-root-fLuFxz{
    //     width: 80%;
    //   }
    // }
    .MuiBox-root{
      width: 100%;
    }
  }

`
export const CatologButton = styled.div`
  
  button{
    animation-name: butonOpacity;
    animation-duration: 1s;
    z-index: 1;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    transition: all 0.3s ease-in-out;
    height: 50px;
    max-width: 178px;
    border: 1px solid #FEEE00;

    @keyframes butonOpacity {
      0%{
        background-color: #FEEE00;
      }
      50%{
        background-color: #feed004e;
      }
      100%{
        background-color: #FEEE00;
      }
    }
    &:hover{
      animation: none;
    }
    
  }
  
`
const headerStyle = {
  position: 'fixed',
  zIndex: '101',
  right: '0',
  left: '0',
  top: '0',
}
const specialProduct = {
  
  typograh:{
    mb:'8px',
    textAlign:'center',
    fontSize:'12px',
  },
  button:{
    color: colors.black, 
    bgcolor: colors.white ,
    ':hover':{bgcolor:colors.white}
  }

}

export { headerStyle ,specialProduct}