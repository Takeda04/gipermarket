import styled from "styled-components";
import { AccordionDetails } from "@mui/material";
import colors from "config/theme";

export const FilterBlock = styled.div`
  display: grid;
  grid-template-columns: 3fr 9fr;
  @media (max-width:1132px){
    display: flex; 
    flex-direction: column-reverse;
  }

`

export const CustomAccordionDetail = styled(AccordionDetails)`
  max-height: 500px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 7px;
  }

  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${colors.primary.default}; 
    border-radius: 10px;
  }

`