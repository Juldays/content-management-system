import React from "react";
import { connect } from "react-redux";

class CMSPage extends React.Component {
  render() {
    const pageTemplateId = this.props.page.TemplateId;
    const valuesJson = this.props.page.ValuesJson;
    const templates = this.props.cmsTemplates;
    var pageTemplate = "";
    var element = document.createElement("div");

    for (let tempIndex = 0; tempIndex < templates.length; tempIndex++) {
      if (templates[tempIndex].Id === pageTemplateId) {
        pageTemplate = templates[tempIndex].TemplateHtml;
      }
    }

    for (let prop in valuesJson) {
      element.innerText = valuesJson[prop];
      pageTemplate = pageTemplate.split(prop).join(element.innerHTML);
    }

    return (
      <React.Fragment>
        <div dangerouslySetInnerHTML={{ __html: pageTemplate }} />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    cmsTemplates: state.lookupData ? state.lookupData.CMSTemplates : [],
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps)(CMSPage);
