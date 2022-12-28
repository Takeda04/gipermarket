import React from 'react';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';

const Accordion: React.FC<AccordionProps> = (props) => (
  <MuiAccordion
    disableGutters
    elevation={0}
    sx={{
      boxShadow: 'none',
      ['&.Mui-expanded:before']: {
        opacity: 1,
      },
    }}
    {...props}
  />
);

export default Accordion;
