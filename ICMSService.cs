using Models.Domain;
using Models.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface ICMSService
    {
        List<CMSTemplate> GetAll();
        CMSTemplate GetById(int id);
        int Create(CMSTemplateCreateRequest req);
        void Update(CMSTemplateUpdateRequest req);
        void Delete(int id);
        List<CMSPage> GetAllPages();
        CMSPage GetPageById(int id);
        int CreatePage(CMSPageCreateRequest req);
        void UpdatePage(CMSPageUpdateRequest req);
        void DeletePage(int id);
    }
}
