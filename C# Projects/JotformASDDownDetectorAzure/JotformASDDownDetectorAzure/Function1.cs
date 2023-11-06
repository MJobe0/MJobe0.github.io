using System;
using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace JotformASDDownDetectorAzure
{
    public class JotformDownDetectorAzure
    {
        private readonly ILogger _logger;

        public JotformDownDetectorAzure(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<JotformDownDetectorAzure>();
        }

        [Function("CheckSiteStatus")]
        public string CheckSiteStatus([TimerTrigger("0 */5 * * * *")] TimerInfo myTimer)
        {
            _logger.LogInformation($"Checking site status at: {DateTime.Now}");

            return IsSiteUp();
            //LogStatus(isUp);
        }

        private static string IsSiteUp()
        {
            try
            {
                using (WebClient client = new WebClient())
                {
                    string pageContent = client.DownloadString("");
                    string statusCode = client.ResponseHeaders["Status Code"];
                    if (statusCode == "200 OK")
                    {
                        if (pageContent.Contains("Server Error"))
                        {
                            Console.WriteLine("Page contains Server Error.");
                            Console.WriteLine(pageContent);
                            return LogStatus(false, "Server Error");
                            //return false;
                        }
                        return LogStatus(true, "200 OK");
                        //return true;
                    }
                    else
                    {
                        Console.WriteLine($"Response Status Code: {statusCode}");
                        return LogStatus(false, statusCode);
                        //return false;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error checking site status: {ex.Message}");
                return LogStatus(false, "Error");
                //return false;
            }
        }

        private static string LogStatus(bool isUp, string reason)
        {
            //string statusColor = isUp ? ConsoleColor.Green.ToString() : ConsoleColor.Red.ToString();
            string timestamp = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
            //Console.ForegroundColor = (ConsoleColor)Enum.Parse(typeof(ConsoleColor), statusColor);
            //Console.WriteLine($"{timestamp} - Enterprise instance is {(isUp ? "UP" : "DOWN")} - Reason: {reason}");
            //Console.ResetColor();
            string logMessage = $"{timestamp} - Enterprise instance is {(isUp ? "UP" : "DOWN")} - Reason: {reason}";
            Console.WriteLine(logMessage);
            return logMessage;
        }

    }
}
