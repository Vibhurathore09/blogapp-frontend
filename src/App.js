import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
// import SinglePost from "./components/singlePost/SinglePost";
import Single from "./pages/Single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/setting/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
function App() {
  const {user} = useContext(Context);
  return (
    <div className="App">
      <Router>
        <Topbar />
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/register" replace />}
          />
          <Route
            path="register"
            element={!user ? <Register /> : <Navigate to="/" replace />}
          />
          <Route
            path="login"
            element={!user ? <Login /> : <Navigate to="/" replace />}
          />

          {/* <Route path="/single" element={<Single />} /> */}
          <Route
            path="write"
            element={user ? <Write /> : <Navigate to="/register" replace />}
          />
          <Route path="write" element={<Write />} />
          <Route
            path="settigs"
            elemt={user ? <Settings /> : <Navigate to="register" replace />}
          />
          <Route path="/settings" element={<Settings />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/post/:postId" element={<Single />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
