using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ServiceStack;
using ServiceStackAngularUpload.ServiceModel;

namespace ServiceStackAngularUpload.ServiceInterface
{
    public class MyServices : Service
    {
        public object Any(Hello request)
        {
            return new HelloResponse { Result = "Hello, {0}!".Fmt(request.Name) };
        }

        public object Any(FallbackForClientRoutes request)
        {
            //Return default.cshtml for unmatched requests so routing is handled on the client
            return new HttpResult
            {
                View = "/default.cshtml"
            };
        }

        public object Post(MyFileUpload request)
        {
            Console.WriteLine(request.FirstName);
            Console.WriteLine(request.LastName);
            Console.WriteLine(request.Age);

            var httpFile = base.Request.Files[0];
            var fileName = request.FirstName + request.LastName + ".tmp";
            httpFile.SaveTo("C:\\Temp\\{0}".Fmt(fileName));

            return new MyFileUploadResponse { FileName = fileName };
        }
    }

    [Route("/myfileupload")]
    public class MyFileUpload
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
    }

    public class MyFileUploadResponse
    {
        public string FileName { get; set; }
    }

    [FallbackRoute("/{PathInfo*}")]
    public class FallbackForClientRoutes
    {
        public string PathInfo { get; set; }
    }
}