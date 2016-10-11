using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace <%=newAppName%>.Models
{
    public class Story
    {
        public int StoryId { get; set; }
        public string content { get; set; }
        public DateTime timeOfAdding { get; set; }
        public int numberOfViews { get; set; }
    }
}
