using System;

namespace LeaflyTest.Controllers
{
    internal static class LeaflyApiInstance
    {
        private static readonly Lazy<Leafly.Web.Api> LeaflyApiProxy = new Lazy<Leafly.Web.Api>(() =>
            new Leafly.Web.Api(System.Configuration.ConfigurationManager.AppSettings.Get("leaflyAppKey"),
                System.Configuration.ConfigurationManager.AppSettings.Get("leaflyAppId")));

        public static Leafly.Web.LocationApi LocationApiProxy => LeaflyApiProxy.Value.Locations;
        public static Leafly.Web.StrainApi StrainApiProxy => LeaflyApiProxy.Value.Strains;
    }
}