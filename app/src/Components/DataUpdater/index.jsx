import { useCallback, useContext, useEffect } from "react";
import { Backdrop, CircularProgress, Stack, Typography } from "@mui/material";
import { enqueueSnackbar } from 'notistack';

import { TaxonomyContext } from '../TaxonomyProvider';

export default function DataUpdater() {
  const { 
    setNodes, 
    setTaxonomy, 
    fetching, 
    setFetching 
  } = useContext(TaxonomyContext);
  
  const fetchTaxonomy = useCallback(() => {
    fetch('http://localhost:8080/api/taxonomy')
      .then(res => res.json())
      .then(data => {
        setTaxonomy(data);
        setFetching(false);
      })
      .catch(() => {
        setFetching(false);
        enqueueSnackbar(
          `An error occured while fetching taxonomy`,
          { variant: 'error' }
        );
      });
  }, [setFetching, setTaxonomy]);
  
  const fetchNodes = useCallback(() => {
    fetch('http://localhost:8080/api/nodes')
      .then(res => res.json())
      .then(data => {
        setNodes(
          data.reduce(
            (a, d) => a = { ...a, [d._id]: d },
            {}
          )
        );
        
        // /!\ Fetch after nodes
        fetchTaxonomy();
      })
      .catch(() => {
        setFetching(false);
        enqueueSnackbar(
          `An error occured while fetching nodes`,
          { variant: 'error' }
        );
      });
  }, [fetchTaxonomy, setFetching, setNodes]);

  useEffect(() => {
    setFetching(true);
    fetchNodes();
  }, [fetchNodes, setFetching]);

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 5 }}
      open={fetching}
    >
      <Stack alignItems={'center'}>
        <CircularProgress color="inherit" fontSize={'small'} />
        <Typography sx={{mt: 1}}>
          Fetching data...
        </Typography>
      </Stack>
    </Backdrop>
  )
}