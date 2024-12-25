import './App.css'
import Navbar from './Components/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Userprofile from './page/Userprofile';
function App() {


  return (
    <>
      <div className="App">
        <Router>
          <Navbar />
          <div className="container ">
            <Routes>
              {/* <Route exact path="/" element={<Home />} />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} /> */}
              <Route exact path="/profile" element={<Userprofile />} />
            </Routes>
          </div>
        </Router>
      </div>

    </>
  )
}

export default App
