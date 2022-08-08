import ExpeditionPage from "./ExpeditionPage";
import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';


import theme from './theme';

export default () => {
  return (
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <ExpeditionPage />
      </ThemeProvider>);
}