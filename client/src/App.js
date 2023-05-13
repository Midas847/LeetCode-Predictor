import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contest from "./Contest/Contest";
import Home from "./Home/Home";
import PageNotFound from "./404/PageNotFound";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/contest/:id" Component={Contest} />
          <Route exact path="*" Component={PageNotFound} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
