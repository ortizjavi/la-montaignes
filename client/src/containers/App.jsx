import "./App.css";
import React, { useEffect } from "react";
import { Route, Switch } from "react-router";
import { useDispatch } from "react-redux";
import Home from "../components/Home/Home";
import Landing from "../components/Landing/Landing";
import ProductDetail from "../components/ProductDetail/ProductDetail";
import ProductCreation from "../components/ProductCreation/ProductCreation";
import CategoryCreation from "../components/CategoryCreation/CategoryCreation";
import { getCategories } from "../actions/types";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import lightGreen from "@material-ui/core/colors/lightGreen";
<<<<<<< HEAD
import {Dashboard} from '../components/DashboardAdmin/Dashboard'


=======
>>>>>>> fe08e792003c23c3948368f6c8e3411ba264b75e
const theme = createTheme({
  palette: {
    primary: green,
    secondary: lightGreen,
  },
});

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Switch>
          <Route
          exact
          path="/home/admin"
          component={Dashboard}/>
          <Route
            exact
            path="/home/admin/productCreation"
            component={ProductCreation}
          />
          <Route
            exact
            path="/admin/categoryCreation"
            component={CategoryCreation}
          />
          <Route exact path="/home/:id" component={ProductDetail} />
        </Switch>
      </ThemeProvider>
    </div>
  );
}
