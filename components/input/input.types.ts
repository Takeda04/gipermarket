import { FormControlProps } from '@mui/material/FormControl';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';
import { Control } from 'react-hook-form';

export type InputProps = Omit<
  FormControlProps,
  'component' | 'color' | 'children' | 'size' | 'variant'
> &
  OutlinedInputProps & {
    helperText?: string;
    control?: Control;
  };
