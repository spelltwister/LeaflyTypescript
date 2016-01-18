using System;
using System.Threading.Tasks;
using System.Web.Http;

using Leafly.Types;

namespace LeaflyTest.Controllers
{
    internal static class LeaflyApiInstance
    {
        private static Lazy<Leafly.Web.Api> LeaflyApiProxy = new Lazy<Leafly.Web.Api>(() =>
            new Leafly.Web.Api(System.Configuration.ConfigurationManager.AppSettings.Get("leaflyAppKey"),
                                  System.Configuration.ConfigurationManager.AppSettings.Get("leaflyAppId")));

        public static Leafly.Web.LocationApi LocationApiProxy { get { return LeaflyApiProxy.Value.Locations; } }
        public static Leafly.Web.StrainApi StrainApiProxy { get { return LeaflyApiProxy.Value.Strains; } }
    }

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

    [RoutePrefix("api/leafly/strains")]
    public class LeaflyStrainProxyApiController : ApiController, IStrainApi
    {
        [HttpGet]
        [Route("availability/{slug}")]
        public Task<StrainAvailabilityResponseListItem[]> Availability(string slug, [FromUri]double latitude, [FromUri]double longitude, [FromUri]double? radius, [FromUri]string productTypeFilter)
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
