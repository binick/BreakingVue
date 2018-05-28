using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Threading.Tasks;
using BreakingVue.WebApp.Services;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BreakingVue.WebApp.Test
{
    [TestClass]
    public class NewsServiceTest
    {
        [TestMethod]
        public async Task GetTopNewsAsync()
        {
            string[] italianKeywords = new string[] { "_e_", "_o_", "_di_", "_da_", "_con_" };
            string[] englishKeywords = new string[] { "_and_", "_the_", "_be_", "_of_" };
            int keywordsThreshold = 100;

            NewsService service = new NewsService();
            service.ControllerContext = new ControllerContext();
            service.ControllerContext.HttpContext = new DefaultHttpContext();
            service.ControllerContext.HttpContext.Request.Headers["Accept-Language"] = "en-US,en;q=0.5";

            string news = await service.GetTopNewsAsync("it");
            Assert.IsFalse(string.IsNullOrEmpty(news));
            JObject serialized = JObject.Parse(news);
            Assert.IsTrue(serialized.Value<string>("status") == "ok");
            Assert.IsTrue(IsCultureAttempt(news, italianKeywords, keywordsThreshold));

            news = await service.GetTopNewsAsync(null);
            Assert.IsFalse(string.IsNullOrEmpty(news));
            serialized = JObject.Parse(news);
            Assert.IsTrue(serialized.Value<string>("status") == "ok");
            Assert.IsTrue(IsCultureAttempt(news, englishKeywords, keywordsThreshold));
        }

        [TestMethod]
        public async Task SearchNewsAsync()
        {
            string searchKey = "trump";
            int searchKeyThreshold = 50;

            string otherSearchKey = "gatto";

            NewsService service = new NewsService();

            string news = await service.SearchNewsAsync(searchKey);
            Assert.IsFalse(string.IsNullOrEmpty(news));
            JObject serialized = JObject.Parse(news);
            Assert.IsTrue(serialized.Value<string>("status") == "ok");
            Assert.IsTrue(news.IndexOf(searchKey) > searchKeyThreshold);

            news = await service.SearchNewsAsync(otherSearchKey);
            Assert.IsFalse(string.IsNullOrEmpty(news));
            serialized = JObject.Parse(news);
            Assert.IsTrue(serialized.Value<string>("status") == "ok");
            Assert.IsTrue(news.IndexOf(searchKey) < searchKeyThreshold);
        }

        private bool IsCultureAttempt(string data, string[] keywords, int keywordsThreshold)
        {
            string cleadData = data.Replace(' ', '_');

            bool isAttempt = true;
            foreach(string keyword in keywords)
            {
                if (!isAttempt)
                    continue;

                if (cleadData.IndexOf(keyword) < keywordsThreshold)
                    isAttempt = false;
            }

            return isAttempt;
        }
    }
}
