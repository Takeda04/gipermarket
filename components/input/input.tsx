import React from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { StyledInput, StyledLabel, ToggleIcon } from './input.styles';
import { InputProps } from './input.types';

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error,
      label,
      helperText,
      required,
      fullWidth,
      id = 'Id',
      sx,
      endAdornment,
      name,
      type,
      ...otherProps
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleToggleType = React.useCallback(() => {
      setShowPassword((prev) => !prev);
    }, []);

     const derivedType = React.useMemo(() => {
       if (type === 'password') {
         return showPassword ? 'text' : 'password';
       }
       return type;
       
     }, [type, showPassword]);

    return (
      <FormControl
        error={error}
        variant="standard"
        fullWidth={fullWidth}
        required={required}
        sx={sx}
      >
        {label && (
          <StyledLabel htmlFor={id} shrink>
            {label}
          </StyledLabel>
        )}

        <StyledInput
          id={id}
          ref={ref}
          name={name}
          type={derivedType}
          {...otherProps}
          endAdornment={
            type === 'password' ? (
              <ToggleIcon
                showPassword={showPassword}
                onClick={handleToggleType}
              />
            ) : (
              endAdornment
            )
          }
        />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }
);

export default Input;
