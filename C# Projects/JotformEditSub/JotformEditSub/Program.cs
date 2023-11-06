using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;

namespace BespokeJotform
{
    internal partial class JotformSubmissionUpdater
    {
        static async Task Main(string[] args)
        {
            string apiKey = "";
            string formId = "231222905228045";
            string oldFieldId = "170";
            var updater = new JotformSubmissionUpdater();

            try
            {
                List<JotformSubmission> submissions = GetSubmissions(apiKey, formId);

                Console.WriteLine($"Updating {submissions.Count} submissions");

                foreach (var submission in submissions)
                {
                    if (submission.Answers.ContainsKey(oldFieldId))
                    {
                        string answerJson = submission.Answers[oldFieldId].ToString();

                        JObject answerObject = JsonConvert.DeserializeObject<JObject>(answerJson);

                        string oldValue = answerObject["answer"]?.ToString() ?? string.Empty;

                        updater.UpdateSubmission(submission.Id, oldValue, apiKey);
                        Console.WriteLine($"Submission {submission.Id}: Updated with value {oldValue}");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }

            Console.WriteLine("Press any key to exit...");
            Console.ReadKey();
        }

        public class JotformApiResponse
        {
            public List<JotformSubmission> Content { get; set; }
        }

        private static List<JotformSubmission> GetSubmissions(string apiKey, string formId)
        {
            HttpClient client = new HttpClient();
            string url = $"https://assurancesd.jotform.com/API/form/{formId}/submissions?apiKey={apiKey}&limit=1000";

            client.DefaultRequestHeaders.Add("jf-team-id", "231634880618057");

            HttpResponseMessage response = client.GetAsync(url).Result;
            if (response.IsSuccessStatusCode)
            {
                string json = response.Content.ReadAsStringAsync().Result;
                JotformApiResponse apiResponse = JsonConvert.DeserializeObject<JotformApiResponse>(json);
                return apiResponse.Content;
            }
            else
            {
                throw new Exception("Failed to retrieve submissions");
            }
        }

        public string UpdateSubmission(string submissionId, string newEmail, string apiKey)
        {
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Add("jf-team-id", "231634880618057");
            Dictionary<string, string> body = new Dictionary<string, string>();
            body.Add("181", newEmail);
            string jsonContent = JsonConvert.SerializeObject(body);
            Console.WriteLine(jsonContent);
            string url = $"https://assurancesd.jotform.com/API//submission/{submissionId}?apiKey={apiKey}";
            Console.WriteLine(url);
            var content = new StringContent(jsonContent.ToString(), Encoding.UTF8, "application/json");
            var result = client.PostAsync(url, content).Result;
            return result.ToString();
        }
    }

    internal class JotformSubmission
    {
        public string Id { get; set; }
        public Dictionary<string, object> Answers { get; set; }
    }
}
