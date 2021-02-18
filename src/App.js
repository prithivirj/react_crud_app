import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Login from './components/login-component/login';
import Home from './components/home-component/home';
import PageNotFound from './core/pageNotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Backdrop from '@material-ui/core/Backdrop';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//   backdrop: {
//     zIndex: theme.zIndex.drawer + 1,
//     color: '#fff',
//   },
// }));

function App() {

  //  const classes = useStyles();

  return (
    <div className="root">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login" component={Login} />
          <Route component={Home} />
          
        </Switch>
      </BrowserRouter>
      <ToastContainer />
      {/* <Backdrop className={classes.backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop> */}
    </div>
  );
}

export default App;
