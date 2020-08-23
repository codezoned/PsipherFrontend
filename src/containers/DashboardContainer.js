import * as React from 'react';
import SearchWrapper from '../components/styled/SearchInputWrapper'
import { Auth } from 'aws-amplify';
import { withRouter } from 'react-router';
import { Layout, Menu, Icon, notification, Button, List, Card } from 'antd';
import {PlusOutlined, SearchOutlined, PlusCircleFilled} from '@ant-design/icons'

/** App Theme */
import { colors } from '../themes/Colors';

/** App Constatns */
import { AUTH_USER_TOKEN_KEY } from '../utils/constants';

const DashBoardContainer = props => {
    const [collapsed, setCollapsed] = React.useState(false);
    const handleLogout = async (event) => {
    const { history } = props;
    try {
      await Auth.signOut({ global: true }).then(() => {
        localStorage.removeItem(AUTH_USER_TOKEN_KEY);
        history.push('/login');
      });
    } catch (err) {
      notification.error({ message: err.message });
    }
  };

//Adding this temporary data till we fetch from backend
    const data = [
        {
            domain: 'google.co.in',
            email: ['abc@google.com', "test@google.com"]
        },
        {
            domain: 'facebook.com',
            email: ['abc@google.com', "test@google.com"]
        },
        {
            domain: 'twitter.com',
            email: ['abc@gmail.com', "test@gmail.com"]
        },
        {
            domain: 'instagram.com',
            email: ['abc@google.com', "test@google.com"]
        },
        {
            domain: 'amazon.in',
            email: ['abc@amazon.com', "xyz@amazon.com"]
        },
        {
            domain: 'flipkart.com',
            email: ['abc@flipkart.com', "test@flipkart.com"]
        },
    ];

  return (
    <Layout className="cover" id="app-header" style={{ minHeight: '100vh' }}>
      <Layout.Sider className="cover" trigger={null} collapsible collapsed={collapsed} width={250} >
          <div style={{display:"flex", marginTop:20, marginBottom: 20}}>
              <Icon
                  style={{color:colors.white, marginTop:10, marginLeft:25, marginRight:10}}
                  className="trigger"
                  onClick={() => setCollapsed(!collapsed)}
                  type={collapsed ? 'menu-unfold' : 'menu-fold'}
              />
                  <SearchWrapper prefix={<SearchOutlined/>}/>
          </div>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Icon type="home" />
            <span>Home</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="setting" />
            <span>Settings</span>
          </Menu.Item>
          <Menu.Item key="3" onClick={event => handleLogout(event)}>
            <Icon type="logout" />
            <span>Logout</span>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
      <Layout style={{background: colors.white}}>
        <Layout.Header style={{ background: colors.white, padding: 0 }}>

          <span style={{paddingRight: 50}}> </span>
            <Button type="primary" >
                <PlusOutlined />
                Add New
            </Button>
        </Layout.Header>
          <List
              grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 2,
                  md: 4,
                  lg: 4,
                  xl: 6,
                  xxl: 3,
              }}
              dataSource={data}
              renderItem={item => (
                  <List.Item>
                      <Card title={item.domain} actions={[<PlusCircleFilled />]}>{<List dataSource={item.email}
                                                                                       renderItem={emails => (
                                                                                           <List.Item>
                                                                                               {emails}
                                                                                           </List.Item>)}/>}
                      </Card>
                  </List.Item>
              )}
          />
      </Layout>
    </Layout>
  );
};

export default withRouter(DashBoardContainer);