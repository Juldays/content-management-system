import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./Store";
import { Route } from "react-router";
// Components
import Sidebar from "./SideNavComponent";
import Navbar from "./TopNavComponent";
import IfLoggedIn from "./IfLoggedInComponent";
import CMSRoutes from "./CMSRoutes";
import TopAndSideNavManager from "./TopAndSideNavManager";

class App extends React.Component {  

  render() {
    return (
      <Provider store={Store}>
        <BrowserRouter>
          <React.Fragment>
            <div className="App">
              <CMSRoutes />
            </div>
            <TopAndSideNavManager>
              <IfLoggedIn>
                <Navbar />
                <Sidebar />
              </IfLoggedIn>
            </TopAndSideNavManager>
          </React.Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default App;
