﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class CMSTemplate
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string TemplateHtml { get; set; }
    }
}
