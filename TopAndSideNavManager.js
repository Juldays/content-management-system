import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

class TopAndSideNavManager extends React.Component {
  render() {
    var hideNavBars = false;
    for (var index = 0; index < this.props.cmsPages.length; index++) {
      if (
        this.props.history.location.pathname == this.props.cmsPages[index].Path
      ) {
        if (this.props.cmsPages[index].HideNavBars) {
          hideNavBars = true;
        } else {
          hideNavBars = false;
        }
        break;
      }
    }
    return <div>{hideNavBars ? null : this.props.children}</div>;
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    cmsPages: state.lookupData ? state.lookupData.CMSPages : []
  };
}

export default withRouter(connect(mapStateToProps, null)(TopAndSideNavManager));
