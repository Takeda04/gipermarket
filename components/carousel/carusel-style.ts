import styled from "styled-components";


const CategoryCaruselCard = styled.div`
  margin: 1rem 0;
  .slick-prev {
    left: -10px;
    z-index: 10;
    width: 32px;
    height: 32px;
    opacity: 0;
    border-radius: 50%;
    border: 2px solid #b1b1b1;
    background-color: #fff;
   
    transition: opacity .4s ease;
  }
  .slick-next {
    right: -10px;
    width: 32px;
    height: 32px;
    opacity: 0;
    border-radius: 50%;
    border: 2px solid #b1b1b1;
    background-color: #fff;
   
    transition: opacity .4s ease;
    &::before{
      content: "";
      width: 100%;
      height: 100%;
      background-color: red;
    }
  }
  &:hover{
    .slick-prev {
      opacity: 1;
    }
    .slick-next {
      opacity: 1;
    }
  }
 

  @media (max-width: 768px){
    margin: 1rem 0;
    h6{
      font-size: 14px;
    }
  }
  .slick-track{
    left: 0;
  }
 
`;




export {CategoryCaruselCard}