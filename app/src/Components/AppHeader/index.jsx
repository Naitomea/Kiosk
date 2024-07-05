import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { 
  AppBar, 
  IconButton, 
  Stack, 
  Toolbar, 
  Typography, 
  useMediaQuery
} from "@mui/material";

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WarningIcon from '@mui/icons-material/Warning';

import { DarkModeContext } from "../DarkModeProvider";
import { TaxonomyContext } from "../TaxonomyProvider";
import { 
  createTaxonomyString, 
  getTaxonomyFromPathname, 
  isTaxonomyValid
} from "../../Utils";

export default function AppHeader({open, setOpen, showIcon}) {
  const wideScreen = useMediaQuery('(min-width:600px)');
  const {darkMode, setDarkMode} = useContext(DarkModeContext)

  const location = useLocation();
  const { taxonomy, nodes } = useContext(TaxonomyContext);

  const taxonomyRoute = getTaxonomyFromPathname(location.pathname);
  const title = createTaxonomyString(taxonomyRoute);

  const isValid = taxonomyRoute 
    && isTaxonomyValid(taxonomy, taxonomyRoute.topic, taxonomyRoute.subTopic);
  const taxonomyIds = isValid
    ? taxonomy[taxonomyRoute.topic][taxonomyRoute.subTopic]
    : [];
  const taxonomyNodes = taxonomyIds.map(id => nodes[id]);
  const emptyAnswers = taxonomyNodes.filter(d => d.answer === '').length;

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{justifyContent: 'space-between'}}>
        {/* Left */}
        <Stack flexDirection={'row'} alignItems={'center'}>
          {showIcon &&
            <IconButton
              color="inherit"
              onClick={() => setOpen(!open)}
              edge="start"
              sx={{mr: wideScreen && 2}}
            >
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
          }
          <Typography variant="h6" noWrap component="div">
            Kiosk{title && `: ${title}`}
          </Typography>
        </Stack>
        
        {/* Right */}
        <Stack flexDirection={'row'} alignItems={'center'}>
          {emptyAnswers > 0 && 
            <>
              <WarningIcon sx={{ mr: 1 }} />
              <Typography variant="h6" noWrap component="div">
                {emptyAnswers}
                {wideScreen && ` answer${emptyAnswers > 1 ? 's' : ''}`}
                {' left'}
              </Typography>
            </>
          }
          <IconButton
            color="inherit"
            onClick={() => setDarkMode(!darkMode)}
            edge="end"
            sx={{ml: wideScreen ? 2 : 1}}
          >
            {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}