import { Box } from '@mui/material';
import { Footer } from 'layouts/footer';
import { Header } from 'layouts/header';
import React from 'react';

const Main: React.FC <{pb?:number}> = ({ children,pb }) => {
  return (
    <>
      <Header />
      <Box sx={{paddingBottom: `${pb ?? "1rem"}`}} minHeight="70vh">{children}</Box>
      <Footer />
    </>
  );
};

export default Main;
