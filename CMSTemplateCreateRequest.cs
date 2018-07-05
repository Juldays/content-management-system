﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class CMSTemplateCreateRequest
    {
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        public string TemplateHtml { get; set; }
    }
}
