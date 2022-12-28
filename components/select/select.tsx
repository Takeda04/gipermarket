import React from 'react';
import FormControl from '@mui/material/FormControl';
import { InputLabel } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import { SelectProps } from './select.types';
import Input from '../input';
import {
  StyledSelect,
  StyledMenuItem,
  StyledLabel,
  StyledHelperText,
} from './select.styles';
import ArrowDow from 'components/icons/arrow-down';

const Select = ({
  label,
  helperText,
  sx,
  fullWidth,
  ...props
}: SelectProps) => (
  <FormControl error={props.error} fullWidth={fullWidth} sx={sx}>
    {label && <StyledLabel id="Some-id">{label}</StyledLabel>}

    <StyledSelect
      MenuProps={{
        PaperProps: {
          elevation: 2,
        },
      }}
      labelId="Some-id"
      IconComponent={ArrowDow}
      {...props}
    >
      {props.children}
    </StyledSelect>
    {helperText && <StyledHelperText>{helperText}</StyledHelperText>}
  </FormControl>
);

Select.Item = StyledMenuItem;

export default Select;
