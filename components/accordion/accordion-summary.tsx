import React from 'react';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import ArrowDow from 'components/icons/arrow-down';

const AccordionSummary: React.FC<AccordionSummaryProps> = (props) => (
  <MuiAccordionSummary expandIcon={<ArrowDow />} {...props} />
);

export default AccordionSummary;
