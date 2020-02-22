import React from 'react';
import {Route, Switch} from "react-router-dom";
import News from "./containers/News/News";
import AddNewPost from "./containers/AddNewPost/AddNewPost";
import FullNewPost from "./containers/FullNewPost/FullNewPost";

const App = () => {
  return (
    <Switch>
      <Route path="/" exact component={News} />
      <Route path="/news/new" exact component={AddNewPost} />
      <Route path="/news/:id" exact component={FullNewPost} />
    </Switch>
  );
};

export default App;
