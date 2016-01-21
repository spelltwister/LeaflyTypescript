using System;
using System.Threading.Tasks;
using System.Web.Http;
using Leafly.Types;

namespace LeaflyTest.Controllers
{
    [RoutePrefix("api/leafly/locations")]
    public class LeaflyLocationProxyApiController : ApiController, Leafly.Types.ILocationApi
    {
        [HttpGet]
        [Route("details/{slug}")]
        public Task<LocationDetailsResponse> Details(string slug)
        {
            return LeaflyApiInstance.LocationApiProxy.Details(slug);
        }

        [HttpGet]
        [Route("menu/{slug}")]
        public Task<LocationMenuListItem[]> Menu(string slug)
        {
            return LeaflyApiInstance.LocationApiProxy.Menu(slug);
        }

        [HttpGet]
        [Route("reviews/{slug}")]
        public Task<LocationReviewsResponse> Reviews(string slug, [FromUri]int skip = 0, [FromUri]int take = 10)
        {
            return LeaflyApiInstance.LocationApiProxy.Reviews(slug, skip, take);
        }

        [HttpPost]
        [Route("search")]
        public Task<LocationSearchResponse> Search(Position position, OptionalLocationSearchFilters filters, int page = 0, int take = 10)
        {
            throw new NotImplementedException();
        }

        [HttpGet]
        [Route("specials/{slug}")]
        public Task<LocationSpecialsListItem[]> Specials(string slug)
        {
            return LeaflyApiInstance.LocationApiProxy.Specials(slug);
        }
    }
}