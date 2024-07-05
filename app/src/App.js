import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';

import { DarkModeProvider } from './Components/DarkModeProvider';
import { TaxonomyProvider } from './Components/TaxonomyProvider';
import AppDrawer from './Components/AppDrawer'
import DataUpdater from './Components/DataUpdater';

const App = () => {

  return (
    <BrowserRouter>
      <DarkModeProvider>
        <TaxonomyProvider>
          <CssBaseline />
          <AppDrawer />
          <DataUpdater />
          <SnackbarProvider autoHideDuration={3000} />
        </TaxonomyProvider>
      </DarkModeProvider>
    </BrowserRouter>
  );
};

export default App;
