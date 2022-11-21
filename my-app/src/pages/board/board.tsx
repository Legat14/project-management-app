import react, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import store, { RootState } from 'store/store';
import Column from './components/column';
import CreateColumnForm from './components/create-column-form';
import CreateTaskForm from './components/create-task-form';
import { deleteColumn, getColumnsInBoard, updateColumnById } from 'store/columns/columns-thunks';
import { getTasksByBoardId, createTask, deleteTask } from 'store/tasks/tasks-thunk';
import { Grid, Typography, Button } from '@mui/material';
import { Add as AddIcon, ArrowBackIos as ArrowBackIosIcon } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import Paper from '@mui/material/Paper';
import sortArr from './functions/sort-arr';

const Board = (): JSX.Element => {
  const dispatch = useDispatch<typeof store.dispatch>();

  async function getData() {
    const boardId = store.getState().rootReducer.boardsReducer.boardById._id;
    await dispatch(getColumnsInBoard(boardId));
    await dispatch(getTasksByBoardId(boardId));
  }

  useEffect(() => {
    getData();
  }, []);

  const userId = useSelector((state: RootState) => state.rootReducer.authReducer.userId);
  const currentBoard = useSelector((state: RootState) => state.rootReducer.boardsReducer.boardById);
  const currentBoardColumns = useSelector((state: RootState) => state.rootReducer.columnsReducer.columns);
  const currentBoardColumnsCount = currentBoardColumns.length;
  const currentBoardColumnsSorted = sortArr(currentBoardColumns);
  const currentBoardTasks = useSelector((state: RootState) => state.rootReducer.tasksReducer.getTasksByBoardId);

  // TODO: Сделать сортировку колонок перед рендером
  // TODO: Сделать перераспределение порядка после удаления колонки

  const [formIsShown, setFormIsShown] = useState(false);
  const [taskIsChosen, setTaskIsChosen] = useState(false);
  const [clickedAddTaskColumnId, setClickedAddTaskColumnId] = useState('');
  const [clickedEditTitleColumnId, setClickedEditTitleColumnId] = useState('');
  const [currentColumnTitle, setCurrentColumnTitle] = useState('');

  const deleteColumnByButtonPress = (columnId: string): void => {
    dispatch(deleteColumn({ boardId: currentBoard._id, columnId }));
  };

  const deleteTaskByButtonPress = async ({ boardId, columnId, taskId }: IGetTasksRequest): Promise<void> => {
    await dispatch(deleteTask({ boardId, columnId, taskId }));
    await dispatch(getTasksByBoardId(boardId));
  };

  const toggleForm = (): void => {
    if (formIsShown) {
      setFormIsShown(false);
    } else {
      setFormIsShown(true);
    }
  };

  const handleAddColumn = (): void => {
    setTaskIsChosen((): boolean => false);
    toggleForm();
  };

  const showColumnTitleInput = (columnId: string): void => {
    setClickedEditTitleColumnId((): string => {
      return columnId;
    });
  };

  const changeColumnTitleState = (inputValue: string): void => {
    setCurrentColumnTitle((): string => {
      return inputValue;
    });
  };

  const changeColumnTitle = async (column: IColumnResponse): Promise<void> => {
    await dispatch(
      updateColumnById({
        boardId: currentBoard._id,
        columnId: column._id,
        title: currentColumnTitle,
        order: column.order,
      })
    );
    changeColumnTitleState('');
    showColumnTitleInput('');
  };

  const renderAllColumns = (boardColumns: IColumnResponse[]): JSX.Element[] =>
    boardColumns.map((column, index): JSX.Element => {
      let isChosenColumnTitle = false;
      if (clickedEditTitleColumnId === column._id) {
        isChosenColumnTitle = true;
      }
      console.log(column.order);
      return Column({
        userId,
        board: currentBoard,
        column,
        tasks: currentBoardTasks,
        key: index,
        isChosenColumnTitle,
        currentColumnTitle,
        deleteColumnByButtonPress,
        deleteTaskByButtonPress,
        toggleForm,
        setTaskIsChosen,
        setClickedAddTaskColumnId,
        showColumnTitleInput,
        changeColumnTitleState,
        changeColumnTitle,
      });
    });

  return (
    <Grid container className="board__conteiner">
      <Grid item className="board__btn-conteiner" xl={0.8} xs={0.8}>
        <Link to="/boards">
          <Button className="board__back-btn" variant="contained" color="primary" startIcon={<ArrowBackIosIcon />}>
            Back
          </Button>
        </Link>
        <Button
          className="board__create-board-btn"
          onClick={handleAddColumn}
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
        >
          Add column
        </Button>
      </Grid>
      <Grid container item className="column-conteiner" xl={11} xs={11}>
        <Grid
          container
          item
          className={formIsShown ? 'board__form' : 'board__form board__form_hidden'}
          xl={2.2}
          xs={2.2}
          component={Paper}
        >
          <Button
            className="board-form__close-btn"
            onClick={toggleForm}
            variant="outlined"
            color="error"
            startIcon={<CloseIcon />}
          ></Button>
          {taskIsChosen ? (
            <CreateTaskForm
              userId={userId}
              columnId={clickedAddTaskColumnId}
              board={currentBoard}
              toggleForm={toggleForm}
            />
          ) : (
            <CreateColumnForm
              board={currentBoard}
              currentBoardColumnsCount={currentBoardColumnsCount}
              toggleForm={toggleForm}
            />
          )}
        </Grid>
        <Typography className="board__title" variant="h4">
          {currentBoard ? currentBoard.title : 'No board chosen'}
        </Typography>
        <Grid container className="board__columns-layout">
          {renderAllColumns(currentBoardColumnsSorted)}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Board;
