using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaflyApi.Types
{
    public class Position
    {
        public double latitude { get; set; }
        public double longitude { get; set; }
    }

    public class PagingContext
    {
        public int PageCount { get; set; }
        public int TotalItemCount { get; set; }
        public int PageIndex { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public bool HasPreviousPage { get; set; }
        public bool HasNextPage { get; set; }
        public bool IsFirstPage { get; set; }
        public bool IsLastPage { get; set; }
    }

    public class OptionalLocationSearchFilters
    {
        public bool? storefront { get; set; }
        public bool? delivery { get; set; }
        public bool? retail { get; set; }
        public bool? medical { get; set; }
        public bool? creditcards { get; set; }
        public bool? hasclones { get; set; }
        public bool? hasconcentrates { get; set; }
        public bool? hasedibles { get; set; }
        public bool? veterandiscount { get; set; }

        public ICollection<int> strainIds { get; set; }
    }

    public class StoreListSpecialListItem
    {
        int id { get; set; }
        string title { get; set; }
        string details { get; set; }
        string finePrint { get; set; }
        string permalink { get; set; }
    }

    public class StoreListItem
    {
        public int id { get; set; }
        public string name { get; set; }
        public string slug { get; set; }
        public string hours { get; set; }
        public string phone { get; set; }
        public string address { get; set; }
        public string locationLabel { get; set; }
        public bool delivery { get; set; }
        public bool storefront { get; set; }
        public DateTime lastMenuUpdate { get; set; }
        public double latitude { get; set; }
        public double longitude { get; set; }
        public double rating { get; set; }
        public int numReviews { get; set; }
        public bool sponsor { get; set; }
        public bool ada { get; set; }
        public bool creditCards { get; set; }
        public bool atm { get; set; }
        public bool marquee { get; set; }
        public string coverPhoto { get; set; }
        public int logoId { get; set; }
        public string logo { get; set; }
        public bool medical { get; set; }
        public bool retail { get; set; }
        public bool price1 { get; set; }
        public bool price2 { get; set; }
        public bool price3 { get; set; }
        public int mapMarkerLevel { get; set; }
        public bool canadaLP { get; set; }
        public string tagLine { get; set; }
        public string permalink { get; set; }
        public string starImage { get; set; }
        public string customMarker { get; set; }
        public string customMarker2x { get; set; }
        public string mapMarker { get; set; }
        public ICollection<StoreListSpecialListItem> specials { get; set; }
    }

    public class LocationSearchResponse
    {
        public ICollection<StoreListItem> stores { get; set; }
        public PagingContext pagingContext { get; set; }
        //public object facets { get; set; }
    }

    public class LocationSpecialsListItem {
        public string details { get; set; }
        public string finePrint { get; set; }
        public string permalink { get; set; }
        public string title { get; set; }
    }

    public class SpecialListItem
    {
        public string title { get; set; }
        public string details { get; set; }
        public string finePrint { get; set; }
    }

    public class RecentReviewsListItem {
        public string username { get; set; }
        public string starImage { get; set; }
        public string comments { get; set; }
    }

    public class LocationDetailsResponse
    {
        public int id { get; set; }
        public string slug { get; set; }
        public string name { get; set; }
        public bool atm { get; set; }
        public bool creditCards { get; set; }
        public bool veteranDiscount { get; set; }
        public bool ada { get; set; }
        public bool isInfoOnlyListing { get; set; }
        public bool delivery { get; set; }
        public bool retail { get; set; }
        public bool medical { get; set; }
        public bool storefront { get; set; }
        public bool specials { get; set; }
        public int specialsCount { get; set; }
        public string logo { get; set; }
        public string address1 { get; set; }
        public string address2 { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string zip { get; set; }
        public string phone { get; set; }
        public bool validPhone { get; set; }
        public bool approved { get; set; }
        public string hours { get; set; }
        public string website { get; set; }
        public string blurb { get; set; }
        public DateTime lastMenuUpdate { get; set; }
        public int rating { get; set; }
        public int meds { get; set; }
        public double service { get; set; }
        public double atmosphere { get; set; }
        public int followerCount { get; set; }
        public int reviewCount { get; set; }
        public double latitude { get; set; }
        public double longitude { get; set; }
        public ICollection<string> photos { get; set; }
        public int photoCount { get; set; }
        public string permalink { get; set; }
        public bool menu { get; set; }
        public bool preOrderEnabled { get; set; }
        public bool canadaLP { get; set; }
        public string coverPhoto { get; set; }
        public string tagLine { get; set; }
        public string tagLineBlurb { get; set; }
        public string facebookUrl { get; set; }
        public string twitterUrl { get; set; }
        public string googlePlusUrl { get; set; }
        public string pinterestUrl { get; set; }
        public string tumblrUrl { get; set; }
        public string instagramUrl { get; set; }
        public string starImage { get; set; }
        public ICollection<SpecialListItem> specialsList { get; set; }
        public ICollection<RecentReviewsListItem> recentReviews { get; set; }
        //public ICollection<object> updates{get;set;}
        public int updateCount { get; set; }
    }

    public class LocationMenuPricingListItem {
        public decimal Price { get; set; }
        public string Unit { get; set; }
    }

    public class LocationMenuListItem
    {
        public DateTime addedOn { get; set; }
        public string description { get; set; }
        public string imagePath { get; set; }
        public string name { get; set; }
        public bool preOrderEnabled { get; set; }
        public ICollection<LocationMenuPricingListItem> pricing { get; set; }
        public string type { get; set; }
    }

    public class LocationReviewsListItem {
        public double atmosphere { get; set; }
        public string avatar { get; set; }
        public string comments { get; set; }
        public DateTime date { get; set; }
        public double easeOfRegistration { get; set; }
        public bool firstVisit { get; set; }
        public int id { get; set; }
        public double meds { get; set; }
        public string overallRating { get; set; } // TODO: why string
        public double packagingQuality { get; set; }
        public double service { get; set; }
        public bool shopAgain { get; set; }
        public string starImage { get; set; }
        public string username { get; set; }
        public bool wouldRecommend { get; set; }
    }

    public class LocationReviewsResponse
    {
        public PagingContext pagingContext { get; set; }
        public ICollection<LocationReviewsListItem> reviews { get; set; }
    }

    public interface ILocationApi
    {
        Task<LocationSearchResponse> Search(Position position, int page = 0, int take = 10);
        Task<LocationDetailsResponse> Details(string slug);
        Task<LocationMenuListItem[]> Menu(string slug);
        Task<LocationReviewsResponse> Reviews(string slug, int skip = 0, int take = 10);
        Task<LocationSpecialsListItem[]> Specials(string slug);
    }
}
