import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contest from "./Contest";
import Home from "./Home";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/contest/:id" Component={Contest} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
