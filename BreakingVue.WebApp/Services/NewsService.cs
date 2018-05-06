using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace BreakingVue.WebApp.Services
{
    public class NewsService : ControllerBase
    {
        #region Fields
        const string BASE_URL = "https://newsapi.org";
        const string ENDPOINT_TOP_HEADLINES = "/v2/top-headlines";
        const string API_KEY = "YOUR_API_KEY";
        readonly HttpClient _client;
        #endregion

        #region Properties
        #endregion

        #region Constructors
        public NewsService()
        {
            _client = new HttpClient
            {
                BaseAddress = new Uri(BASE_URL)
            };
            _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", API_KEY);
        }
        #endregion

        #region Methods
        [Route("v1/getNews/{country?}")]
        public async Task<string> GetTopNewsAsync(string country)
        {
            if (country == null)
            {
                var languageHeader = HttpContext.Request.Headers["Accept-Language"];
                if (languageHeader[0] != null)
                    country = languageHeader[0].Split(',', ';', '-')[1];
            }

            try
            {
                return await (await _client.GetAsync($"{ENDPOINT_TOP_HEADLINES}?country={country}")).Content.ReadAsStringAsync();
            }
            catch (Exception ex)
            {
                return JsonConvert.SerializeObject(ex);
            }
        }

        [Route("v1/search/{query}")]
        public async Task<string> SearchNewsAsync(string query)
        {
            try
            {
                return await (await _client.GetAsync($"{ENDPOINT_TOP_HEADLINES}?q={query}")).Content.ReadAsStringAsync();
            }
            catch (Exception ex)
            {
                return JsonConvert.SerializeObject(ex);
            }
        }
        #endregion
    }
}
