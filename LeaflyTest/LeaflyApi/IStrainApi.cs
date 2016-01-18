using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeaflyApi.Types
{
    public class OptionalStrainSearchFilters
    {
        /// <summary>
        /// List of effects to exclude(eg, "dry-mouth")
        /// </summary>
        public ICollection<string> exclude { get; set; }

        /// <summary>
        /// List of flavors to include
        /// </summary>
        public ICollection<string> flavors { get; set; }

        /// <summary>
        /// Strain types to include
        /// </summary>
        public ICollection<string> category { get; set; }

        /// <summary>
        /// Medical conditions to include
        /// </summary>
        public ICollection<string> conditions { get; set; }

        /// <summary>
        /// General effect tags to include
        /// </summary>
        public ICollection<string> tags { get; set; }

        /// <summary>
        /// Specific symptoms to include
        /// </summary>
        public ICollection<string> symptoms { get; set; }
    }

    public class FacetsListItem
    {
        public string Label { get; set; }
        public string DisplayLabel { get; set; }
        public int Hits { get; set; }
        public string TagId { get; set; }
        public string Category { get; set; }
        public bool Selected { get; set; }
        public bool NoFollow { get; set; }
    }

    public abstract class StrainSearchListItemBase
    {
        public int Id { get; set; }
        public string Category { get; set; }
        public string Name { get; set; }
        public bool Active { get; set; }
        public string DisplayLabel { get; set; }
    }
    public class TagListItem : StrainSearchListItemBase { }
    public class NegativeEffectsListItem : StrainSearchListItemBase { }
    public class FlavorListItem : StrainSearchListItemBase { }
    public class SymptomsListItem : StrainSearchListItemBase { }
    public class ConditionsListItem : StrainSearchListItemBase { }

    public class StrainListItem
    {
        public int Id { get; set; }
        public string UrlName { get; set; }
        public string Name { get; set; }
        public string Category { get; set; } // strain type
        public string DisplayCategory { get; set; }
        public string Symbol { get; set; } // periodic table abbreviation
        public int RatingCount { get; set; }
        public int ReviewCount { get; set; }
        public double Rating { get; set; }
        public string StarImage { get; set; }
        public ICollection<TagListItem> Tags { get; set; }
        public ICollection<NegativeEffectsListItem> NegativeEffects { get; set; }
        public ICollection<FlavorListItem> Flavors { get; set; }
        public ICollection<SymptomsListItem> Symptoms { get; set; }
        public ICollection<ConditionsListItem> Conditions { get; set; }
        public string permalink { get; set; }
        public string SortName { get; set; }
        public ICollection<string> LogTags { get; set; }
    }

    public class SortsSearchResultsListItem
    {
        public string Label { get; set; }
        public string DisplayLabel { get; set; }
        public int Hits { get; set; }
        public string Url { get; set; }
        public string TagId { get; set; }
        public string Category { get; set; }
        public bool Selected { get; set; }
        public bool NoFollow { get; set; }
    }

    public class StrainSearchResponse
    {
        public ICollection<FacetsListItem> Facets { get; set; }
        public bool LocationFilter { get; set; }
        public string LocationUrl { get; set; }
        public PagingContext PagingContext { get; set; }
        public ICollection<SortsSearchResultsListItem> Sorts { get; set; }
        public ICollection<StrainListItem> Strains { get; set; }
    };

    public class StrainDetailsArticleListItem
    {
        public string author { get; set; }
        public string category { get; set; }
        public DateTime date { get; set; }
        public string id { get; set; }
        public string text { get; set; }
        public string thumbnail { get; set; }
        public string urlslug { get; set; }
    }

    public class StrainDetailsListItemBase {
        public string name { get; set; }
        public double score { get; set; }
    };

    public class StrainDetailsConditionsListItem : StrainDetailsListItemBase { }

    public class StrainDetailsEffectsListItem : StrainDetailsListItemBase{}
    public class StrainDetailsFlavorsListItem : StrainDetailsListItemBase{}
    public class StrainDetailsNegativesListItem : StrainDetailsListItemBase{}

    public class StrainDetailsGrowInfo {
        public string averageYield { get; set; }
        public string difficulty { get; set; }
        public string environment { get; set; }
        public int floweringDays { get; set; }
        public string growNotes { get; set; }
        public string height { get; set; }
        public string outdoorFinish { get; set; }
        public string preferredMedium { get; set; }
    }

    public class StrainDetailsHighlightedReviewListItem {
        public string avatar { get; set; }
        public int id { get; set; }
        public string starImage { get; set; }
        public string text { get; set; }
        public string username { get; set; }
    }

    public class StrainDetailsParentsListItem {
        public string applink { get; set; }
        public string category { get; set; }
        public string name { get; set; }
        public string permalink { get; set; }
        public string slug { get; set; }
        public string symbol { get; set; }
    }

    public class StrainDetailsPhotosListItem {
        public string fullsize { get; set; }
        public string thumb { get; set; }
        public string uploaded { get; set; }
    }

    public class StrainDetailsRelatedStrainsListItem {};

    public class StrainDetailsSymptomsListItem : StrainDetailsListItemBase{}

    public class StrainDetailsResponse {
        public string aka{get;set;}
        public int articleTotalCount{get;set;}
        public ICollection<StrainDetailsArticleListItem> articles { get; set; }
        public bool articlesAvailable{get;set;}
        public string category{get;set;}
        public ICollection<StrainDetailsConditionsListItem> conditions { get; set; }
        public string description{get;set;}
        public string descriptionPlain{get;set;}
        public ICollection<StrainDetailsEffectsListItem> effects { get; set; }
        public ICollection<StrainDetailsFlavorsListItem> flavors { get; set; }
        public ICollection<StrainDetailsHighlightedReviewListItem> highlightedReviews { get; set; }
        public int id{get;set;}
        public string name{get;set;}
        public ICollection<StrainDetailsNegativesListItem> negatives { get; set; }
        public ICollection<StrainDetailsParentsListItem> parents { get; set; }
        public string permalink{get;set;}
        public int photoTotalCount{get;set;}
        public ICollection<StrainDetailsPhotosListItem> photos { get; set; }
        public ICollection<string> popularCities { get; set; }
        public double rating{get;set;}
        public ICollection<StrainDetailsRelatedStrainsListItem> relatedStrains { get; set; }
        public int reviewCount{get;set;}
        public string slug{get;set;}
        public string starImage{get;set;}
        public string symbol{get;set;}
        public ICollection<StrainDetailsSymptomsListItem> symptoms { get; set; }
        public string testGraph{get;set;}
        public string videoUrl{get;set;}
        public string weakDescription{get;set;}
    };

    public class StrainReviewsReviewListItem {
        public string avatar{get;set;}
        public DateTime dateAdded{get;set;}
        public int id{get;set;}
        public string locationName{get;set;}
        public string locationSlug{get;set;}
        public double rating{get;set;}
        public string starImage{get;set;}
        public string text{get;set;}
        public string username{get;set;}
    };

    public class StrainReviewsResponse {
        public PagingContext pagingContext { get; set; }
        public ICollection<StrainReviewsReviewListItem> reviews { get; set; }
    }

    public class StrainReviewDetailsResponse
    {
        public string avatar { get; set; }
        public DateTime dateAdded { get; set; }
        //public ICollection<object> effects { get; set; }
        public ICollection<string> flavors { get; set; }
        public double form { get; set; }
        public int id { get; set; }
        public double locationLat { get; set; }
        public string locationLogo { get; set; }
        public double locationLon { get; set; }
        public string locationName { get; set; }
        public double locationRating { get; set; }
        public int locationReviewCount { get; set; }
        public string locationSlug { get; set; }
        public string locationStars { get; set; }
        public string locationTag { get; set; }
        public int method { get; set; }
        //public ICollection<object> negatives { get; set; }
        public string notes { get; set; }
        public string permalink { get; set; }
        public string photo { get; set; }
        public double rating { get; set; }
        public string starImage { get; set; }
        public string strainCategory { get; set; }
        public int strainId { get; set; }
        public string strainName { get; set; }
        public string strainSlug { get; set; }
        public string strainSymbol { get; set; }
        //public ICollection<object> symptoms { get; set; }
        public int userId { get; set; }
        public string username { get; set; }
    }

    public class StrainPicturesPictureListItem
    {
        public string caption { get; set; }
        public string fullSize { get; set; }
        public int reviewId { get; set; }
        public string thumb { get; set; }
        public string username { get; set; }
    }

    public class StrainPicturesResponse
    {
        public PagingContext pagingContext { get; set; }
        public ICollection<StrainPicturesPictureListItem> photos { get; set; }
    }

    public class StrainAvailabilityResponseListItem
    {
        public bool ada { get; set; }
        public bool atm { get; set; }
        public bool creditCard { get; set; }
        public bool delivery { get; set; }
        public double displayLevel { get; set; }
        public string locationLabel { get; set; }
        public string logoPath { get; set; }
        public string name { get; set; }
        public int numReviews { get; set; }
        public string permalink { get; set; }
        public double rating { get; set; }
        public string slug { get; set; }
        public string starImage { get; set; }
        public string storeFront { get; set; }
        public string tagLine { get; set; }
    }

    public interface IStrainApi
    {
        Task<StrainSearchResponse> Search(string searchTerm, string sort, OptionalStrainSearchFilters filters, int page = 0, int take = 10);
        Task<StrainDetailsResponse> Details(string slug);
        Task<StrainReviewsResponse> Reviews(string slug, int page = 0, int take = 10, string sort = "rating");
        Task<StrainReviewDetailsResponse> ReviewDetails(string slug, int reviewId);
        Task<StrainPicturesResponse> Pictures(string slug, int page = 0, int take = 10);
        Task<StrainAvailabilityResponseListItem[]> Availability(string slug, double latitude, double longitude, double? radius, string productTypeFilter);
    }
}
