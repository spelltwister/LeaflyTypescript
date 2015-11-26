class LeaflyCredentialsViewModel {

    AppId: KnockoutObservable<string>;
    AppKey: KnockoutObservable<string>;
    HasCredentials: KnockoutComputed<boolean>;

    constructor() {
        this.AppId = ko.observable("");
        this.AppKey = ko.observable("");
        this.HasCredentials = ko.pureComputed(() => !!(this.AppId() && this.AppKey()));
    }

    LoadCredentials() {
        if (!window.localStorage.getItem("LeaflyAppId")) {
            return;
        }

        var appId = window.localStorage.getItem("LeaflyAppId");
        var appKey = window.localStorage.getItem("LeaflyAppKey");

        this.AppId(appId);
        this.AppKey(appKey);
    }

    SaveCredentials() {
        if (!this.HasCredentials()) {
            return;
        }
        window.localStorage.setItem("LeaflyAppId", this.AppId());
        window.localStorage.setItem("LeaflyAppKey", this.AppKey());
    }
}