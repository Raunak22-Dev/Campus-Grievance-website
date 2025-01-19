import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Userprofile from './page/Userprofile';
import { ProfileProvider } from './contextreact/ProfileContext';
import UserDashboard from './page/UserDashboard';
// import LoginPage from './page/LoginPage';
import HomePage from './page/HomePage';
import { ComplaintProvider } from './contextreact/ComplaintContext';
import AdminPage from './page/AdminPage';
import { UserProvider } from './contextreact/UserContext';

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
    <UserProvider>

    <ComplaintProvider>

      <Router>
        <Layout>
          <Routes>
            
            {/* <Route exact path="/login" element={<LoginPage />} /> */}
            <Route exact path="/profile" element={<Userprofile />} />
            <Route exact path="/dashboard" element={<UserDashboard />} />
            <Route exact path="/home" element={<HomePage />} />
            <Route exact path="/admin" element={<AdminPage/> }/>
            
          </Routes>
        </Layout>
      </Router>
    </ComplaintProvider>
    </UserProvider>
    </ProfileProvider>
  );
}

export default App;
