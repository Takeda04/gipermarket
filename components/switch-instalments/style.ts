import styled from "styled-components";
import passport1 from "assets/passport1.svg";
import passport2 from "assets/passport2.svg";
import passport3 from "assets/passport3.svg";




const Upload1 = styled.div`
  height: 132px;
  min-width: 213px;
  max-width: 213px;
  flex-grow: 1;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-image: url(${passport2.src});

`
const Upload2 = styled.div`
  height: 132px;
  min-width: 213px;
  max-width: 213px;
  flex-grow: 1;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-image: url(${passport1.src});

`
const Upload3 = styled.div`
  height: 132px;
  min-width: 213px;
  max-width: 213px;
  flex-grow: 1;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-image: url(${passport3.src});

`


export { Upload1, Upload3, Upload2 }