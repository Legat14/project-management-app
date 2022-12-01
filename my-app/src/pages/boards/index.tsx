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
import { createBoard, getBoards, getBoardsByUserId } from 'store/boards/boards-thunks';
import { useTranslation } from 'react-i18next';
import theme from 'components/Theme';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  backgroundColor: theme.palette.secondary.main,
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.primary.main,
}));

const Boards = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>(' ');
  const boardsResp: IBoardsState = useAppSelector((state: RootState) => state.rootReducer.boardsReducer);
  const userId: string = useAppSelector((state: RootState) => state.rootReducer.authReducer.userId);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getBoards());
    dispatch(getBoardsByUserId(userId));
  }, [dispatch, userId]);
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
    handleClose();
  };

  const allBoardsIsGetting = useAppSelector((state: RootState) => state.rootReducer.boardsReducer.boardsLoading);
  const oneBoardIsCreating = useAppSelector((state: RootState) => state.rootReducer.boardsReducer.createBoardLoading);
  const oneBoardIsDeleting = useAppSelector((state: RootState) => state.rootReducer.boardsReducer.deleteBoardLoading);
  const isLoading = allBoardsIsGetting || oneBoardIsCreating || oneBoardIsDeleting;

  const renderBoards = (): JSX.Element => {
    if (isLoading) {
      return (
        <Grid container className="board__loading">
          <CircularProgress color="primary" />
          <Typography className="board__loading-title" variant="h4">
            {t('loading')}
          </Typography>
        </Grid>
      );
    } else {
      return (
        <>
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
          <Grid container sx={{ flexGrow: 1, justifyContent: 'center' }} spacing={2} columns={{ xs: 4, sm: 3 }}>
            {boardsResp.boards
              ? boardsResp.boards.map(
                  (board, index): JSX.Element => <Board key={index} title={board.title} id={board._id} />
                )
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
        </>
      );
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        width: '100%',
        margin: '2%',
      }}
    >
      {renderBoards()}
    </Box>
  );
};

export default Boards;
