using System;
using System.Threading.Tasks;

using LeaflyApi.Types;

namespace LeaflyApi.Web
{
    public class LocationApi : ILocationApi
    {
        private readonly HttpClientFactory factory;

        public LocationApi(string appKey, string appId) : this(new HttpClientFactory(appKey, appId)) { }

        public LocationApi(HttpClientFactory factory)
        {
            this.factory = factory;
        }

        public Task<LocationDetailsResponse> Details(string slug)
        {
            return factory.GetLocationClientAndReadAsAsync<LocationDetailsResponse>(slug);
        }

        public Task<LocationMenuListItem[]> Menu(string slug)
        {
            return factory.GetLocationClientAndReadAsAsync<LocationMenuListItem[]>($"{slug}/menu");
        }

        public Task<LocationReviewsResponse> Reviews(string slug, int skip = 0, int take = 10)
        {
            return factory.GetLocationClientAndReadAsAsync<LocationReviewsResponse>($"{slug}/reviews?skip={skip}&take={take}");
        }

        public Task<LocationSearchResponse> Search(Position position, OptionalLocationSearchFilters filters, int page = 0, int take = 10)
        {
            dynamic postObject = new
            {
                page = page,
                take = take,
                latitude = position.latitude,
                longitude = position.longitude
            };

            if (filters.creditcards.HasValue)
            {
                postObject.creditcards = filters.creditcards.Value;
            }

            if (filters.delivery.HasValue)
            {
                postObject.delivery = filters.delivery.Value;
            }

            if (filters.hasclones.HasValue)
            {
                postObject.hasclones = filters.hasclones.Value;
            }

            if (filters.hasconcentrates.HasValue)
            {
                postObject.hasconcentrates = filters.hasconcentrates.Value;
            }

            if (filters.hasedibles.HasValue)
            {
                postObject.hasedibles = filters.hasedibles.Value;
            }

            if (filters.medical.HasValue)
            {
                postObject.medical = filters.medical.Value;
            }

            if (filters.retail.HasValue)
            {
                postObject.retail = filters.retail.Value;
            }

            if (filters.storefront.HasValue)
            {
                postObject.storefront = filters.storefront.Value;
            }

            if (filters.strainIds != null && filters.strainIds.Count > 0)
            {
                postObject.strainIds = filters.strainIds;
            }

            if (filters.veterandiscount.HasValue)
            {
                postObject.veterandiscount = filters.veterandiscount.Value;
            }

            return factory.PostLocationClientAndReadAsAsync(String.Empty, postObject);
        }

        public Task<LocationSpecialsListItem[]> Specials(string slug)
        {
            return factory.GetLocationClientAndReadAsAsync<LocationSpecialsListItem[]>($"{slug}/specials");
        }
    }
}
