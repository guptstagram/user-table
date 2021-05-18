import React from "react";
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

// Defining Styles for Table Component
const useStyles = makeStyles((theme) => {
  return {
    table: {
      minWidth: 400,
    },
    tableHead: {
      background: "#fafafa",
    },
    tableRow: {
      "& td": {
        color: theme.palette.primary.main,
      },
    },
  };
});

const BidsTableComponent = ({ bids }) => {
  const tableHeaders = ["Bid Placed on", "Car Title", "Amount"];

  // Coverting millliseconds to IST date
  const getISTDateString = (date) => {
    let dt = new Date(parseInt(date));
    return `${dt.getDate()}-${
      dt.getMonth() + 1
    }-${dt.getFullYear()} at ${dt.getHours()}:${dt.getMinutes()}`;
  };

  const classes = useStyles(); // Importing Styles for Table Component
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead className={classes.tableHead}>
          <TableRow>
            {tableHeaders.map((header, index) => (
              <TableCell key={index}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {bids.map((bid) => (
            <TableRow key={bid.id}>
              <TableCell>{getISTDateString(bid.created)}</TableCell>
              <TableCell>{bid.carTitle}</TableCell>
              <TableCell>{bid.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BidsTableComponent;
