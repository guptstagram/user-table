import React from "react";
import { ThemeProvider } from '@material-ui/core';

import theme from "./theme";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import TableComponent from "./components/tableComponent/tableComponents";
import UserComponent from "./components/userComponent/userComponent";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={TableComponent}></Route>
          <Route exact path="/user/:id" component={UserComponent}></Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;