import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Userprofile from './page/Userprofile';
import { ProfileProvider } from './contextreact/ProfileContext';
import UserDashboard from './page/UserDashboard';
import StartingPage from './page/StartingPage';
// import LoginPage from './page/LoginPage';
import HomePage from './page/HomePage';

function App() {
  // Custom Layout Wrapper
  const Layout = ({ children }) => {
    const location = useLocation();

    // Exclude Navbar on specific routes
    // const hideNavbar = location.pathname === '/login';

    return (
      <div className="App">
        {/* {!hideNavbar && <Navbar />} */}
        { <Navbar />}
        {children}
      </div>
    );
  };

  return (
    <ProfileProvider>
      <Router>
        <Layout>
          <Routes>
            <Route exact path="/" element={<StartingPage />} />
            {/* <Route exact path="/login" element={<LoginPage />} /> */}
            <Route exact path="/profile" element={<Userprofile />} />
            <Route exact path="/dashboard" element={<UserDashboard />} />
            <Route exact path="/home" element={<HomePage />} />
            
          </Routes>
        </Layout>
      </Router>
    </ProfileProvider>
  );
}

export default App;
