import React from 'react';
import dynamic from 'next/dynamic';
import { Tabs, Tab, Box, Typography } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
const EditorJs = dynamic(() => import('components/editor'), { ssr: false });


function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

interface TabProps {
  characteristicsRef?: any;
  charektr: any;
  des: any;
}


export const ProductDetailTab: React.FC<TabProps> = ({ characteristicsRef, charektr, des }) => {
  const [value, setValue] = React.useState(0);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  return (

    <Box pt='30px' ref={characteristicsRef} width='100%'>
      <Tabs value={value} onChange={handleChangeTab} aria-label="basic tabs example">
        <Tab label="Oписание" {...a11yProps(0)} />
        <Tab label="Характеристики" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Box sx={{ '.ce-block__content': { maxWidth: '100%' } }}>
          <EditorJs data={des ? JSON.parse(des) : {}} />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <EditorJs data={charektr ? JSON.parse(charektr) : {}} />
      </TabPanel>
    </Box>
  )
}
