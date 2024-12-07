import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import AdminPage from './pages/admin/AdminPage';

function App() {
  return (
    <BrowserRouter>
      {/* определяем маршруты и сопоставляем их с компонентами (страницами) */}
      <Routes>
        <Route path="login" element={<LoginPage />} />
        {/* маршрут по умолчанию */}
        <Route path="*" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
