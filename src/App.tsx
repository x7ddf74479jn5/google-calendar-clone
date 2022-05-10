import "./App.css";

import React, { Fragment } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import GithubLink from "./components/GithubLink";
import AuthWrapper from "./context/AuthWrapper";
import PrivateRoute from "./routes/PrivateRoute";
import CalendarScreen from "./screens/CalendarScreen";
import DesktopOnly from "./screens/DesktopOnly";
import HomeScreen from "./screens/HomeScreen";
import TestDatabaseScreen from "./screens/TestDatabaseScreen";

const App: React.FC = () => {
  return (
    <Fragment>
      <MobileView>
        <DesktopOnly />
      </MobileView>
      <BrowserView>
        <AuthWrapper>
          <Router>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/database" element={<TestDatabaseScreen />} />
              <PrivateRoute path="/calendar">
                <CalendarScreen />
              </PrivateRoute>
            </Routes>
            <GithubLink />
          </Router>
        </AuthWrapper>
      </BrowserView>
    </Fragment>
  );
};

export default App;
