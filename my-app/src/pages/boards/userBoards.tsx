import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, styled } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import Board from './components/board';
import { RootState, useAppDispatch, useAppSelector } from 'store/store';
import { IBoardsState } from './../../store/boards/boards-slice';
import { createBoard, getBoardsByUserId } from 'store/boards/boards-thunks';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import theme from 'components/Theme';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  backgroundColor: theme.palette.secondary.main,
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.primary.main,
}));

const UserBoards = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>(' ');
  const boardsResp: IBoardsState = useAppSelector((state: RootState) => state.rootReducer.boardsReducer);
  const userId: string = useAppSelector((state: RootState) => state.rootReducer.authReducer.userId);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getBoardsByUserId(userId));
  }, [dispatch, userId, boardsResp.userBoard]);
  const handleClose = () => {
    setOpen((open) => !open);
    setInput(' ');
  };
  const addBoard = () => {
    dispatch(
      createBoard({
        title: input,
        owner: userId,
        users: ['string'],
      })
    );
    dispatch(getBoardsByUserId(userId));
    handleClose();
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        margin: '30px 0 0 30px',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link to="/user-boards">
          <Button
            sx={{
              color: theme.palette.primary.main,
              backgroundColor: theme.palette.secondary.dark,
              width: '200px',
              margin: '20px',
            }}
          >
            {t('boards.myBoards')}
          </Button>
        </Link>
        <Link to="/boards">
          <Button
            sx={{
              color: theme.palette.primary.main,
              backgroundColor: theme.palette.secondary.dark,
              width: '200px',
              margin: '20px',
            }}
          >
            {t('boards.allBoards')}
          </Button>
        </Link>
      </Box>
      <Grid container sx={{ flexGrow: 1, justifyContent: 'start' }} spacing={2} columns={{ xs: 4, sm: 3 }}>
        {boardsResp.userBoard
          ? boardsResp.userBoard.map((board, index) => <Board key={index} title={board.title} id={board._id} />)
          : []}
        <div>
          <Item
            sx={{
              width: '300px',
              height: '150px',
              display: 'flex',
              justifyContent: 'center',
              alignSelf: 'center',
            }}
            onClick={handleClose}
          >
            <Typography variant="h4" gutterBottom>
              + {t('boards.addBoard')}
            </Typography>
          </Item>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{t('boards.addBoard')}</DialogTitle>
            <DialogContent>
              <DialogContentText>{t('boards.name')}</DialogContentText>
              <TextField
                autoFocus
                id="name"
                type="text"
                fullWidth
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button sx={{ color: 'black' }} onClick={handleClose}>
                {t('boards.cancel')}
              </Button>
              <Button sx={{ color: 'black' }} onClick={addBoard}>
                {t('boards.add')}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Grid>
    </Box>
  );
};

export default UserBoards;
