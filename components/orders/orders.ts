import styled from "styled-components";
import colors from "config/theme";

export const OrderTitle = styled.h2`
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  padding-left: 80px;
  margin-top: 0;
  margin-bottom: 24px;
`

export const OrderCardStyle = styled.div`
  padding: 32px 64px 20px 31px;
  border: 1px solid ${colors.grey.darc};
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  @media (max-width:900px){
    flex-direction: column;
    gap: 20px;
  }
  @media (max-width:539px){
    padding: 20px

  }

`
export const OredButtonBlock = styled.div`
  @media (max-width:900px){
    position: relative;
    button{
      position: absolute;
      right: 0;
      top: -54px;
    }
  }

`

export const OrderBlock = styled.div`
  display: flex;
`
// img block

export const OrderImgBlock = styled.div`
  padding-right: 19px;

`
export const OrderImg = styled.img`
  max-width: 100px;
  height: 100px;
  margin-bottom: 20px;
`
export const OrderImgTexts = styled.div`
 /* margin-left: 25px; */
  
`
