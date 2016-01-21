using System;
using System.Threading.Tasks;
using System.Web.Http;

using Leafly.Types;

namespace LeaflyTest.Controllers
{
    [RoutePrefix("api/leafly/strains")]
    public class LeaflyStrainProxyApiController : ApiController, IStrainApi
    {
        [HttpGet]
        [Route("availability/{slug}")]
        public Task<StrainAvailabilityResponseListItem[]> Availability(string slug, [FromUri]double latitude, [FromUri]double longitude, [FromUri]double? radius = 20 , [FromUri]string productTypeFilter = "")
        {
            return LeaflyApiInstance.StrainApiProxy.Availability(slug, latitude, longitude, radius, productTypeFilter);
        }

        [HttpGet]
        [Route("details/{slug}")]
        public Task<StrainDetailsResponse> Details(string slug)
        {
            return LeaflyApiInstance.StrainApiProxy.Details(slug);
        }

        [HttpGet]
        [Route("photos/{slug}")]
        public Task<StrainPicturesResponse> Pictures(string slug, [FromUri]int page = 0, [FromUri]int take = 10)
        {
            return LeaflyApiInstance.StrainApiProxy.Pictures(slug, page, take);
        }

        [HttpGet]
        [Route("details/{slug}/{reviewId:int}")]
        public Task<StrainReviewDetailsResponse> ReviewDetails(string slug, int reviewId)
        {
            return LeaflyApiInstance.StrainApiProxy.ReviewDetails(slug, reviewId);
        }

        [HttpGet]
        [Route("reviews/{slug}")]
        public Task<StrainReviewsResponse> Reviews(string slug, [FromUri]int page = 0, [FromUri]int take = 10, [FromUri]string sort = "rating")
        {
            return LeaflyApiInstance.StrainApiProxy.Reviews(slug, page, take, sort);
        }

        [HttpPost]
        [Route("search")]
        public Task<StrainSearchResponse> Search(string searchTerm, string sort, OptionalStrainSearchFilters filters, int page = 0, int take = 10)
        {
            throw new NotImplementedException();
        }
    }
}
