import { Box, Drawer } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

interface SidebarProps {
  toggleDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  isOpen: boolean;
  width?: number
}
const StyleBox = styled(Box)`
  @media (max-width: 768px){
    width: 101vw;
  }
`

const Sidebar: React.FC<SidebarProps> = ({
  toggleDrawer,
  isOpen,
  children,
  width
}) => (
  <Drawer  anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
    <StyleBox >
      {children}
    </StyleBox>
  </Drawer>
);

export default Sidebar;
