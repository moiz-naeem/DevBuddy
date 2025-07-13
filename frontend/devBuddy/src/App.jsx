import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import userStore from "../utils/reduxStore";

import Body from "./components/Body";
import Login from "./components/Login";
import Feed from "./components/Feed";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import TabbedForm from "./components/TabbedForm";
import Password from "./components/Password";

function App() {
  return (
    <Provider store={userStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Feed />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <TabbedForm
                  primaryComponent={Profile} 
                  secondaryComponent={Password}
                  primaryLabel="Update profile"
                  secondaryLabel="Change password"
                  size = "large"
                />
              }
            />
            <Route
              path="/pass"
              element={
                <ProtectedRoute>
                  <Password />
                </ProtectedRoute>
              }
            />

            <Route
              path="/auth"
              element={
                <TabbedForm
                  primaryComponent={Login} 
                  secondaryComponent={Signup}
                  primaryLabel="Login"
                  secondaryLabel="Sign Up"
                  size = "medium"
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
