import React from "react";
import { cmsTemplates_getAll, cmsTemplates_delete } from "./server";
import { showModal } from "./SmallModal";

class CmsTemplatesViewAll extends React.Component {
  state = {
    templates: [],
    currentId: undefined,
    deleteTemplate: undefined
  };

  editTemplate = id => {
    this.props.history.push("cmstemplate/" + id);
  };

  setCurrentId = id => {
    this.setState({ currentId: id, deleteTemplate: id });
    showModal({
      modalStyle: "danger",
      title: "This action cannot be undone",
      body: "Delete Template?",
      closeButtonText: "Cancel",
      okButtonText: "Confirm"
    }).then(
      () => this.deleteTemplate(this.state.currentId),
      () => this.setState({ currentId: undefined, deleteTemplate: undefined })
    );
  };

  deleteTemplate = id => {
    const myPromise = cmsTemplates_delete(id);
    myPromise.then(resp => {
      this.updateTemplateState(id);
    });
  };

  updateTemplateState = id => {
    const newArray = this.state.templates.filter(item => item.id !== id);
    this.setState({ templates: newArray });
  };

  componentDidMount() {
    const myPromise = cmsTemplates_getAll();
    myPromise.then(resp => {
      this.setState({ templates: resp.data.items });
    });
  }

  render() {
    return (
      <div className="col-md-6">
        <pre>{JSON.stringify(this.state, null, 3)}</pre>
        <div className="table-responsive mb-20">
          <table className="table">
            <thead>
              <tr>
                <th className="text-center">Id</th>
                <th>Template Name</th>
                <th className="text-center" style={{ minWidth: "15%" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.templates
                .sort((a, b) => a.id - b.id)
                .map((c, index) => (
                  <tr
                    key={c.id}
                    className={
                      this.state.deleteTemplate === c.id ? "warning" : undefined
                    }
                  >
                    <td className="text-center">{c.id}</td>
                    <td>{c.name}</td>
                    <td className="text-center">
                      <a onClick={() => this.editTemplate(c.id)}>
                        <i className="fa fa-edit" />
                      </a>
                      <a
                        data-toggle="modal"
                        data-target=".bs-example-modal-sm"
                        onClick={() => this.setCurrentId(c.id)}
                      >
                        <i className="fa fa-trash-o" />
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default CmsTemplatesViewAll;
