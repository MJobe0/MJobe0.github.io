using System;
using System.IO;
using System.Net;

class JotformASDDownDetector
{
    private const string EnterpriseLoginPageUrl = "";
    private const int CheckIntervalInSeconds = 10;

    public static void Main(string[] args)
    {
        Console.OutputEncoding = System.Text.Encoding.UTF8;
        Console.SetOut(new StreamWriter(Console.OpenStandardOutput(), Console.OutputEncoding) { AutoFlush = true });

        Console.SetWindowSize(120, 30);
        Console.SetBufferSize(120, 500);

        while (true)
        {
            bool isUp = IsSiteUp();
            //LogStatus(isUp);
            System.Threading.Thread.Sleep(CheckIntervalInSeconds * 1000);
        }
    }

    private static bool IsSiteUp()
    {
        try
        {
            using (WebClient client = new WebClient())
            {
                string pageContent = client.DownloadString(EnterpriseLoginPageUrl);

                string statusCode = client.ResponseHeaders["Status Code"];

                if (statusCode == "200 OK")
                {
                    if (pageContent.Contains("Server Error"))
                    {
                        Console.WriteLine("Page contains Server Error.");
                        Console.WriteLine(pageContent);
                        LogStatus(false, "Server Error");
                        return false;
                    }
                    LogStatus(true, "200 OK");
                    return true;
                }
                else
                {
                    Console.WriteLine($"Response Status Code: {statusCode}");
                    LogStatus(false, statusCode);
                    return false;
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error checking site status: {ex.Message}");
            LogStatus(false, "Error");
            return false;
        }
    }

    private static void LogStatus(bool isUp, string reason)
    {
        string statusColor = isUp ? ConsoleColor.Green.ToString() : ConsoleColor.Red.ToString();
        string timestamp = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
        Console.ForegroundColor = (ConsoleColor)Enum.Parse(typeof(ConsoleColor), statusColor);
        Console.WriteLine($"{timestamp} - Enterprise instance is {(isUp ? "UP" : "DOWN")} - Reason: {reason}");
        Console.ResetColor();
    }

}