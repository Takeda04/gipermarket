import styled from "styled-components";
import arrow from 'assets/png/arrow.svg';
const Left = styled.div<{image:any}>`
  width: 24px;
  height: 24px;
  top: -30px;
  right: 0;
  position: absolute;
  
  .slick-next:before{
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    background-repeat: no-repeat;
    background-image: url(${(props) => props.image.src});
    background-size: 24px;
    background-position: center;
    
  }
  .slick-next{
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 100%;
    height: 100%;
  }
`

export const SampleNextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <Left style={{...style}} image={arrow} onClick={onClick} >
      <div  className={className} />
    </Left>
  );
}