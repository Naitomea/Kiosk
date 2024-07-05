import { useContext, useState } from "react";
import { Box, Stack, TextField, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { enqueueSnackbar } from 'notistack';

import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

import { TaxonomyContext } from "../../TaxonomyProvider";
import { createTaxonomyString } from "../../../Utils";

export default function QuestionElement({data}) {
  const originalAnswer = data.answer;
  const [answer, setAnswer] = useState(originalAnswer);
  const { setNodes } = useContext(TaxonomyContext);

  const [updating, setUpdating] = useState(false);
  const [clearing, setClearing] = useState(false);
  
  const url = `http://localhost:8080/api/nodes/${data._id}`;

  const updateNode = (node) => {
    setNodes(nodes => ({
      ...nodes,
      [node._id]: node
    }))
  };

  const handleClear = () => {
    setClearing(true);

    fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }
  )
    .then(res => res.json())
    .then(json => {
      updateNode(json);
      setAnswer('');
      setClearing(false);
      enqueueSnackbar(
        `Answer in ${createTaxonomyString(data)} has been cleared!`,
        { variant: 'success' }
      );
    })
    .catch(() => {
      setClearing(false);
      enqueueSnackbar(
        `An error occured while clearing answer in ${createTaxonomyString(data)}`,
        { variant: 'error' }
      );
    });
  };

  const handleSave = () => {
    setUpdating(true);

    fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer }),
      }
    )
      .then(res => res.json())
      .then(json => {
        updateNode(json);
        setUpdating(false);
        enqueueSnackbar(
          `Answer in ${createTaxonomyString(data)} has been updated!`, 
          { variant: 'success' }
        );
      })
      .catch(() => {
        setUpdating(false);
        enqueueSnackbar(
          `An error occured while updating answer in ${createTaxonomyString(data)}`,
          { variant: 'error' }
        );
      })
  };

  return (
    <Box 
      component={'form'} 
      sx={{my: 4}}
      autoComplete={'off'}
      noValidate
    >
      <Typography variant={'subtitle1'}>
        {data.label}
      </Typography>
      <TextField
        id="outlined-textarea"
        placeholder="Please, write you answer here..."
        fullWidth
        multiline
        minRows={5}
        maxRows={10}
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        disabled={updating || clearing}
      />

      {/* Buttons */}
      <Stack direction={'row'} justifyContent={'end'} sx={{mr: 1}}>
        <LoadingButton
          variant={'contained'} 
          color={'error'} 
          sx={{mt: 1, mr: 1}} 
          onClick={handleClear}
          startIcon={<DeleteIcon />}
          loadingPosition="start"
          loading={clearing}
          disabled={originalAnswer === ''}
        >
          Clear
        </LoadingButton >
        <LoadingButton  
          variant={'contained'} 
          color={'success'} 
          sx={{mt: 1}}
          onClick={handleSave}
          endIcon={<SendIcon />}
          loadingPosition="end"
          loading={updating}
          disabled={originalAnswer === answer}
        >
          Save
        </LoadingButton >
      </Stack>
    </Box>
  );
}