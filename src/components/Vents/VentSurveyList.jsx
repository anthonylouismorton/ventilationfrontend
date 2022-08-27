import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import { visuallyHidden } from '@mui/utils';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ReviewsIcon from '@mui/icons-material/Reviews';
import axios from 'axios';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
const headCells = [
  {
    id: 'coverage',
    numeric: false,
    disablePadding: true,
    label: 'Coverage',
  },
  {
    id: 'surveyDate',
    numeric: false,
    disablePadding: true,
    label: 'Survey Date',
  },
  {
    id: 'expirationDate',
    numeric: false,
    disablePadding: true,
    label: 'Expiration Date',
  },
  {
    id: 'dueByDate',
    numeric: false,
    disablePadding: true,
    label: 'Due By Date',
  },
  {
    id: 'pass',
    numeric: false,
    disablePadding: false,
    label: 'Pass',
  },
  {
    id: 'technician',
    numeric: false,
    disablePadding: false,
    label: 'Assigned Technician',
  },
  {
    id: 'completedBy',
    numeric: false,
    disablePadding: false,
    label: 'Completed By',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            // onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
        <TableCell
          key={headCell.id}
          align='center'
          padding={headCell.disablePadding ? 'none' : 'normal'}
          sortDirection={orderBy === headCell.id ? order : false}
        >
          <TableSortLabel
            active={orderBy === headCell.id}
            direction={orderBy === headCell.id ? order : 'asc'}
            onClick={createSortHandler(headCell.id)}
          >
            {headCell.label}
            {orderBy === headCell.id ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Vent Surveys
        </Typography>
      )}
      {numSelected === 0 ?
      <Tooltip title="Add Survey">
        <IconButton onClick={props.handleAssignSurvey}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      : numSelected === 1 ?
      <Tooltip title="Review">
        <IconButton onClick={props.handleReview}>
          <ReviewsIcon />
        </IconButton>
      </Tooltip>
      :
      <Tooltip title="This is temp">
        <IconButton>
          <AddIcon />
        </IconButton>
    </Tooltip>
    }
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function VentList(props) {
  
  const [rows, setRows] = useState([])
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleAssignSurvey = () =>{
    props.setShow({
      ...props.show,
      ventInfo: false,
      assignSurvey: true
    });
  };
  const handleReview = () =>{
    props.setShow({
      ...props.show,
      ventInfo: false,
      reviewSurvey: true
    });
  };

  const handleClick = (event, survey) => {
    const selectedIndex = selected.indexOf(survey.ventSurveyId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, survey.ventSurveyId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
    props.setSelectedVentSurvey(survey)
  };

  // const handleNewVentSurvey = () => {
  //   props.setShow({
  //     ...props.show,
  //     ventInfo: false,
  //     assignSurvey: true,
  //   });
  // };
  // const handleTechSelect = async (tech, vent) => {
  //   let updatedVent = {...vent, technicianId: tech.technicianId}
  //   await axios.put(`${process.env.REACT_APP_DATABASE}/vents/${vent.ventId}`, updatedVent);
  //   // getVentsAndTechs();
  // }

  // const handleDeleteClick = async (id) => {
  //   await axios.delete(`${process.env.REACT_APP_DATABASE}/employee/${id}`);
  //   setShowDeleteWarning(!showDeleteWarning, null)
  // }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    let rowSelection = event.target.value
    if(rowSelection === 'All'){
      rowSelection = parseInt(rows.length)
    }
    setRowsPerPage(parseInt(rowSelection, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  
  const getVentSurveys = async () =>{
    let ventSurveys = await axios.get(`${process.env.REACT_APP_DATABASE}/allVentSurveys/${props.selectedVent.ventId}`)
    setRows([...ventSurveys.data])

    let equipmentList = await axios.get(`${process.env.REACT_APP_DATABASE}/equipment`);
    props.setEquipment([...equipmentList.data]);
  };
  
  useEffect(()=> {
    getVentSurveys();
  }, []);
  console.log(rows)
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} handleAssignSurvey={handleAssignSurvey} handleReview={handleReview}/>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.ventSurveyId);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.ventSurveyId}
                      selected={isItemSelected}
                      onClick={(event) => handleClick(event, row)}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                      />
                      </TableCell>
                      <TableCell align="center">{row.coverageDate}</TableCell>
                      <TableCell align="center">{row.surveyDate}</TableCell>
                      <TableCell align="center">{row.expirationDate}</TableCell>
                      <TableCell align="center">{row.dueByDate}</TableCell>
                      <TableCell align="center">{row.pass}</TableCell>
                      <TableCell align="center">{`${row.technician.technicianRank} ${row.technician.lastName}, ${row.technician.firstName}`}</TableCell>
                      <TableCell align="center">{row.completedBy}</TableCell>
                      <TableCell align="center">{row.status}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100, rows.length]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};