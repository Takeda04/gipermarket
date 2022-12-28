import { InputLabel, MenuItem, Select, styled } from '@mui/material';
import { css } from 'styled-components';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import colors from 'config/theme';

export const StyledSelect = styled(Select)`
  label + & {
    margin-top: ${(props) => props.theme.spacing(3)};
  }
  label & {
    font-size: 20px;
  }

  .MuiSelect-select {
    padding-left: 24px;
    padding-right: 24px;
    background-color: ${colors.white};
  }

  .MuiSelect-icon {
    margin-right: 12px;
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: #ecf1f4;
  }

  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-width: 1px;
  }
`;

export const StyledHelperText = styled(FormHelperText)`
  margin-left: 0;
`;

export const StyledMenuItem = styled(MenuItem)`
  padding-left: 24px;
`;

export const StyledLabel = styled(InputLabel)`
  color: ${(props) => props.theme.palette.text.primary};
  font-weight: 500;
  transform: translate(0, -1.5px) scale(0.75);
`;
