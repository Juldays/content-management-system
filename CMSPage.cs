using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Domain
{
    public class CMSPage
    {
        public int Id { get; set; }
        public string Path { get; set; }
        public int TemplateId { get; set; }
        public JRaw ValuesJSON { get; set; }
        public bool IsPublic { get; set; }
        public bool HideNavBars { get; set; }
        public string Name { get; set; }
    }
}
