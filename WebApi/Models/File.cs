using System;
using System.Collections.Generic;

namespace WebApi.Models
{
    public class File : Base
    {
        public string Name { get; set; }
        public long Size { get; set; }
        public DateTime LastReviewed { get; set; }
        public string Category { get; set; }
        public string Uri { get; set; }
    }
}
