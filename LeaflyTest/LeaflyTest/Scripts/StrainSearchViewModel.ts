class StrainSearchViewModel {

    LeaflyCredentialsVm: LeaflyCredentialsViewModel;
    SortOptions: string[];

    Page: KnockoutObservable<number>;
    Take: KnockoutObservable<number>;
    SearchTerm: KnockoutObservable<string>;
    Sort: KnockoutObservable<string>;
    Filters: any;

    constructor() {
        this.LeaflyCredentialsVm = new LeaflyCredentialsViewModel();

        this.SortOptions = ['rating', 'alpha', 'newest', 'popular'];

        this.Page = ko.observable(0);
        this.Take = ko.observable(10);
        this.SearchTerm = ko.observable("");
        this.Sort = ko.observable(this.SortOptions[0]);
        this.Filters = {};
    }

    Search(): JQueryPromise<Leafly.StrainSearchResponse> {
        return new Leafly.Api(this.LeaflyCredentialsVm.AppId(), this.LeaflyCredentialsVm.AppKey())
                         .Strains
                         .Search(this.SearchTerm(), this.Sort(), this.Filters(), this.Page(), this.Take());
    }
}