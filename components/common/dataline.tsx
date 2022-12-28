import { Stack, Typography } from '@mui/material';
import colors from 'config/theme';
import React from 'react';

const DataLine: React.FC<{ field?: string; value?: string }> = ({ field, value }) => {
  return (
    <Stack spacing={2} direction="row">
      <Typography variant="body1" color={colors.grey.default}>
        {field}:
      </Typography>
      <Typography variant="body1">{value}</Typography>
    </Stack>
  );
};

export default DataLine;
