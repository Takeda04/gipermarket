import { IconButton } from '@mui/material';
import colors from 'config/theme';
import styled, { css } from 'styled-components';

const imageCss = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CategoryCardWrapper = styled.div`
  background-color: ${colors.grey.light};
  display: flex;
  align-items: center;
  padding: 14px 16px;
  gap: 1rem;
  cursor: pointer;
  &:hover{
    h6{
      color: ${colors.primary.hover};
    }
  }
  @media(max-width: 768px){
    width: 321px;
    padding: 4px;
  }
  @media(max-width: 682px){
    width: 100%;
    padding: 4px;
  }

`;

export const CategoryCardImageWrapper = styled.div`
  width: 96px;
  height: 96px;
  @media(max-width: 768px){
    width: 56px;
    height: 56px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const ProductCardWrapper = styled.div<{ loading?: string }>`
  position: relative;
  transition: box-shadow .6s ease;
  padding: 20px;
  margin: 10px 0;
  cursor: pointer;
  @media(max-width: 561px){
    width: 90%;
    height: 100%;
    padding: 0;
  }
  .instalment{
    position:absolute;
    bottom:72px;
    font-weight:600;
    font-size:16px;
    border: 4px solid ${colors.primary.default};
    width: 80%;
    text-align: center;
    border-radius: 12px;
    @media(max-width: 561px){
      position: relative;
      width: 80%;
      height: 15%;
       top: 1%;
      padding: 0;
    }
  }


  width: ${({ loading }) => !!loading ? "224px" : "unset"};
  &:hover{
    border-radius: 8px;
    color: ${colors.primary.hover};
    box-shadow: 0px -3px 8px rgba(0, 0, 0, 0.18);
    .instalment{
      color: ${colors.black};
    }
  }
  .hHuXPW{
    color: #000;
    cursor: auto;
  }
  
`;

export const ProductCardLabel = styled.div<{ isNew: boolean }>`
  position: absolute;
  top: 6px;
  left: 6px;
  padding: 6px;
  background-color: ${({ isNew }) =>
    isNew ? colors.green.default : '#f92222'};
  z-index: 2;
`;

export const ProductHeartWrapper = styled.button<{ isSaved: boolean }>`
  position: absolute;
  top: 12px;
  width: 32px;
  height: 32px;
  right: 18px;
  display: flex;
  place-items: center;
  background-color: ${({ isSaved }) =>
    isSaved ? colors.red.default : colors.white};
  color: ${({ isSaved }) => (isSaved ? colors.white : colors.grey.default)};
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 50%;
`;

export const ProductCardImageWrapper = styled.div`
  width: 100%;
  max-height: 235px;
  height: 165px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const HorizontalCardWrapper = styled.div`
  padding: 8px 4px;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  position: relative;
  max-height: 157px;
  cursor: pointer;
  :hover{
    a{
      color: ${colors.primary.hover};
    }
  }
`;

export const HorizontalCardImageWrapper = styled.div`
  width: 140px;
  height: 140px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
export const StyleInstalments = styled.p`
  font-weight:600;
  font-size:16px;
  border: 4px solid ${colors.primary.default};
  width: 80%;
  text-align: center;
  border-radius: 12px;
`

export const StyleInstalmentsNot = styled.p`
  font-weight:600;
  font-size:16px;
  position: absolute;
  bottom: 72px;
  width: 80%;
  border: 4px solid ${colors.grey.controller};
  text-align: center;
  text-decoration: line-through;
  border-radius: 12px;

`
export const StyleInstalmentsNotColmn = styled.p`
  font-weight:600;
  font-size:16px;
  width: 80%;
  border: 4px solid ${colors.grey.controller};
  text-align: center;
  border-radius: 12px;
  text-decoration: line-through;

`