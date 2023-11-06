using System;
using System.Threading.Tasks;
using ScrapySharp.Network;
using HtmlAgilityPack;

class Program
{
    static async Task Main()
    {
        // Create a new ScrapingBrowser instance.
        var browser = new ScrapingBrowser();

        // Navigate to the Google search page.
        var webpage = browser.NavigateToPage(new Uri("https://www.google.com"));

        // Find the search input field and enter a query (e.g., "web scraping").
        var searchInput = webpage.FindFormById("input[name='q']").Single();
        searchInput.Value = "web scraping";

        // Find the search form and submit it.
        var searchForm = searchInput.Ancestors("form").Single();
        var searchResultsPage = browser.Submit(searchForm);

        // Wait for user input before closing the window.
        Console.WriteLine("Press Enter to exit...");
        Console.ReadLine();
    }
}
