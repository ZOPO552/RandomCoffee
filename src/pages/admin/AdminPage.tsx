import { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
const { Header, Sider, Content } = Layout;
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { supabase } from '../../shared/supabaseClient';
import TopicsList from './components/TopicsList';
import Places from './components/Places';
import { CarOutlined, BookOutlined } from '@ant-design/icons';


function AdminPage() {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  {
    const [selectedMenuItemKey, setSelectedMenuItemKey] = useState('1');
  function renderContent() {
    if (selectedMenuItemKey === '1') {
      return <TopicsList />;
    } else if (selectedMenuItemKey === '2') {
      return <Places />;
    }
  }

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log(session);
      if (!session) {
        navigate('/login');
      }
    };
    checkSession();
  }, []);

  async function logout() {
    supabase.auth.signOut();
    navigate('/login');
  }

  return (
    <Layout style={{ minWidth: '100%', minHeight: '100vh'}}>
      <Sider style={{ background: colorBgContainer, backgroundColor:'#040f47', justifyContent: 'center', alignItems: 'center',}}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{backgroundColor: '#040f47', color:'white'}}
          items={[
            {
              icon: <BookOutlined/>,
              style: {fontSize:'15px', marginTop:'15px', fontFamily:'cursive'},
              key: '1',
              label: 'Интересы',
              onClick: () => setSelectedMenuItemKey('1'),
            },
            {
              icon: <CarOutlined/>,
              style: {fontSize:'15px', marginTop:'15px', fontFamily:'cursive'},
              key: '2',
              label: 'Место',
              onClick: () => setSelectedMenuItemKey('2'),
            },
            {
              style: {fontSize:'15px', marginTop:'15px', fontFamily:'cursive'},
              key: '3',
              label: 'Выйти из аккаунта',
              onClick: () => logout(),
            },
            
          ]}
          
        />
      </Sider>
      <Layout>
      <center><span style={{fontSize:'50px', fontFamily:'cursive', marginRight:'15px'}}>Random Coffee</span><img src='logo3.png' style={{width:'50px'}}/></center>
        <Header style={{ padding: 0, background: colorBgContainer, backgroundColor:'white'
        }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              padding: '15px',
              columnGap: '15px',
            }}
          >

          </div>
        </Header>
        <Content
          style={{
            padding: 24,
            width: '100%',
            background: colorBgContainer,
            backgroundColor: '#F0F8FF',
            borderRadius: borderRadiusLG,
          }}
        >
          
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
}
}
export default AdminPage;
