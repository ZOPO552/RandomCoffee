import LoginForm from './components/LoginForm';

function LoginPage() {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        backgroundColor: '#F0F8FF',
      }}
    >
      <div style={{fontSize:'70px', color:'black',alignItems:'centre',padding:'20px', backgroundColor:'white', borderRadius: '16px', fontFamily:'Times New Roman'}}>
        Добро пожаловать в RandomCoffee!
      </div>
      <div><img width='500px' height='500px' src='./logo3.png' /></div>
      <div><LoginForm /></div>
    </div>
  );
}

export default LoginPage;
