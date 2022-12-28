import { SelectProps as MuiSelectProps } from '@mui/material/Select';
import { InputProps } from '../input';

export {};

export type SelectProps = Omit<MuiSelectProps, 'input'> &
  Pick<InputProps, 'helperText' | 'error'>;
