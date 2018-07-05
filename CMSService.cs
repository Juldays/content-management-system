using Newtonsoft.Json.Linq;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class CMSService : ICMSService
    {
        readonly IDataProvider dataProvider;
        public CMSService(IDataProvider dataProvider)
        {
            this.dataProvider = dataProvider;
        }

        public List<CMSTemplate> GetAll()
        {
            List<CMSTemplate> results = new List<CMSTemplate>();
            dataProvider.ExecuteCmd(
                "CMSTemplates_GetAll",
                inputParamMapper: null,
                singleRecordMapper: (reader, resultSetNumber) =>
                {
                    CMSTemplate template = new CMSTemplate();
                    template.Id = (int)reader["Id"];
                    template.Name = (string)reader["Name"];
                    template.TemplateHtml = (string)reader["TemplateHtml"];
                    results.Add(template);
                });
            return results;
        }

        public CMSTemplate GetById(int id)
        {
            CMSTemplate template = null;
            dataProvider.ExecuteCmd(
                "CMSTemplates_GetById",
                inputParamMapper: (parameters) =>
                {
                    parameters.AddWithValue("@Id", id);
                }, 
                singleRecordMapper: (reader, resultSetNumber) =>
                {
                    template = new CMSTemplate();
                    template.Name = (string)reader["Name"];
                    template.TemplateHtml = (string)reader["TemplateHtml"];
                });
            return template;
        }

        public int Create(CMSTemplateCreateRequest req)
        {
            int newId = 0;
            dataProvider.ExecuteNonQuery(
                "CMSTemplates_Create",
                inputParamMapper: (parameters) =>
                {
                    parameters.AddWithValue("@Name", req.Name);
                    parameters.AddWithValue("@TemplateHtml", req.TemplateHtml);
                    parameters.Add("@Id", SqlDbType.Int).Direction = ParameterDirection.Output;
                },
                returnParameters: (parameters) =>
                {
                    newId = (int)parameters["@Id"].Value;
                });
            return newId;
        }

        public void Update(CMSTemplateUpdateRequest req)
        {
            dataProvider.ExecuteNonQuery(
                "CMSTemplates_Update",
                inputParamMapper: (parameters) =>
                {
                    parameters.AddWithValue("@Id", req.Id);
                    parameters.AddWithValue("@Name", req.Name);
                    parameters.AddWithValue("@TemplateHtml", req.TemplateHtml);
                });
        }

        public void Delete(int id)
        {
            dataProvider.ExecuteNonQuery(
                "CMSTemplates_Delete",
                inputParamMapper: (parameters) =>
                {
                    parameters.AddWithValue("@Id", id);
                });
        }

        public List<CMSPage> GetAllPages()
        {
            List<CMSPage> results = new List<CMSPage>();
            dataProvider.ExecuteCmd(
                "CMSPages_GetAll",
                inputParamMapper: null,
                singleRecordMapper: (reader, resultSetNumber) =>
                {
                    CMSPage page = new CMSPage();
                    page.Id = (int)reader["Id"];
                    page.Path = (string)reader["Path"];
                    page.TemplateId = (int)reader["TemplateId"];
                    page.ValuesJSON = new JRaw((string)reader["ValuesJSON"]);
                    page.IsPublic = (bool)reader["IsPublic"];
                    page.Name = (string)reader["Name"];
                    page.HideNavBars = (bool)reader["HideNavBars"];
                    results.Add(page);
                });
            return results;
        }

        public CMSPage GetPageById(int id)
        {
            CMSPage page = null;
            dataProvider.ExecuteCmd(
                "CMSPages_GetById",
                inputParamMapper: (parameters) =>
                {
                    parameters.AddWithValue("@Id", id);
                },
                singleRecordMapper: (reader, resultSetNumber) =>
                {
                    page = new CMSPage();
                    page.Path = (string)reader["Path"];
                    page.TemplateId = (int)reader["TemplateId"];
                    page.ValuesJSON = new JRaw((string)reader["ValuesJSON"]);
                    page.IsPublic = (bool)reader["IsPublic"];
                    page.HideNavBars = (bool)reader["HideNavBars"];
                    page.Name = (string)reader["Name"];
                });
            return page;
        }

        public int CreatePage(CMSPageCreateRequest req)
        {
            int newId = 0;
            dataProvider.ExecuteNonQuery(
                "CMSPages_Create",
                inputParamMapper: (parameters) =>
                {
                    parameters.AddWithValue("@Path", req.Path);
                    parameters.AddWithValue("@TemplateId", req.TemplateId);
                    parameters.AddWithValue("@ValuesJSON", req.ValuesJSON.ToString());
                    parameters.AddWithValue("@IsPublic", req.IsPublic);
                    parameters.AddWithValue("@HideNavBars", req.HideNavBars);
                    parameters.AddWithValue("@Name", req.Name);
                    parameters.Add("@Id", SqlDbType.Int).Direction = ParameterDirection.Output;
                },
                returnParameters: (parameters) =>
                {
                    newId = (int)parameters["@Id"].Value;
                });
            return newId;
        }

        public void UpdatePage(CMSPageUpdateRequest req)
        {
            dataProvider.ExecuteNonQuery(
                "CMSPages_Update",
                inputParamMapper: (parameters) =>
                {
                    parameters.AddWithValue("@Path", req.Path);
                    parameters.AddWithValue("@TemplateId", req.TemplateId);
                    parameters.AddWithValue("@ValuesJSON", req.ValuesJSON.ToString());
                    parameters.AddWithValue("@IsPublic", req.IsPublic);
                    parameters.AddWithValue("@HideNavBars", req.HideNavBars);
                    parameters.AddWithValue("@Name", req.Name);
                    parameters.AddWithValue("@Id", req.Id);
                });
        }

        public void DeletePage(int id)
        {
            dataProvider.ExecuteNonQuery(
                "CMSPages_Delete",
                inputParamMapper: (parameters) =>
                {
                    parameters.AddWithValue("@Id", id);
                });
        }
    }
}
