import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import { LoggedInRoute } from "./routes";

// Components
import CMSCreateEditPages from "./CMSCreateEditPages";
import CMSTemplates from "./CmsTemplatesComponent";
import CMSTemplatesViewAll from "./CmsTemplatesViewAll";

class CMS extends React.Component {
  state = {
    createTemplateSelected: false,
    pageSelected: false
  };

  templateSubmitted = () => {
    this.setState({
      createTemplateSelected: false,
      pageSelected: true
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="UserProfile body-content animated fadeIn">
          <div className="panel-heading">
            <h3 className="bg-primary" style={{ padding: ".5em" }}>
              Content Management System
            </h3>
          </div>
          <div className="panel-heading">
            <ul className="nav nav-tabs">
              {/* <li>
                <button
                  onClick={() =>
                    this.setState({
                      createTemplateSelected: false,
                      pageSelected: false,
                      viewTemplateSelected: true
                    })
                  }
                >
                  View Templates
                </button>
              </li> */}
              <li>
                <button
                  className="btn-warning rounded"
                  onClick={() =>
                    this.setState({
                      createTemplateSelected: true,
                      pageSelected: false,
                      viewTemplateSelected: false
                    })
                  }
                >
                  Create Templates
                </button>
              </li>
              <li>
                <button
                  className="btn-warning rounded"
                  onClick={() =>
                    this.setState({
                      createTemplateSelected: false,
                      pageSelected: true,
                      viewTemplateSelected: false
                    })
                  }
                >
                  Create/Edit Page
                </button>
              </li>
            </ul>
          </div>
          <div className="panel panel-body pt-20">
            {this.state.viewTemplateSelected ? (
              <CMSTemplatesViewAll />
            ) : this.state.createTemplateSelected ? (
              <CMSTemplates submitHandler={() => this.templateSubmitted()} />
            ) : (
              this.state.pageSelected && <CMSCreateEditPages />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CMS;
