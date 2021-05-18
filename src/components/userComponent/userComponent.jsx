import React from "react";
import {
  Box,
  Paper,
  makeStyles,
  LinearProgress,
  Avatar,
  Grid,
  Typography,
  IconButton,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { UserListContext } from "../../contexts/userListContext";
import { useHistory } from "react-router-dom";
import BidsTableComponent from "./bidsTableComponent";

// Defining Styles for Table Component
const useStyles = makeStyles((theme) => {
  return {
    root: {
      width: "100%",
      padding: theme.spacing(4),
    },
    paper: {
      width: "100%",
      padding: theme.spacing(4),
    },
    avatar: {
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
  };
});

const UserComponent = ({ match }) => {
  let history = useHistory();

  const classes = useStyles(); // Importing Styles for Table Component

  // Getting the current user from the user list
  const userList = React.useContext(UserListContext);
  const user = userList.find((user) => user.id === match.params.id);

  // Function to redirect on home
  const handleBackClicked = () => {
    history.push(`/`);
  };

  return (
    <>
      {user ? (
        <Box component="div" className={classes.root}>
          <Paper className={classes.paper}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12}>
                <IconButton onClick={handleBackClicked}>
                  <ArrowBackIcon />
                </IconButton>
              </Grid>
              <Grid item xs={12} md={2}>
                <Avatar
                  alt={user.firstname}
                  src={user.avatarUrl}
                  className={classes.avatar}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h3">
                  {`${user.firstname} ${user.lastname}`}
                </Typography>
                <Typography variant="h5">{user.email}</Typography>
                <Typography variant="h5">{user.phone}</Typography>
                <Typography variant="overline" color="secondary">
                  {user.hasPremium ? "Premium User" : null}
                </Typography>
              </Grid>
              {user.bids.length ? (
                <Grid item xs={12}>
                  <BidsTableComponent bids={user.bids} />
                </Grid>
              ) : (
                <Grid item xs={12}>
                  <Typography variant="button">No Bids to show...</Typography>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Box>
      ) : (
        <LinearProgress />
      )}
    </>
  );
};

export default UserComponent;
