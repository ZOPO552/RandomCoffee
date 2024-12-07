import { useState } from 'react';
import { Button, Layout, Menu, theme } from 'antd';
const { Header, Sider, Content } = Layout;
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { supabase } from '../../shared/supabaseClient';
import TopicsList from './components/TopicsList';
import Places from './components/Places';

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
    <Layout style={{ minWidth: '100%', minHeight: '100%' }}>
      <Sider style={{ background: colorBgContainer, backgroundColor:'#040f47', justifyContent: 'center', alignItems: 'center',}}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{backgroundColor: '#040f47', color:'white'}}
          items={[
            {
              key: '1',
              label: 'Topic',
              onClick: () => setSelectedMenuItemKey('1'),
            },
            {
              key: '2',
              label: 'Place',
              onClick: () => setSelectedMenuItemKey('2'),
            },
            
          ]}
          
        />
            <Button style={{backgroundColor:'#F0F8FF', width:'200px',}} onClick={() => logout()}>
              Выйти
            </Button>
      </Sider>
      <Layout>
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
            <div style={{fontSize:'50px', fontFamily:'Times New Roman'}}>Random Coffee </div><img src='./Coffelover.jpg' style={{width:'50px'}}/>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
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
