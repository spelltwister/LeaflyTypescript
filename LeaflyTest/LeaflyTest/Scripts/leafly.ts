module Leafly {
    export class DataRequestBase {
        app_id: string;
        app_key: string;

        constructor(appId: string, appKey: string) {
            this.app_id = appId;
            this.app_key = appKey;
        }
    }

    export type OptionalStrainSearchFilters = {
        /**
         * List of effects to exclude (eg, "dry-mouth")
         */
        exclude?: string[];

        /**
         * List of flavors to include
         */
        flavors?: string[];

        /**
         * Strain types to include
         */
        category?: string[];

        /**
         * Medical conditions to include
         */
        conditions?: string[];

        /**
         * General effect tags to include
         */
        tags?: string[];

        /**
         * Specific symptoms to include
         */
        symptoms?: string[];
    }

    export class StrainSearchRequest extends DataRequestBase {
        page: number;
        take: number;

        sort: string;
        search: string;
        filters: OptionalStrainSearchFilters;

        constructor(appId: string, appKey: string, page: number, take: number, sort?: string, searchText?: string, filters?: OptionalStrainSearchFilters) {
            super(appId, appKey);

            this.page = page;
            this.take = take;

            this.sort = sort;
            this.search = searchText;
            this.filters = filters;
        }
    }

    export class StrainDetailsRequest extends DataRequestBase {
        slug: string;

        constructor(appid: string, appkey: string, slug: string) {
            super(appid, appkey);

            this.slug = slug;
        }
    }

    export class StrainReviewsRequest extends DataRequestBase {
        slug: string;

        page: number;
        take: number;
        sort: string;

        constructor(appId: string, appKey: string, slug: string, page?: number, take?: number, sort?: string) {
            super(appId, appKey);

            this.slug = slug;

            this.page = page;
            this.take = take;
            this.sort = sort;
        }
    }

    export class StrainReviewDetailsRequest extends DataRequestBase {
        slug: string;
        reviewId: number;

        constructor(appId: string, appKey: string, slug: string, reviewId: number) {
            super(appId, appKey);

            this.slug = slug;
            this.reviewId = reviewId;
        }
    }

    export class StrainPicturesRequest extends DataRequestBase {
        slug: string;
        page: number;
        take: number;

        constructor(appId: string, appKey: string, slug: string, page?: number, take?: number) {
            super(appId, appKey);

            this.slug = slug;

            this.page = page;
            this.take = take;
        }
    }

    export class StrainAvailabilityRequest extends DataRequestBase {
        slug: string;
        lat: number; // inconsistent with location search 'latitude'
        lon: number; // inconsistent with location search 'longitude'
        radius: number;
        filter: string; // product type (eg, flower, clone, concentrate, ... 

        constructor(appId: string, appKey: string, slug: string, latitude: number, longitude: number, radius: number, productTypeFilter: string) {
            super(appId, appKey);

            this.slug = slug;
            this.lat = latitude;
            this.lon = longitude;
            this.radius = radius;
            this.filter = productTypeFilter;
        }
    }

    export class OptionalLocationSearchFilters {
        storefront: boolean;
        delivery: boolean;
        retail: boolean;
        medical: boolean;
        creditcards: boolean;
        hasclones: boolean;
        hasconcentrates: boolean;
        hasedibles: boolean;
        veterandiscount: boolean;

        strainIds: number[];

        constructor(store?: boolean, delivery?: boolean, retail?: boolean, medical?: boolean, creditCards?: boolean,
            hasClones?: boolean, hasConcentrates?: boolean, hasEdibles?: boolean,
            veteranDiscount?: boolean, strainIds?: number[]) {
            if (store)
                this.storefront = store;

            if (delivery)
                this.delivery = delivery;

            if (retail)
                this.retail = retail;

            if (medical)
                this.medical = medical;

            if (creditCards)
                this.creditcards = creditCards;

            if (hasClones)
                this.hasclones = hasClones;

            if (hasConcentrates)
                this.hasconcentrates = hasConcentrates;

            if (hasEdibles)
                this.hasedibles = hasEdibles;

            if (veteranDiscount)
                this.veterandiscount = veteranDiscount;

            if (strainIds && strainIds.length)
                this.strainIds = strainIds;
        }
    }

    export type Position = { latitude: number; longitude: number };

    export class LocationSearchRequest extends DataRequestBase {
        page: number;
        take: number;

        position: Position;

        filters: OptionalLocationSearchFilters;

        constructor(appId: string, appKey: string, page: number, take: number, position: Position, filters?: OptionalLocationSearchFilters) {
            super(appId, appKey);

            this.page = page;
            this.take = take;

            this.position = position;

            this.filters = filters;
        }
    }

    export class LocationDetailsRequest extends DataRequestBase {
        slug: string;

        constructor(appId: string, appkey: string, slug: string) {
            super(appId, appkey);

            this.slug = slug;
        }
    };

    export class LocationMenuRequest extends DataRequestBase {
        slug: string;

        constructor(appId: string, appkey: string, slug: string) {
            super(appId, appkey);

            this.slug = slug;
        }
    };

    export class LocationReviewsRequest extends DataRequestBase {
        skip: number; // TODO: why not page :/
        take: number;

        slug: string;

        constructor(appId: string, appkey: string, slug: string, skip: number, take: number) {
            super(appId, appkey);

            this.skip = skip;
            this.take = take;

            this.slug = slug;
        }
    };

    export class LocationSpecialsRequest extends DataRequestBase {
        slug: string;

        constructor(appId: string, appkey: string, slug: string) {
            super(appId, appkey);

            this.slug = slug;
        }
    };

    interface ILeaflyRequestFormatter<T> {
        CanFormat(request: DataRequestBase): boolean;
        Format(request: DataRequestBase): T;
    }

    class AjaxBaseRequestFormatter {
        static Format(request: DataRequestBase): JQueryAjaxSettings {
            return {
                contentType: "application/json",
                dataType: "json",
                url: 'http://data.leafly.com/',
                headers: {
                    "app_id": request.app_id,
                    "app_key": request.app_key
                },
            };
        }
    }

    class StrainSearchRequestFormatter implements ILeaflyRequestFormatter<JQueryAjaxSettings> {
        static instance: StrainSearchRequestFormatter = new StrainSearchRequestFormatter();

        CanFormat(request: DataRequestBase): boolean {
            return request instanceof StrainSearchRequest;
        };
        Format(request: DataRequestBase): JQueryAjaxSettings {
            if (!this.CanFormat(request)) {
                throw 'Cannot format the supplied request object.';
            }

            var payload = AjaxBaseRequestFormatter.Format(request);

            payload.url += 'strains'
            payload['method'] = "POST";

            var searchRequest = <StrainSearchRequest>request;
            var dataObject = {
                page: searchRequest.page,
                take: searchRequest.take,
                sort: searchRequest.sort,
                search: searchRequest.search
            };
            
            // TODO: filters

            payload['data'] = JSON.stringify(dataObject);

            return <any>payload;
        }
    }

    class StrainDetailsRequestFormatter implements ILeaflyRequestFormatter<JQueryAjaxSettings> {
        static instance: StrainDetailsRequestFormatter = new StrainDetailsRequestFormatter();
        CanFormat(request: DataRequestBase): boolean {
            return request instanceof StrainDetailsRequest;
        };
        Format(request: DataRequestBase): JQueryAjaxSettings {
            if (!this.CanFormat(request)) {
                throw 'Cannot format the supplied request object.';
            }

            var detailsRequest = <StrainDetailsRequest>request;

            var payload = AjaxBaseRequestFormatter.Format(request);

            payload.url += 'strains/' + detailsRequest.slug;
            payload['method'] = "GET";

            return <any>payload;
        }
    }

    class StrainReviewsRequestFormatter implements ILeaflyRequestFormatter<JQueryAjaxSettings> {
        static instance: StrainReviewsRequestFormatter = new StrainReviewsRequestFormatter();
        CanFormat(request: DataRequestBase): boolean {
            return request instanceof StrainReviewsRequest;
        };
        Format(request: DataRequestBase): JQueryAjaxSettings {
            if (!this.CanFormat(request)) {
                throw 'Cannot format the supplied request object.';
            }

            var reviewsRequest = <StrainReviewsRequest>request;

            var payload = AjaxBaseRequestFormatter.Format(request);

            payload.url += 'strains/' + reviewsRequest.slug + '/reviews';
            payload.method = "GET";

            payload.data = {
                page: reviewsRequest.page,
                take: reviewsRequest.take,
                sort: reviewsRequest.sort
            };

            return <any>payload;
        }
    }

    class StrainReviewDetailsRequestFormatter implements ILeaflyRequestFormatter<JQueryAjaxSettings> {
        static instance: StrainReviewDetailsRequestFormatter = new StrainReviewDetailsRequestFormatter();
        CanFormat(request: DataRequestBase): boolean {
            return request instanceof StrainReviewDetailsRequest;
        };
        Format(request: DataRequestBase): JQueryAjaxSettings {
            if (!this.CanFormat(request)) {
                throw 'Cannot format the supplied request object.';
            }

            var reviewsRequest = <StrainReviewDetailsRequest>request;

            var payload = AjaxBaseRequestFormatter.Format(request);

            payload.url += 'strains/' + reviewsRequest.slug + '/reviews/' + reviewsRequest.reviewId;
            payload.method = "GET";

            return <any>payload;
        }
    }

    class StrainPicturesRequestFormatter implements ILeaflyRequestFormatter<JQueryAjaxSettings> {
        static instance: StrainPicturesRequestFormatter = new StrainPicturesRequestFormatter();
        CanFormat(request: DataRequestBase): boolean {
            return request instanceof StrainPicturesRequest;
        };
        Format(request: DataRequestBase): JQueryAjaxSettings {
            if (!this.CanFormat(request)) {
                throw 'Cannot format the supplied request object.';
            }

            var picturesRequest = <StrainPicturesRequest>request;

            var payload = AjaxBaseRequestFormatter.Format(request);

            payload.url += 'strains/' + picturesRequest.slug + '/photos';
            payload.method = "GET";

            payload.data = {
                page: picturesRequest.page,
                take: picturesRequest.take
            };

            return <any>payload;
        }
    }

    class StrainAvailabilityRequestFormatter implements ILeaflyRequestFormatter<JQueryAjaxSettings> {
        static instance: StrainAvailabilityRequestFormatter = new StrainAvailabilityRequestFormatter();
        CanFormat(request: DataRequestBase): boolean {
            return request instanceof StrainAvailabilityRequest;
        };
        Format(request: DataRequestBase): JQueryAjaxSettings {
            if (!this.CanFormat(request)) {
                throw 'Cannot format the supplied request object.';
            }

            var availabilityRequest = <StrainAvailabilityRequest>request;

            var payload = AjaxBaseRequestFormatter.Format(request);

            payload.url += 'strains/' + availabilityRequest.slug + '/availability';
            payload.method = "GET";

            payload.data = {
                lat: availabilityRequest.lat,
                lon: availabilityRequest.lon,
                radius: availabilityRequest.radius,
                filter: availabilityRequest.filter
            };

            return <any>payload;
        }
    }

    class LocationSearchRequestFormatter implements ILeaflyRequestFormatter<JQueryAjaxSettings> {
        static instance: LocationSearchRequestFormatter = new LocationSearchRequestFormatter();

        CanFormat(request: DataRequestBase): boolean {
            return request instanceof LocationSearchRequest;
        };
        Format(request: DataRequestBase): JQueryAjaxSettings {
            if (!this.CanFormat(request)) {
                throw 'Cannot format the supplied request object.';
            }

            var payload = AjaxBaseRequestFormatter.Format(request);

            payload.url += 'locations';
            payload['method'] = "POST";

            var searchRequest = <LocationSearchRequest>request;
            var dataObject = {
                page: searchRequest.page,
                take: searchRequest.take,
                latitude: searchRequest.position.latitude,
                longitude: searchRequest.position.longitude
            };

            for (var k in searchRequest.filters) { // TODO: inconsistent with strain api where filters are in a filter object
                dataObject[k] = searchRequest.filters[k];
            }

            payload['data'] = JSON.stringify(dataObject);

            return <any>payload;
        }
    }

    class LocationDetailsRequestFormatter implements ILeaflyRequestFormatter<JQueryAjaxSettings> {
        static instance: LocationDetailsRequestFormatter = new LocationDetailsRequestFormatter();
        CanFormat(request: DataRequestBase): boolean {
            return request instanceof LocationDetailsRequest;
        };
        Format(request: DataRequestBase): JQueryAjaxSettings {
            if (!this.CanFormat(request)) {
                throw 'Cannot format the supplied request object.';
            }

            var detailsRequest = <LocationDetailsRequest>request;

            var payload = AjaxBaseRequestFormatter.Format(request);

            payload.url += 'locations/' + detailsRequest.slug;
            payload['method'] = "GET";

            return <any>payload;
        }
    }

    class LocationMenuRequestFormatter implements ILeaflyRequestFormatter<JQueryAjaxSettings> {
        static instance: LocationMenuRequestFormatter = new LocationMenuRequestFormatter();
        CanFormat(request: DataRequestBase): boolean {
            return request instanceof LocationMenuRequest;
        };
        Format(request: DataRequestBase): JQueryAjaxSettings {
            if (!this.CanFormat(request)) {
                throw 'Cannot format the supplied request object.';
            }

            var detailsRequest = <LocationMenuRequest>request;

            var payload = AjaxBaseRequestFormatter.Format(request);

            payload.url += 'locations/' + detailsRequest.slug + '/menu';
            payload['method'] = "GET";

            return <any>payload;
        }
    }

    class LocationReviewsRequestFormatter implements ILeaflyRequestFormatter<JQueryAjaxSettings> {
        static instance: LocationReviewsRequestFormatter = new LocationReviewsRequestFormatter();
        CanFormat(request: DataRequestBase): boolean {
            return request instanceof LocationReviewsRequest;
        };
        Format(request: DataRequestBase): JQueryAjaxSettings {
            if (!this.CanFormat(request)) {
                throw 'Cannot format the supplied request object.';
            }

            var detailsRequest = <LocationReviewsRequest>request;

            var payload = AjaxBaseRequestFormatter.Format(request);

            payload.url += 'locations/' + detailsRequest.slug + '/reviews';
            payload['method'] = "GET";

            payload.data = {
                skip: detailsRequest.skip,
                take: detailsRequest.take
            };

            return <any>payload;
        }
    }

    class LocationSpecialsRequestFormatter implements ILeaflyRequestFormatter<JQueryAjaxSettings> {
        static instance: LocationSpecialsRequestFormatter = new LocationSpecialsRequestFormatter();
        CanFormat(request: DataRequestBase): boolean {
            return request instanceof LocationSpecialsRequest;
        };
        Format(request: DataRequestBase): JQueryAjaxSettings {
            if (!this.CanFormat(request)) {
                throw 'Cannot format the supplied request object.';
            }

            var detailsRequest = <LocationSpecialsRequest>request;

            var payload = AjaxBaseRequestFormatter.Format(request);

            payload.url += 'locations/' + detailsRequest.slug + '/specials';
            payload['method'] = "GET";

            return <any>payload;
        }
    }

    export class StrainApi {

        private factory: RequestFactory;

        constructor(factory: RequestFactory) {
            this.factory = factory;
        }

        Search(searchTerm?: string, sort?: string, filters?: OptionalStrainSearchFilters, page?: number, take?: number): JQueryPromise<StrainSearchResponse> {
            return $.ajax(StrainSearchRequestFormatter.instance.Format(this.factory.StrainSearchRequest(searchTerm, sort, filters, page, take)));
        }

        Details(slug: string): JQueryPromise<StrainDetailsResponse> {
            return $.ajax(StrainDetailsRequestFormatter.instance.Format(this.factory.StrainDetailsRequest(slug)));
        }

        Reviews(slug: string, page?: number, take?: number, sort?: string): JQueryPromise<StrainReviewsResponse> {
            return $.ajax(StrainReviewsRequestFormatter.instance.Format(this.factory.StrainReviewsRequest(slug, page, take, sort)));
        }

        ReviewDetails(slug: string, reviewId: number): JQueryPromise<StrainReviewDetailsResponse> {
            return $.ajax(StrainReviewDetailsRequestFormatter.instance.Format(this.factory.StrainReviewDetailsRequest(slug, reviewId)));
        }

        Pictures(slug: string, page?: number, take?: number): JQueryPromise<StrainPicturesResponse> {
            return $.ajax(StrainPicturesRequestFormatter.instance.Format(this.factory.StrainPicturesRequest(slug, page, take)));
        }

        Availability(slug: string, latitude: number, longitude: number, radius?: number, productTypeFilter?: string): JQueryPromise<StrainAvailabilityResponse> {
            return $.ajax(StrainAvailabilityRequestFormatter.instance.Format(this.factory.StrainAvailabilityRequest(slug, latitude, longitude, radius, productTypeFilter)));
        }

        AvailableNearUser(slug: string, radius?: number, productTypeFilter?: string): JQueryPromise<StrainAvailabilityResponse> {
            return Api.GetUserLocation().then((coords) => this.Availability(slug, coords.latitude, coords.longitude, radius, productTypeFilter));
        }
    }

    export class LocationApi {

        private factory: RequestFactory;

        constructor(factory: RequestFactory) {
            this.factory = factory;
        }

        Search(position: Position, page?: number, take?: number, filters?: OptionalLocationSearchFilters): JQueryPromise<LocationSearchResponse> {
            return $.ajax(LocationSearchRequestFormatter.instance.Format(this.factory.LocationSearchRequest(position, page, take, filters)));
        }

        SearchNearUser(page?: number, take?: number, filters?: OptionalLocationSearchFilters): JQueryPromise<LocationSearchResponse> {
            return Api.GetUserLocation().then((coords) => this.Search(coords, page, take, filters));
        }

        Details(slug: string): JQueryPromise<LocationDetailsResponse> {
            return $.ajax(LocationDetailsRequestFormatter.instance.Format(this.factory.LocationDetailsRequest(slug)));
        }

        Menu(slug: string): JQueryPromise<LocationMenuResponse> {
            return $.ajax(LocationMenuRequestFormatter.instance.Format(this.factory.LocationMenuRequest(slug)));
        }

        Reviews(slug: string, skip?: number, take?: number): JQueryPromise<LocationReviewsResponse> {
            return $.ajax(LocationReviewsRequestFormatter.instance.Format(this.factory.LocationReviewsRequest(slug, skip, take)));
        }

        Specials(slug: string): JQueryPromise<LocationSpecialsResponse> {
            return $.ajax(LocationSpecialsRequestFormatter.instance.Format(this.factory.LocationSpecialsRequest(slug)));
        }
    }

    export class Api {
        Locations: LocationApi;
        Strains: StrainApi;

        constructor(appId: string, appKey: string) {
            var factory = new RequestFactory(appId, appKey);

            this.Locations = new LocationApi(factory);
            this.Strains = new StrainApi(factory);
        }

        static GetUserLocation(): JQueryPromise<Coordinates> {
            var ret = $.Deferred();
            navigator.geolocation.getCurrentPosition(function (result) {
                ret.resolve(result.coords);
            });
            return ret.promise();
        }
    }

    export class RequestFactory {
        private app_id: string;
        private app_key: string;

        private takeDefault: number;

        constructor(app_id: string, app_key: string, takeDefault?: number) {
            this.app_id = app_id;
            this.app_key = app_key;

            this.takeDefault = takeDefault || 10;
        }

        StrainSearchRequest(searchTerm?: string, sort?: string, filters?: OptionalStrainSearchFilters, page?: number, take?: number): StrainSearchRequest {
            return new StrainSearchRequest(this.app_id, this.app_key, page || 0, take || this.takeDefault, sort, searchTerm, filters);
        }

        StrainDetailsRequest(slug: string): StrainDetailsRequest {
            return new StrainDetailsRequest(this.app_id, this.app_key, slug);
        }

        StrainReviewsRequest(slug: string, page?: number, take?: number, sort?: string): StrainReviewsRequest {
            return new StrainReviewsRequest(this.app_id, this.app_key, slug, page || 0, take || this.takeDefault, sort);
        }

        StrainReviewDetailsRequest(slug: string, reviewId: number): StrainReviewDetailsRequest {
            return new StrainReviewDetailsRequest(this.app_id, this.app_key, slug, reviewId);
        }

        StrainPicturesRequest(slug: string, page?: number, take?: number): StrainPicturesRequest {
            return new StrainPicturesRequest(this.app_id, this.app_key, slug, page || 0, take || this.takeDefault);
        }

        StrainAvailabilityRequest(slug: string, latitude: number, longitude: number, radius?: number, productTypeFilter?: string) {
            return new StrainAvailabilityRequest(this.app_id, this.app_key, slug, latitude, longitude, radius, productTypeFilter);
        }

        LocationSearchRequest(position: Position, page?: number, take?: number, filters?: OptionalLocationSearchFilters): LocationSearchRequest {
            return new LocationSearchRequest(this.app_id, this.app_key, page || 0, take || this.takeDefault, position, filters);
        }

        LocationDetailsRequest(slug: string): LocationDetailsRequest {
            return new LocationDetailsRequest(this.app_id, this.app_key, slug);
        }

        LocationMenuRequest(slug: string): LocationMenuRequest {
            return new LocationMenuRequest(this.app_id, this.app_key, slug);
        }

        LocationReviewsRequest(slug: string, skip?: number, take?: number): LocationReviewsRequest {
            return new LocationReviewsRequest(this.app_id, this.app_key, slug, skip || 0, take || this.takeDefault);
        }

        LocationSpecialsRequest(slug: string): LocationSpecialsRequest {
            return new LocationSpecialsRequest(this.app_id, this.app_key, slug);
        }
    }

    export class RequestManager {
        static instance: RequestManager = new RequestManager();

        private formatters: ILeaflyRequestFormatter<JQueryAjaxSettings>[];

        constructor(formatters?: ILeaflyRequestFormatter<JQueryAjaxSettings>[]) {
            this.formatters = formatters || [StrainSearchRequestFormatter.instance,
                StrainDetailsRequestFormatter.instance,
                StrainReviewsRequestFormatter.instance,
                StrainReviewDetailsRequestFormatter.instance,
                StrainPicturesRequestFormatter.instance,
                StrainAvailabilityRequestFormatter.instance,
                LocationSearchRequestFormatter.instance,
                LocationDetailsRequestFormatter.instance,
                LocationMenuRequestFormatter.instance,
                LocationReviewsRequestFormatter.instance,
                LocationSpecialsRequestFormatter.instance
            ];
        }

        Request<T>(request: DataRequestBase): JQueryPromise<T> {
            for (var i = 0; i < this.formatters.length; i++) {
                if (this.formatters[i].CanFormat(request)) {
                    return $.ajax(this.formatters[i].Format(request));
                }
            }
            throw 'No formatter available to formater request.';
        }
    }

    export type StrainSearchListItemBase = {
        Id: string;
        Category: number;
        Name: string;
        Active: boolean;
        DisplayLabel: string;
    };

    export type TagListItem = StrainSearchListItemBase;
    export type NegativeEffectsListItem = StrainSearchListItemBase;
    export type FlavorListItem = StrainSearchListItemBase;
    export type SymptomsListItem = StrainSearchListItemBase;
    export type ConditionsListItem = StrainSearchListItemBase;

    export type StrainListItem = {
        Id: number;
        UrlName: string;
        Name: string;
        Category: string; // strain type
        DisplayCategory: string;
        Symbol: string; // periodic table abbreviation
        RatingCount: number;
        ReviewCount: number;
        Rating: number;
        StarImage: string;
        Tags: TagListItem[];
        NegativeEffects: NegativeEffectsListItem[];
        Flavors: FlavorListItem[];
        Symptoms: SymptomsListItem[];
        Conditions: ConditionsListItem[];
        permalink: string;
        SortName: string;
        LogTags: string[];
    };

    export type FacetsListItem = {
        Label: string;
        DisplayLabel: string;
        Hits: number;
        TagId: string;
        Category: string;
        Selected: boolean;
        NoFollow: boolean;
    };

    export type PagingContext = {
        PageCount: number,
        TotalItemCount: number,
        PageIndex: number,
        PageNumber: number,
        PageSize: number,
        HasPreviousPage: boolean,
        HasNextPage: boolean,
        IsFirstPage: boolean,
        IsLastPage: boolean
    };

    export type SortsSearchResultsListItem = {
        Label: string;
        DisplayLabel: string;
        Hits: number;
        Url: string;
        TagId: string;
        Category: string;
        Selected: boolean;
        NoFollow: boolean;
    };

    export type StrainSearchResponse = {
        Facets: FacetsListItem[];
        LocationFilter: boolean;
        LocationUrl: string;
        PagingContext: PagingContext;
        Sorts: SortsSearchResultsListItem[];
        Strains: StrainListItem[];
    };

    export type StrainDetailsArticleListItem = {
        author: string;
        category: string;
        date: Date;
        id: string;
        text: string;
        thumbnail: string;
        urlslug: string;
    };

    export type StrainDetailsConditionsListItem = {
        name: string;
        score: number;
    };

    export type StrainDetailsEffectsListItem = StrainDetailsConditionsListItem;
    export type StrainDetailsFlavorsListItem = StrainDetailsConditionsListItem;
    export type StrainDetailsNegativesListItem = StrainDetailsConditionsListItem;

    export type StrainDetailsGrowInfo = {
        averageYield: string;
        difficulty: string;
        environment: string;
        floweringDays: number;
        growNotes: string;
        height: string;
        outdoorFinish: string;
        preferredMedium: string;
    };

    export type StrainDetailsHighlightedReviewListItem = {
        avatar: string;
        id: number;
        starImage: string;
        text: string;
        username: string;
    };

    export type StrainDetailsParentsListItem = {
        applink: string;
        category: string;
        name: string;
        permalink: string;
        slug: string;
        symbol: string;
    };

    export type StrainDetailsPhotosListItem = {
        fullsize: string;
        thumb: string;
        uploaded: Date;
    };

    export type StrainDetailsRelatedStrainsListItem = {};

    export type StrainDetailsSymptomsListItem = StrainDetailsConditionsListItem;

    export type StrainDetailsResponse = {
        aka: string;
        articleTotalCount: number;
        articles: StrainDetailsArticleListItem[];
        articlesAvailable: boolean;
        category: string;
        conditions: StrainDetailsConditionsListItem[];
        description: string;
        descriptionPlain: string;
        effects: StrainDetailsEffectsListItem[];
        flavors: StrainDetailsFlavorsListItem[];
        highlightedReviews: StrainDetailsHighlightedReviewListItem[];
        id: number;
        name: string;
        negatives: StrainDetailsNegativesListItem[];
        parents: StrainDetailsParentsListItem[];
        permalink: string;
        photoTotalCount: number;
        photos: StrainDetailsPhotosListItem[];
        popularCities: string[];
        rating: number;
        relatedStrains: StrainDetailsRelatedStrainsListItem[];
        reviewCount: number;
        slug: string;
        starImage: string;
        symbol: string;
        symptoms: StrainDetailsSymptomsListItem[];
        testGraph: string;
        videoUrl: string;
        weakDescription: string;
    };

    export type StrainReviewsReviewListItem = {
        avatar: string;
        dateAdded: Date;
        id: number;
        locationName: string;
        locationSlug: string;
        rating: number;
        starImage: string;
        text: string;
        username: string;
    };

    export type StrainReviewsResponse = {
        pagingContext: PagingContext;
        reviews: StrainReviewsReviewListItem[];
    };

    export type StrainReviewDetailsResponse = {
        avatar: string;
        dateAdded: Date;
        effects: any[]; // TODO: fix type
        flavors: string[];
        form: number;
        id: number;
        locationLat: number;
        locationLogo: string;
        locationLon: number;
        locationName: string;
        locationRating: number;
        locationReviewCount: number;
        locationSlug: string;
        locationStars: string;
        locationTag: string;
        method: number;
        negatives: any[]; // TODO: fix type
        notes: string;
        permalink: string;
        photo: string;
        rating: number;
        starImage: string;
        strainCategory: string;
        strainId: number;
        strainName: string;
        strainSlug: string;
        strainSymbol: string;
        symptoms: any[]; // TODO: fix type
        userId: number;
        username: string;
    };

    export type StrainPicturesPictureListItem = {
        caption: string;
        fullSize: string;
        reviewId: number;
        thumb: string;
        username: string;
    };

    export type StrainPicturesResponse = {
        pagingContext: PagingContext;
        photos: StrainPicturesPictureListItem[];
    };

    export type StrainAvailabilityResponseListItem = {
        ada: boolean;
        atm: boolean;
        creditCard: boolean;
        delivery: boolean;
        displayLevel: number;
        locationLabel: string;
        logoPath: string;
        name: string;
        numReviews: number;
        permalink: string;
        rating: number;
        slug: string;
        starImage: string;
        storeFront: string;
        tagLine: string;
    };

    export type StrainAvailabilityResponse = StrainAvailabilityResponseListItem[];

    export type StoreListSpecialListItem = {
        id: number,
        title: string,
        details: string,
        finePrint: string,
        permalink: string
    };

    export type StoreListItem = {
        id: number,
        name: string,
        slug: string,
        hours: string,
        phone: string,
        address: string,
        locationLabel: string,
        delivery: boolean,
        storefront: boolean,
        lastMenuUpdate: Date,
        latitude: number,
        longitude: number,
        rating: number,
        numReviews: number,
        sponsor: boolean,
        ada: boolean,
        creditCards: boolean,
        atm: boolean,
        marquee: boolean,
        coverPhoto: string,
        logoId: number,
        logo: string,
        medical: boolean,
        retail: boolean,
        price1: boolean,
        price2: boolean,
        price3: boolean,
        mapMarkerLevel: number,
        canadaLP: boolean,
        tagLine: string,
        permalink: string,
        starImage: string,
        customMarker: string
        customMarker2x: string,
        mapMarker: string,
        specials: StoreListSpecialListItem[]
    };

    export type LocationSearchResponse = {
        stores: StoreListItem[],
        pagingContext: PagingContext,
        facets: any
    };

    export type SpecialListItem = {
        title: string,
        details: string,
        finePrint: string
    };

    export type RecentReviewsListItem = {
        username: string,
        starImage: string,
        comments: string
    };

    export type LocationDetailsResponse = {
        id: number,
        slug: string,
        name: string,
        atm: boolean,
        creditCards: boolean,
        veteranDiscount: boolean,
        ada: boolean,
        isInfoOnlyListing: boolean,
        delivery: boolean,
        retail: boolean,
        medical: boolean,
        storefront: boolean,
        specials: boolean,
        specialsCount: number,
        logo: string,
        address1: string,
        address2: string,
        city: string,
        state: string,
        zip: string,
        phone: string,
        validPhone: boolean,
        approved: boolean,
        hours: string,
        website: string,
        blurb: string,
        lastMenuUpdate: Date,
        rating: number,
        meds: number,
        service: number,
        atmosphere: number,
        followerCount: number,
        reviewCount: number,
        latitude: number,
        longitude: number,
        photos: string[],
        photoCount: number,
        permalink: string,
        menu: boolean,
        preOrderEnabled: boolean,
        canadaLP: boolean,
        coverPhoto: string,
        tagLine: string,
        tagLineBlurb: string,
        facebookUrl: string,
        twitterUrl: string,
        googlePlusUrl: string,
        pinterestUrl: string,
        tumblrUrl: string,
        instagramUrl: string,
        starImage: string,
        specialsList: SpecialListItem[],
        recentReviews: RecentReviewsListItem[],
        updates: any[],
        updateCount: number
    };

    export type LocationMenuPricingListItem = {
        Price: number;
        Unit: string;
    }

    export type LocationMenuListItem = {
        addedOn: Date;
        description: string;
        imagePath: string;
        name: string;
        preOrderEnabled: boolean;
        pricing: LocationMenuPricingListItem[];
        type: string;
    }

    export type LocationMenuResponse = LocationMenuListItem[];

    export type LocationReviewsListItem = {
        atmosphere: number;
        avatar: string;
        comments: string;
        date: Date;
        easeOfRegistration: number;
        firstVisit: boolean;
        id: number;
        meds: number;
        overallRating: string; // TODO: why string
        packagingQuality: number;
        service: number;
        shopAgain: boolean;
        starImage: string;
        username: string;
        wouldRecommend: boolean;
    };

    export type LocationReviewsResponse = {
        pagingContext: PagingContext;
        reviews: LocationReviewsListItem[];
    };

    export type LocationSpecialsListItem = {
        details: string;
        finePrint: string;
        permalink: string;
        title: string;
    };

    export type LocationSpecialsResponse = LocationSpecialsListItem[];
}
