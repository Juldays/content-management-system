import React from "react";
import {
  cmsTemplates_getById,
  cmsTemplates_create,
  cmsTemplates_update
} from "./server";
import "primereact/resources/primereact.min.css";
import { ProgressSpinner } from "primereact/components/progressspinner/ProgressSpinner";

class CmsTemplatesComponent extends React.Component {
  state = {
    loading: false,
    templateHtml: "",
    name: "",
    id: ""
  };

  componentDidMount() {
    // if (this.props.match.params.id) {
    //   const myPromise = cmsTemplates_getById(this.props.match.params.id);
    //   myPromise.then(resp => {
    //     this.setState({
    //       templateHtml: resp.data.item.templateHtml,
    //       name: resp.data.item.name,
    //       id: this.props.match.params.id
    //     });
    //   });
    // }
  }

  handleClick = e => {
    e.preventDefault();
    this.setState({ loading: true });
    // if (this.props.match.params.id) {
    //   cmsTemplates_update({
    //     templateHtml: this.state.templateHtml,
    //     name: this.state.name,
    //     id: this.props.match.params.id
    //   })
    //     .then(response => {
    //       this.setState({
    //         templateHtml: "",
    //         name: ""
    //       });
    //       this.props.history.push("/cmstemplate");
    //       console.log("Success!" + response);
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    //   this.setState({ loading: false });
    // } else {
    cmsTemplates_create({
      templateHtml: this.state.templateHtml,
      name: this.state.name
    })
      .then(
        response => {
          this.props.submitHandler();
          // this.props.history.push("/admin/cms/createpage");
          console.log("Success!" + response);
        }
        // () => this.props.submitHandler
      )
      .catch(error => {
        console.log(error);
      });
    this.setState({ loading: false });
    // }
  };

  render() {
    const { loading, templateHtml, name } = this.state;

    return (
      <div className="CmsTemplateCreator col-md-6">
        <pre>{JSON.stringify(this.state, null, 3)}</pre>
        <form>
          <div className="form-group">
            HTML Editor:
            <textarea
              type="text"
              className="form-control"
              name="htmlEditor"
              rows="15"
              value={templateHtml}
              disabled={loading}
              onChange={e =>
                this.setState({
                  templateHtml: e.target.value
                })
              }
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Template Name"
              name="templateName"
              value={name}
              disabled={loading}
              onChange={e =>
                this.setState({
                  name: e.target.value
                })
              }
            />
            <div className="input-group-btn">
              {loading ? (
                <ProgressSpinner
                  style={{ width: "32px", height: "32px", marginLeft: "1.5em" }}
                  strokeWidth="5"
                  fill="#EEEEEE"
                  animationDuration=".5s"
                />
              ) : (
                <button
                  className="btn btn-success"
                  type="submit"
                  disabled={loading}
                  onClick={this.handleClick}
                >
                  {this.state.id ? "Edit" : "Create"}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default CmsTemplatesComponent;
