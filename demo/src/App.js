import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Registartion from './pages/Registration';
import Authorization from './pages/Authorization';
import Papers from './pages/Papers';
import Menu from './components/Menu';
import NewPaper from './pages/NewPaper';
import Admin from './pages/Admin';
import { AuthProvider } from './auth/auth.context';
import { Helmet } from "react-helmet"

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Menu />
          <Routes>
            <Route path='/signup' element={<Registartion />} />
            <Route path='/signin' element={<Authorization />} />
            <Route path='/papers' element={<Papers />} />
            <Route path='/newpaper' element={<NewPaper />} />
            <Route path='/admin' element={<Admin />} />
          </Routes>

        </Router>
      </AuthProvider>
    </div>

  );
}

export default App;
