import React from "react";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router";
import CMSPage from "./CMSPage";
import { LoggedInRoute } from "./routes";

class CMSRoutes extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.cmsPages
          ? this.props.cmsPages.map(page => {
              if (page.IsPublic) {
                return (
                  <Route
                    key={page.Id}
                    exact
                    path={page.Path}
                    render={props => <CMSPage page={page} />}
                  />
                );
              } else {
                return (
                  <LoggedInRoute
                    exact
                    key={page.Id}
                    path={page.Path}
                    render={props => {
                      return <CMSPage page={page} />;
                    }}
                  />
                );
              }
            })
          : null}
      </React.Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    cmsPages: state.lookupData ? state.lookupData.CMSPages : []
  };
}

export default withRouter(connect(mapStateToProps, null)(CMSRoutes));
