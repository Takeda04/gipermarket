import colors from 'config/theme';
import styled from 'styled-components';

export const BrandWrapper = styled.div`
  background-color: ${colors.grey.brand};
  display: flex;
  padding: 0 10px;
  align-items: center;
  justify-content: center;
  border: 1px solid #e5e5e5;
  overflow: hidden;
  transition: all .4s ease;
  min-height: 80px;
  min-width: 162px;
  position: relative;
  &::before{
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    transition: all .4s ease;
    z-index: 100;
    background-color: #04040400;
    cursor: pointer;
  }
  
  img{
    object-fit: contain;
    min-width: 100%;
    min-height: auto;
    transition: all .4s ease;

  }
  &:hover{
    &::before{
      background-color: #0404044d;

    }
    img{
      transform: scale(1.2);

    }
  }
  @media (max-width:625px){
    min-width: 40%;
    
  }
`;
