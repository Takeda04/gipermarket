import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';
import Box from '@mui/material/Box';

const StyledProgress = styled(CircularProgress)`
  color: ${({ theme }) => theme.palette.text.primary};
`;

interface Props {
  width?: number | string;
  height?: number | string;
  loading?: boolean;
  loaderSize?: number | string;
  className?: string;
}

const Spinner: React.FC<Props> = (props) => (
  <>
    {props.loading ? (
      <Box
        width={props.width}
        height={props.height}
        display="flex"
        justifyContent="center"
        alignItems="center"
        className={props.className}
      >
        <StyledProgress className="spinner-progress" size={props.loaderSize} />
      </Box>
    ) : (
      props.children
    )}
  </>
);

Spinner.defaultProps = {
  width: '100%',
  height: '60vh',
  loading: false,
  loaderSize: 30,
};

export default Spinner;
