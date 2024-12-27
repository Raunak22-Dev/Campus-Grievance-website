import './App.css'
import Navbar from './Components/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Userprofile from './page/Userprofile';
import {ProfileProvider}  from './contextreact/ProfileContext';
import UserDashboard from './page/UserDashboard';
function App() {


  return (
    
    <ProfileProvider>
    <div className="App">
        <Router>
          <Navbar />
            <Routes>
              <Route exact path="/profile" element={<Userprofile />} />
              

              <Route exact path="/dashboard" element={<UserDashboard />} />
             
            </Routes>
        </Router>
      </div>


</ProfileProvider>
  )
}

export default App
