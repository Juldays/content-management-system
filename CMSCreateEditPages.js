/*//////////////////////////////////////////// INFORMATION ////////////////////////////////////////////

    <CMSCreateEditPages/>  ---> Route: '/cms-createpages'
_______________________________________________________________________________________________________
        Property                |            Description
________________________________|______________________________________________________________________      
        None                    |  This component takes no props.  It allows clients to create new 
                                |  pages with provided CMS templates.  
_______________________________________________________________________________________________________
*/ /////////////////////////////////////////////////////////////////////////////////////////////////////
import React from "react";
import {
  cmsTemplates_getAll,
  cmsPages_create,
  cmsPages_getAll,
  cmsPages_update,
  cmsPages_delete
} from "./server";
import { ValidationMessage } from "./Validation";
import { showModal } from "./SmallModal";

class CMSCreateEditPages extends React.Component {
  componentDidMount() {
    this.refreshPageTemplateRepo();
  }

  state = {
    templateId: "",
    path: "",
    valuesJSON: "",
    isPublic: false,
    hideNavBars: false,
    name: "",

    //holds array of templates from database
    templates: "",

    //holds array of pages from database
    pages: "",

    pageSelected: "",
    taskSelected: "",
    validate: false
  };

  /////////////////////////////////////////  Ajax Calls ///////////////////////////////////////////
  // refreshes state with the most current data when component did mount and after every page
  // submition/deletion
  refreshPageTemplateRepo = () => {
    this.setState({
      templateId: "",
      path: "",
      valuesJSON: "",
      isPublic: false,
      hideNavBars: false,
      name: "",
      templates: "",
      valuesJSON: "",
      pages: "",
      pageSelected: "",
      taskSelected: "",
      validate: false
    });
    cmsTemplates_getAll().then(data =>
      this.setState({ templates: data.data.items })
    );

    cmsPages_getAll().then(data => this.setState({ pages: data.data.items }));
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////// Functions that returns elements to the component///////////////////////
  //based on state change and task selected, this function will return the respective input options
  displayTask = () => {
    if (this.state.taskSelected === "") {
      return null;
    }
    return (
      <React.Fragment>
        {this.state.taskSelected === "edit" && (
          <div className="form-group">
            <label className="col-sm-4 control-label">Page Name:</label>
            <div className="col-sm-7 templateSelectionContainer">
              <select
                className="templateSelect"
                value={this.state.pageSelected}
                required
                onChange={this.getTemplateId}
              >
                {this.state.pages.length > 0 ? (
                  <option value="">Select A Page</option>
                ) : (
                  <option value="">No Saved Page Avaliable</option>
                )}
                {this.state.pages.map(el => (
                  <option className="templateOption" value={el.id} key={el.id}>
                    {el.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        <fieldset
          disabled={
            this.state.taskSelected === "edit" && this.state.pages.length < 1
          }
        >
          <div className="form-group">
            <label className="col-sm-4 control-label">Template Name:</label>
            <div className="col-sm-7 templateSelectionContainer">
              <select
                className="templateSelect"
                disabled={this.state.taskSelected !== "create"}
                value={this.state.templateId}
                required
                onChange={this.getTemplateId}
              >
                <option value="">Select A Template</option>
                {this.state.templates.map(el => (
                  <option className="templateOption" value={el.id} key={el.id}>
                    {el.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-4 control-label">Page Name</label>
            <div className="col-sm-7">
              <input
                type="text"
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
                className="form-control input-sm"
                required
                ref={this.name}
                placeholder="Ex: My Page"
              />
              <ValidationMessage
                validationFor={this.name}
                validationTrigger={this.state.validate}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-4 control-label">Public Page</label>
            <div className="col-sm-7">
              <select
                value={this.state.isPublic}
                required
                onChange={e => this.setState({ isPublic: e.target.value })}
              >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-4 control-label">Hide Nav Bars</label>
            <div className="col-sm-7">
              <select
                value={this.state.hideNavBars}
                required
                onChange={e => this.setState({ hideNavBars: e.target.value })}
              >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="path" className="col-sm-4 control-label">
              Path
            </label>
            <div className="col-sm-7">
              <input
                type="text"
                value={this.state.path}
                onChange={e => this.setState({ path: e.target.value })}
                className="form-control input-sm"
                required
                ref={this.path}
                pattern="^(\/\w[^<>!@#$%^&*()+?=\s]+)"
                id="path"
                placeholder="Ex: /example"
              />
              <ValidationMessage
                validationFor={this.path}
                validationTrigger={this.state.validate}
                patternMessage={
                  "URL path must start with a / and have no special characters."
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-4 control-label">Values</label>
            <div className="col-sm-7 templateInputContainer">
              {this.displayInputs()}
            </div>
          </div>
          {this.state.templateId ? (
            <div className="form-group">
              <label className="col-sm-4 control-label">
                Selected Template
              </label>
              <div className="col-sm-7 templateInputContainer">
                <div
                  dangerouslySetInnerHTML={{
                    __html: this.state.templates.filter(
                      el => el.id == this.state.templateId
                    )[0].templateHtml
                  }}
                />
                {/* <textarea
                  value={
                    this.state.templates.filter(
                      el => el.id == this.state.templateId
                    )[0].templateHtml
                  }
                  className="form-control input-sm"
                  readOnly
                  cols="560"
                  rows="6"
                /> */}
              </div>
            </div>
          ) : null}
        </fieldset>
      </React.Fragment>
    );
  };

  //creates inputs based on the amount of placeholders
  displayInputs = () => {
    if (this.state.templateId === "" || this.state.templateId === undefined) {
      return (
        <div>
          Select a {this.state.taskSelected === "edit" ? "page" : "template"}{" "}
          above.
        </div>
      );
    }
    if (this.state.templateId && !this.state.valuesJSON) {
      return (
        <div>
          No placeholder is avaliable for this template. If a placeholder is
          expected, please edit the template. A placeholder is wrapped with
          <b style={{ color: "blue" }}> $$. </b>
          <p>
            (ie. &lt;div&gt;
            <i>
              <b style={{ color: "blue" }}>$$</b>Example Placeholder<b
                style={{ color: "blue" }}
              >
                $$
              </b>
            </i>
            &lt;/div&gt;)
          </p>
        </div>
      );
    }
    let labels = Object.getOwnPropertyNames(this.state.valuesJSON);
    return labels.map((el, index) => (
      <div key={index}>
        <div className="inputName">{el}</div>
        <input
          type="text"
          value={this.state.valuesJSON[el]}
          onChange={e =>
            this.setState({
              valuesJSON: {
                ...this.state.valuesJSON,
                [el]: e.target.value
              }
            })
          }
          className="form-control input-sm template"
          placeholder="Enter Text Value"
        />
      </div>
    ));
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////// Handlers ////////////////////////////////////////////////
  // resets state main properties between task changes so previous displayed/stored data does not carry over
  taskSelectionHandler = e => {
    this.setState({
      taskSelected: e.target.value,
      valuesJSON: "",
      name: "",
      path: "",
      templateId: "",
      isPublic: false,
      hideNavBars: false,
      pageSelected: ""
    });
  };

  //identifies templateId and placeholders associated with the template after client
  //selects the template or existing page to edit
  getTemplateId = e => {
    if (this.state.taskSelected === "create") {
      let valueLabels;
      let valuesJSON = {};
      if (e.target.value) {
        valueLabels = this.state.templates
          .filter(el => el.id == [e.target.value])[0]
          .templateHtml.match(/\$\$(.*?)\$\$/g);
      }
      if (valueLabels) {
        valueLabels.map(el => (valuesJSON[el] = ""));
        this.setState({
          valuesJSON: valuesJSON,
          templateId: e.target.value
        });
      } else {
        this.setState({
          valuesJSON: "",
          templateId: e.target.value
        });
      }
    }
    if (this.state.taskSelected === "edit") {
      if (e.target.value) {
        this.setState({
          valuesJSON: this.state.pages.filter(el => el.id == e.target.value)[0]
            .valuesJSON,
          name: this.state.pages.filter(el => el.id == e.target.value)[0].name,
          path: this.state.pages.filter(el => el.id == e.target.value)[0].path,
          templateId: this.state.pages.filter(el => el.id == e.target.value)[0]
            .templateId,
          hideNavBars: this.state.pages.filter(el => el.id == e.target.value)[0]
            .hideNavBars,
          isPublic: this.state.pages.filter(el => el.id == e.target.value)[0]
            .isPublic,
          pageSelected: e.target.value
        });
      } else {
        this.setState({
          valuesJSON: "",
          path: "",
          templateId: "",
          pageSelected: e.target.value
        });
      }
    }
    return null;
  };

  //submit new/edited page
  submitPage = e => {
    e.preventDefault();
    if (this.state.taskSelected === "create") {
      let data = {
        templateId: this.state.templateId,
        path: this.state.path,
        valuesJSON: this.state.valuesJSON,
        isPublic: this.state.isPublic,
        hideNavBars: this.state.hideNavBars,
        name: this.state.name
      };
      cmsPages_create(data).then(
        () => {
          this.refreshPageTemplateRepo();
          showModal({
            title: "Success",
            body: "Successful submital."
          });
        },
        error => {
          let regex1 = RegExp("unique index 'CMSPages_Name'*");
          let regex2 = RegExp("unique index 'CMSPages_Path'*");
          if (regex1.test(error.response.data.exceptionMessage)) {
            showModal({
              title: "Cannot Submit Request",
              body:
                this.state.name +
                ' has been taken.  Please enter another "Page Name".'
            });
          } else if (regex2.test(error.response.data.exceptionMessage)) {
            showModal({
              title: "Cannot Submit Request",
              body:
                this.state.path +
                ' has been taken.  Please enter another "Path".'
            });
          } else {
            showModal({
              title: "Error",
              body: "Please check your inputs or try again later."
            });
          }
        }
      );
    }

    if (this.state.taskSelected === "edit") {
      let data = {
        templateId: this.state.templateId,
        path: this.state.path,
        valuesJSON: this.state.valuesJSON,
        isPublic: this.state.isPublic,
        name: this.state.name,
        hideNavBars: this.state.hideNavBars,
        id: this.state.pageSelected
      };
      cmsPages_update(data).then(
        () => this.refreshPageTemplateRepo(),
        error => {
          let regex1 = RegExp("unique index 'CMSPages_Name'*");
          let regex2 = RegExp("unique index 'CMSPages_Path'*");
          if (regex1.test(error.response.data.exceptionMessage)) {
            showModal({
              title: "Cannot Submit Request",
              body:
                this.state.name +
                ' has been taken.  Please enter another "Page Name".'
            });
          } else if (regex2.test(error.response.data.exceptionMessage)) {
            showModal({
              title: "Cannot Submit Request",
              body:
                this.state.path +
                ' has been taken.  Please enter another "Path".'
            });
          } else {
            showModal({
              title: "Error",
              body: "Please check your inputs or try again later."
            });
          }
        }
      );
    }
  };

  deletePage = () => {
    if (!this.state.pageSelected) {
      showModal({
        title: "Error",
        body: "No page was selected.  Please select a page."
      });
    } else {
      showModal({
        title: "Delete Confirmation",
        body: "Are you sure you want to delete this page?"
      }).then(() => {
        cmsPages_delete(this.state.pageSelected).then(() =>
          this.refreshPageTemplateRepo()
        );
      });
    }
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////// Ref for <ValidationMessage> /////////////////////////////////
  path = React.createRef();
  name = React.createRef();
  ///////////////////////////////////////////////////////////////////////////////////////////////////

  render() {
    return (
      <React.Fragment>
        <div className="panel rounded shadow no-overflow">
          <div className="panel-heading">
            <div className="pull-left">
              <h3 className="panel-title">Pages</h3>
            </div>
            <div className="clearfix" />
          </div>
          <div className="panel-body no-padding">
            <form
              className="form-horizontal form-bordered"
              role="form"
              onSubmit={this.submitPage}
            >
              <div className="form-body">
                <div className="form-group">
                  <label className="col-sm-4 control-label">Select Task:</label>
                  <div className="col-sm-7 templateSelectionContainer">
                    <select
                      className="templateSelect"
                      required
                      value={this.state.taskSelected}
                      onChange={this.taskSelectionHandler}
                    >
                      <option value="">Select A Task</option>
                      <option className="templateOption" value="create">
                        Create Page From Template
                      </option>
                      <option className="templateOption" value="edit">
                        Edit Page
                      </option>
                    </select>
                  </div>
                </div>
                {this.state.taskSelected && this.displayTask()}
              </div>
              {this.state.taskSelected && (
                <div className="form-footer">
                  <div className="col-sm-offset-4">
                    <button
                      type="submit"
                      className="btn btn-success"
                      onClick={() => this.setState({ validate: true })}
                    >
                      Submit
                    </button>
                    {this.state.taskSelected === "edit" && (
                      <span
                        type="submit"
                        className="btn btn-danger"
                        onClick={this.deletePage}
                      >
                        Delete
                      </span>
                    )}
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CMSCreateEditPages;
