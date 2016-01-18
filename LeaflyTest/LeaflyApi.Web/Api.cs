namespace LeaflyApi.Web
{
    public class Api
    {
        public readonly StrainApi Strains;
        public readonly LocationApi Locations;
        public Api(string appKey, string appId)
        {
            var f = new HttpClientFactory(appKey, appId);
            this.Strains = new StrainApi(f);
            this.Locations = new LocationApi(f);
        }
    }
}
