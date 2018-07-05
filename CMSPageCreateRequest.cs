using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Requests
{
    public class CMSPageCreateRequest
    {
        [Required]
        [MaxLength(50)]
        public string Path { get; set; }

        [Required]
        public int TemplateId { get; set; }

        [Required]
        public JRaw ValuesJSON { get; set; }

        [Required]
        public bool IsPublic { get; set; }

        [Required]
        public bool HideNavBars { get; set; }
     
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
    }
}
