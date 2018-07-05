using Newtonsoft.Json.Linq;
using Models.Domain;
using Models.Requests;
using Models.Responses;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Web.Controllers.Api
{
    public class CMSController : ApiController
    {
        readonly ICMSService cmsService;
        public CMSController(ICMSService cmsService)
        {
            this.cmsService = cmsService;
        }

        [Route("api/cms/templates"), HttpGet]
        public HttpResponseMessage GetAll()
        {
            List<CMSTemplate> templates = cmsService.GetAll();
            ItemsResponse<CMSTemplate> itemsResponse = new ItemsResponse<CMSTemplate>();
            itemsResponse.Items = templates;
            return Request.CreateResponse(HttpStatusCode.OK, itemsResponse);
        }

        [Route("api/cms/templates/{id:int}"), HttpGet]
        public HttpResponseMessage GetById(int id)
        {
            CMSTemplate template = cmsService.GetById(id);
            ItemResponse<CMSTemplate> itemResponse = new ItemResponse<CMSTemplate>();
            itemResponse.Item = template;
            return Request.CreateResponse(HttpStatusCode.OK, itemResponse);
        }

        [Route("api/cms/templates"), HttpPost]
        public HttpResponseMessage Create(CMSTemplateCreateRequest req)
        {
            if (req == null)
            {
                ModelState.AddModelError("", "You did not add any body data");
            }
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            int id = cmsService.Create(req);
            ItemResponse<int> itemResponse = new ItemResponse<int>();
            itemResponse.Item = id;
            return Request.CreateResponse(HttpStatusCode.OK, itemResponse);
        }

        [Route("api/cms/templates/{id:int}"), HttpPut]
        public HttpResponseMessage Update(int id, CMSTemplateUpdateRequest req)
        {
            if (req == null)
            {
                ModelState.AddModelError("", "You did not add any body data");
            }
            if (req.Id != id)
            {
                ModelState.AddModelError("Id", "Id in the URL does not match the Id in the body");
            }
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            cmsService.Update(req);
            return Request.CreateResponse(HttpStatusCode.OK, new SuccessResponse());
        }

        [Route("api/cms/templates/{id:int}"), HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
            cmsService.Delete(id);
            return Request.CreateResponse(HttpStatusCode.OK, new SuccessResponse());
        }

        [Route("api/cms/pages"), HttpGet]
        public HttpResponseMessage GetAllPages()
        {
            List<CMSPage> pages = cmsService.GetAllPages();
            ItemsResponse<CMSPage> itemsResponse = new ItemsResponse<CMSPage>();
            itemsResponse.Items = pages;
            return Request.CreateResponse(HttpStatusCode.OK, itemsResponse);
        }

        [Route("api/cms/pages/{id:int}"), HttpGet]
        public HttpResponseMessage GetPageById(int id)
        {
            CMSPage page = cmsService.GetPageById(id);
            ItemResponse<CMSPage> itemResponse = new ItemResponse<CMSPage>();
            itemResponse.Item = page;
            return Request.CreateResponse(HttpStatusCode.OK, itemResponse);
        }

        [Route("api/cms/pages"), HttpPost]
        public HttpResponseMessage CreatePage(CMSPageCreateRequest req)
        {
            if (req == null)
            {
                ModelState.AddModelError("", "You did not add any body data");
            }
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            int id = cmsService.CreatePage(req);
            ItemResponse<int> itemResponse = new ItemResponse<int>();
            itemResponse.Item = id;
            return Request.CreateResponse(HttpStatusCode.OK, itemResponse);
        }

        [Route("api/cms/pages/{id:int}"), HttpPut]
        public HttpResponseMessage UpdatePage(int id, CMSPageUpdateRequest req)
        {
            if (req == null)
            {
                ModelState.AddModelError("", "You did not add any body data");
            }
            if (req.Id != id)
            {
                ModelState.AddModelError("Id", "Id in the URL does not match the Id in the body");
            }
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            cmsService.UpdatePage(req);
            return Request.CreateResponse(HttpStatusCode.OK, new SuccessResponse());
        }

        [Route("api/cms/pages/{id:int}"), HttpDelete]
        public HttpResponseMessage DeletePage(int id)
        {
            cmsService.DeletePage(id);
            return Request.CreateResponse(HttpStatusCode.OK, new SuccessResponse());
        }
    }
}
