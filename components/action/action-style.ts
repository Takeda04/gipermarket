import styled from "styled-components";
const ActionWrapper = styled.div`
  margin: 32px  0;
  overflow: hidden;
  img {
    width: 100%;
    min-height: 100%;
    object-fit: contain;
  }
  .slick-list{
      margin-left: -20px;
      margin-right: -20px;
    }
    .slick-track{
      display: flex;
      gap: 20px;
    }
`;
const StyleImgBlock = styled.div`
  max-height: 240px;
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
export { ActionWrapper, StyleImgBlock }