import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Userprofile from './page/Userprofile';
import { ProfileProvider } from './contextreact/ProfileContext';
import UserDashboard from './page/UserDashboard';
import LoginPage from './page/LoginPage';
import HomePage from './page/HomePage';
import { ComplaintProvider } from './contextreact/ComplaintContext';
import AdminPage from './page/AdminPage';
import { UserProvider } from './contextreact/UserContext';
import CreateNewUser from './Components/ReuseableComponents/CreateNewUser';

function App() {
  // Custom Layout Wrapper
  const Layout = ({ children }) => {
    const location = useLocation(); // Access the current path

    // Define paths where the Navbar should not appear
    const hideNavbarPaths = ['/login', '/createuser'];

    // Check if the current path matches any of the hide paths
    const hideNavbar = hideNavbarPaths.includes(location.pathname);

    return (
      <div className="App">
        {/* Conditionally render the Navbar */}
        {!hideNavbar && <Navbar />}
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
                <Route path="/login" element={<LoginPage />} />
                <Route path="/createuser" element={<CreateNewUser />} />
                <Route path="/profile" element={<Userprofile />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/notification" element={<AdminPage />} />
              </Routes>
            </Layout>
          </Router>
        </ComplaintProvider>
      </UserProvider>
    </ProfileProvider>
  );
}

export default App;
