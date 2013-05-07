using Backoffice.Exigo.OData;
using Backoffice.Helpers;
using Backoffice.Models;
using Backoffice.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Backoffice.Controllers
{
    [BackofficeApiAuthorize]
    public class WebApiController : ApiController
    {
        [HttpGet]
        public UserIdentity CurrentIdentity()
        {
            return Identity.Current;
        }
    }
}
