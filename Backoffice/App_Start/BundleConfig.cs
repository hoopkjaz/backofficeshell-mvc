using System.Web;
using System.Web.Optimization;

namespace  Backoffice
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            // Enable bundling optimizations, even when the site is in debug mode.
            BundleTable.EnableOptimizations = true;
        }
    }
}