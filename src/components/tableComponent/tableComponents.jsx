import React from "react";
import {
  Avatar,
  Box,
  LinearProgress,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
} from "@material-ui/core";

import ImportExportIcon from "@material-ui/icons/ImportExport";
import { useHistory } from "react-router-dom";
import { UserListContext } from "../../contexts/userListContext";

// Defining Styles for Table Component
const useStyles = makeStyles((theme) => {
  return {
    root: {
      width: "100%",
      padding: theme.spacing(4),
    },
    paper: {
      width: "100%",
    },
    table: {
      minWidth: 600,
    },
    tableHead: {
      background: "#fafafa",
    },
    tableRow: {
      cursor: "pointer",
      "& td": {
        color: theme.palette.primary.main,
      },
    },
    iconButton: {
      padding: 0,
    },
    avatarCell: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    },
  };
});

// Table Component
const TableComponent = () => {
  let history = useHistory();
  const tableHeaders = ["Customer Name", "Email", "Phone", "Premium", "Bid"];

  const classes = useStyles(); // Importing Styles for Table Component

  const [showingMin, setShowingMin] = React.useState(false);

  // Table Pagination states and functions
  const [currPage, setCurrPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handlePageChange = (event, newPage) => {
    setCurrPage(newPage);
  };
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrPage(0);
  };

  // Function to find min amount in bids array
  const findMin = (arr) => {
    return arr.reduce(
      (min, ele) => (ele.amount < min ? ele.amount : min),
      arr[0].amount
    );
  };

  // Function to find max amount in bids array
  const findMax = (arr) => {
    return arr.reduce(
      (max, ele) => (ele.amount > max ? ele.amount : max),
      arr[0].amount
    );
  };

  // Function to redirect on click of table row
  const handleTableRowClicked = (id) => {
    history.push(`/user/${id}`);
  };

  const userList = React.useContext(UserListContext); // Using the user list

  return (
    <Box component="div" className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          {/* Showing progress bar till the table items not fetched */}
          {userList.length ? null : <LinearProgress />}
          <Table className={classes.table}>
            <TableHead className={classes.tableHead}>
              <TableRow>
                {tableHeaders.map((tableHeader, index) => (
                  <TableCell key={index} align="center">
                    {index === tableHeaders.length - 1 ? (
                      <>
                        {`${showingMin ? "Min" : "Max"} ${tableHeader}`}
                        <IconButton
                          className={classes.iconButton}
                          onClick={() => setShowingMin(!showingMin)}
                        >
                          <ImportExportIcon />
                        </IconButton>
                      </>
                    ) : (
                      tableHeader
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {userList
                .slice(
                  currPage * rowsPerPage,
                  currPage * rowsPerPage + rowsPerPage
                )
                .map((user) => (
                  <TableRow
                    hover
                    key={user.id}
                    className={classes.tableRow}
                    onClick={() => handleTableRowClicked(user.id)}
                  >
                    <TableCell align="center" className={classes.avatarCell}>
                      <Avatar alt={user.firstname} src={user.avatarUrl} />
                      {`${user.firstname} ${user.lastname}`}
                    </TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">{user.phone}</TableCell>
                    <TableCell align="center">
                      {user.hasPremium ? "Yes" : "No"}
                    </TableCell>
                    <TableCell align="center">
                      {user.bids.length
                        ? showingMin
                          ? findMin(user.bids)
                          : findMax(user.bids)
                        : "-"}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Not showing pagination till the table items not fetched */}
        {userList.length ? (
          <TablePagination
            component="div"
            rowsPerPageOptions={[5, 10, 15]}
            rowsPerPage={rowsPerPage}
            page={currPage}
            count={userList.length}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
          />
        ) : null}
      </Paper>
    </Box>
  );
};

export default TableComponent;
