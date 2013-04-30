using Backoffice.Models;
using Backoffice.Services;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace Backoffice
{
    public static class GlobalSettings
    {
        public static class ExigoApiCredentials
        {
            public static string LoginName                          = "API_Username";
            public static string Password                           = "API_Password";
            public static string CompanyKey                         = "exigodemo";
        }

        public static class ExigoPaymentApiCredentials
        {
            public static string LoginName                          = "";
            public static string Password                           = "";
        }

        public static class ExigoApiSettings
        {
            public static ExigoApiContextSource DefaultContextSource = ExigoApiContextSource.Live;

            public static class WebService
            {
                public static string LiveUrl                        = "http://api.exigo.com/3.0/ExigoApi.asmx";
                public static string Sandbox1Url                    = "http://sandboxapi1.exigo.com/3.0/ExigoApi.asmx";
                public static string Sandbox2Url                    = "http://sandboxapi2.exigo.com/3.0/ExigoApi.asmx";
                public static string Sandbox3Url                    = "http://sandboxapi3.exigo.com/3.0/ExigoApi.asmx";
            }

            public static class OData
            {
                public static string LiveUrl                        = "http://api.exigo.com/4.0/" + GlobalSettings.ExigoApiCredentials.CompanyKey;
                public static string Sandbox1Url                    = "http://sandboxapi1.exigo.com/4.0/" + GlobalSettings.ExigoApiCredentials.CompanyKey;
                public static string Sandbox2Url                    = "http://sandboxapi2.exigo.com/4.0/" + GlobalSettings.ExigoApiCredentials.CompanyKey;
                public static string Sandbox3Url                    = "http://sandboxapi3.exigo.com/4.0/" + GlobalSettings.ExigoApiCredentials.CompanyKey;
            }
        }

        public static class ConnectionStrings
        {
            public static string Sql                                = ConfigurationManager.ConnectionStrings["sqlreporting"].ConnectionString;
        }

        public static class Backoffice
        {
            public static int SessionTimeoutInMinutes               = 30;
            public static string LoginNameCookieName                = GlobalSettings.ExigoApiCredentials.CompanyKey + "MobileBackofficeLoginName";
        }

        public static class Markets
        {
            public static string MarketCookieName                   = "SelectedMarket";
            public static List<Market> AvailableMarkets             = new List<Market>
                                                                        {
                                                                            new Market { 
                                                                                Name            = MarketName.UnitedStates,
                                                                                Description     = "United States",     
                                                                                CookieValue     = "US",         
                                                                                CultureCode     = "en-US",
                                                                                IsDefault       = true,
                                                                                Countries       = new List<string> { "US" }
                                                                            },

                                                                            new Market { 
                                                                                Name            = MarketName.Canada,
                                                                                Description     = "Canada",            
                                                                                CookieValue     = "CA",         
                                                                                CultureCode     = "en-US",
                                                                                Countries       = new List<string> { "CA" }
                                                                            }
                                                                        };
        }

        public static class Shopping
        {
            public static int DefaultPriceTypeID                    = PriceTypes.Distributor;

            public static string ProductImagePath
            {
                get
                {
                    return string.Format(_productImagePath, GlobalSettings.ExigoApiCredentials.CompanyKey);
                }
            }
            private static string _productImagePath                 = "https://api.exigo.com/4.0/{0}/productimages/";
        }

        public static class Websites
        {
            public static string ReplicatedSite                     = "http://www.myexigo.com/public/{0}";
            public static string Signup                             = "http://www.myexigo.com/public/{0}/signup.aspx";
            public static string EmailVerification                  = "http://www.myexigo.com/public/{0}/VerifyOptIn.aspx";
            public static string ResetPassword                      = "http://www.myexigo.com/public/{0}/ResetPassword.aspx";
            public static string Twitter                            = "http://www.twitter.com/" + Company.Twitter;
            public static string Facebook                           = "http://www.facebook.com/" + Company.Facebook;
        }

        public static class Company
        {
            public static string Name                               = "Exigo Office, Inc.";
            public static string Address                            = "8130 John Carpenter Freeway";
            public static string City                               = "Dallas";
            public static string State                              = "Texas";
            public static string Zip                                = "75247";
            public static string Country                            = "United States";
            public static string Phone                              = "(214)367-9999";
            public static string Email                              = "info@exigo.com";
            public static string Twitter                            = "exigo";
            public static string Facebook                           = "platform";
        }
    }


    // Global References to Client-Specific Settings
    public static class Warehouses
    {
        public const int Default                                    = 1;
    }
    public static class PeriodTypes
    {
        public const int Default                                    = 1;
        public const int Monthly                                    = 1;
    }
    public static class NewsDepartments
    {
        public const int Backoffice                                 = 10;
    }
    public static class CustomerTypes
    {
        public const int RetailCustomer                             = 1;
        public const int Distributor                                = 2;
    }
    public static class CustomerStatusTypes
    {
        public const int Active                                     = 1;
    }
    public static class PriceTypes
    {
        public const int Distributor                                = 1;
    }
    public static class Languages
    {
        public const int English                                    = 0;
    }
    public enum MarketName
    {
        UnitedStates,
        Canada
    }
    public enum AddressType
    {
        Main    = 1,
        Mailing = 2,
        Other   = 3
    }
    public enum PaymentMethodType
    {
        PrimaryCreditCard   = 1,
        SecondaryCreditCard = 2,
        NewCreditCard       = 3
    }
    public enum DistributorSearchType
    {
        ID      = 1,
        Name    = 2,
        Company = 3,
        Rank    = 4
    }
}