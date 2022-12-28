import styled from "styled-components";
import arrow from 'assets/png/arrow.svg';
const Right = styled.div<{ image: any }>`
  width: 24px;
  height: 24px;
  position: absolute;
  top: -30px;
  right: 40px;
  z-index: 5;
  background-repeat: no-repeat;
  .slick-prev:before{
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    background-repeat: no-repeat;
    background-image: url(${(props) => props.image.src});
    background-size: 24px;
    background-position: center;
    transform: rotate(180deg);
  }

  .slick-prev{
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 100%;
    height: 100%;
  }
`

export const SamplePrevArrow = (props: any) => {
  const { className, style, onClick } = props;
 
  return (
    <Right style={{ ...style }} image={arrow} onClick={onClick}>
      <div className={className} />
    </Right>

  );
}
