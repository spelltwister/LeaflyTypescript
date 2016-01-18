using System;
using System.Threading.Tasks;

using LeaflyApi.Types;

namespace LeaflyApi.Web
{
    public class StrainApi : IStrainApi
    {
        private readonly HttpClientFactory factory;

        public StrainApi(string appKey, string appId) : this(new HttpClientFactory(appKey, appId)) { }

        public StrainApi(HttpClientFactory factory)
        {
            this.factory = factory;
        }

        public Task<StrainSearchResponse> Search(string searchTerm, string sort, OptionalStrainSearchFilters filters, int page = 0, int take = 10)
        {
            dynamic postObject = new
            {
                page = page,
                take = take
            };
            if (!String.IsNullOrWhiteSpace(searchTerm))
            {
                postObject.search = searchTerm;
            }
            if (!String.IsNullOrWhiteSpace(sort))
            {
                postObject.sort = sort;
            }

            bool anyFilters = false;
            dynamic filterSet = new { };
            if(filters.category != null && filters.category.Count > 0)
            {
                anyFilters = true;
                filterSet.category = filters.category;
            }
            if(filters.conditions != null && filters.conditions.Count > 0)
            {
                anyFilters = true;
                filterSet.conditions = filters.conditions;
            }
            if(filters.exclude != null && filters.exclude.Count > 0)
            {
                anyFilters = true;
                filterSet.exclude = filters.exclude;
            }
            if(filters.flavors != null && filters.flavors.Count > 0)
            {
                anyFilters = true;
                filterSet.flavors = filters.flavors;
            }
            if(filters.symptoms != null && filters.symptoms.Count > 0)
            {
                anyFilters = true;
                filterSet.symptoms = filters.symptoms;
            }
            if(filters.tags != null && filters.tags.Count > 0)
            {
                anyFilters = true;
                filterSet.tags = filters.tags;
            }
            if (anyFilters)
            {
                postObject.filters = filterSet;
            }
            return factory.PostStrainClientAndReadAsAsync(String.Empty, postObject);
        }

        public Task<StrainDetailsResponse> Details(string slug)
        {
            return factory.GetStrainClientAndReadAsAsync<StrainDetailsResponse>(slug);
        }

        public Task<StrainReviewsResponse> Reviews(string slug, int page = 0, int take = 10, string sort = "date")
        {
            return factory.GetStrainClientAndReadAsAsync<StrainReviewsResponse>($"{slug}/reviews?page={page}&take={take}&sort={sort}");
        }

        public Task<StrainReviewDetailsResponse> ReviewDetails(string slug, int reviewId)
        {
            return factory.GetStrainClientAndReadAsAsync<StrainReviewDetailsResponse>($"{slug}/reviews/{reviewId}");
        }

        public Task<StrainPicturesResponse> Pictures(string slug, int page = 0, int take = 10)
        {
            return factory.GetStrainClientAndReadAsAsync<StrainPicturesResponse>($"{slug}/photos?page={page}&take={take}");
        }

        public Task<StrainAvailabilityResponseListItem[]> Availability(string slug, double latitude, double longitude, double? radius, string productTypeFilter)
        {
            var reqString = $"{slug}/photos?lat={latitude}&lon={longitude}";
            if (radius.HasValue)
            {
                reqString += $"&radius={radius.Value}";
            }
            if (!String.IsNullOrWhiteSpace(productTypeFilter))
            {
                reqString += $"&filter={productTypeFilter}";
            }
            return factory.GetStrainClientAndReadAsAsync<StrainAvailabilityResponseListItem[]>(reqString);
        }
    }
}
