import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

/** Container components */
import DashBoardContainer from '../containers/DashboardContainer';
import LoginContainer from '../containers/LoginContainer';
import SignUpContainer from '../containers/SignUpContainer';
import ConfirmEmailContainer from '../containers/ConfirmEmailContainer';
import ForgotPasswordContainer from '../containers/ForgotPasswordContainer';
import PasswordResetContainer from '../containers/PasswordResetContainer';

/** private route component */
import PrivateRoute from './PrivateRoutes';

class AppRouter extends React.Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <PrivateRoute exact={true} path="/dashboard" component={DashBoardContainer} />
          <Route exact={true} path="/" component={LoginContainer} />
          <Route exact={true} path="/login" component={LoginContainer} />
          <Route exact={true} path="/signup" component={SignUpContainer} />
          <Route exact={true} path="/verify-code" component={ConfirmEmailContainer} />
          <Route exact={true} path="/reset-password" component={PasswordResetContainer} />
          <Route exact={true} path="/forgot-password" component={ForgotPasswordContainer} />
        </React.Fragment>
      </Router>
    );
  }
}

export default AppRouter;