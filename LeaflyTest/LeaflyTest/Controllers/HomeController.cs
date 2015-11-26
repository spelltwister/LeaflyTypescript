using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace LeaflyTest.Controllers
{
    //[Authorize]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Strain()
        {
            return View();
        }

        public ActionResult Location()
        {
            return View();
        }
    }
}
