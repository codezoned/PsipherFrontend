import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { Form, Icon, Spin, Input, Button, notification, Col, Row } from 'antd';

/** Presentational */
import FormWrapper from '../components/styled/FormWrapper';

/** App theme */
import { colors } from '../themes/Colors';

/** App constants */
import { AUTH_USER_TOKEN_KEY } from '../utils/constants';

class LoginContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
          };
    this.handleSubmit = this.handleSubmit.bind(this);
    }
 

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.form.validateFields((error, values) => {
      if (!error) {
        let { username, password } = values;

        this.setState({ loading: true });

        Auth.signIn(username, password)
          .then(user => {
            const { history, location } = this.props;
            const { from } = location.state || {
              from: {
                pathname: '/dashboard'
              }
            };

            localStorage.setItem(AUTH_USER_TOKEN_KEY, user.signInUserSession.accessToken.jwtToken);

            notification.success({
              message: 'Succesfully logged in!',
              description: 'Logged in successfully, Redirecting you in a few!',
              placement: 'topRight',
              duration: 1.5
            });

            history.push(from);
          })
          .catch(error => {
            notification.error({
              message: 'Error',
              description: error.message,
              placement: 'topRight'
            });

            console.log(error);

            this.setState({ loading: false });
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;

    return (
      <React.Fragment>
        <FormWrapper onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: 'Please input your username!'
                }
              ]
            })(
              <Input prefix={<Icon type="user" style={{ color: colors.transparentBlack }} />} placeholder="Username" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!'
                }
              ]
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: colors.transparentBlack }} />}
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item className="text-center">
            <Row type="flex" gutter={16}>
              <Col lg={24}>
                <Link style={{ float: 'right' }} className="login-form-forgot" to="/forgot-password">
                  Forgot password
                </Link>
              </Col>
              <Col lg={24}>
                <Button
                  style={{ width: '100%' }}
                  type="primary"
                  disabled={loading}
                  htmlType="submit"
                  className="login-form-button"
                >
                  {loading ? <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} /> : 'Log in'}
                </Button>
              </Col>
              <Col lg={24}>
                Or <Link to="/signup">register now!</Link>
              </Col>
            </Row>
          </Form.Item>
        </FormWrapper>
      </React.Fragment>
    );
  }
}

export default Form.create()(LoginContainer);