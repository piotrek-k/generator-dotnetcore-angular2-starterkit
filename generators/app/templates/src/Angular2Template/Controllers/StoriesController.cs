using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Angular2Template.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace Angular2Template.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class StoriesController : Controller
    {
        public static List<Story> STORIES = new List<Story>
            {
                new Story
                {
                    content = "Some really interesting story about dog",
                    timeOfAdding = new DateTime(2016, 8, 26),
                    numberOfViews = 11
                },
                new Story
                {
                    content = "Even cooler story about clown",
                    timeOfAdding = new DateTime(2016, 9, 26),
                    numberOfViews = 11
                },
                new Story
                {
                    content = "And some not cool story",
                    timeOfAdding = new DateTime(2016, 10, 26),
                    numberOfViews = 11
                }
            };
        // GET: api/stories
        [HttpGet]
        public IEnumerable<Story> Get()
        {
            return STORIES;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] Story data)
        {
            Story story = new Story
            {
                content = data.content,
                timeOfAdding = DateTime.Now,
                numberOfViews = 0
            };
            STORIES.Add(story);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
