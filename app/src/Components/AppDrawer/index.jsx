import { useState } from 'react';
import {
  Drawer, 
  Toolbar, 
  Box,
  Stack,
  useMediaQuery,
} from '@mui/material';

import AppHeader from '../AppHeader';
import AppMain from '../AppMain';
import TaxonomyTree from '../TaxonomyTree';

const drawerWidth = 240;

export default function AppDrawer() {
  const wideScreen = useMediaQuery('(min-width:800px)');
  const [open, setOpen] = useState(false);
  
  return (
    <Box sx={{ display: 'flex' }}>
      <AppHeader open={open} setOpen={setOpen} showIcon={!wideScreen} />
      <Drawer
        variant={wideScreen ? 'permanent' : 'temporary'}
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
        onClose={() => setOpen(false)}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <TaxonomyTree />
        </Box>
      </Drawer>
      <Stack 
        component="main" 
        alignItems={'center'}
        sx={{ 
          flexGrow: 1, 
          px: 2, 
          overflowX: 'hidden',
        }}
      >
        <Toolbar />
        <AppMain />
      </Stack>
    </Box>
  );
}
