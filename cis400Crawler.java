package usaco;

import java.util.HashSet;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import com.opencsv.CSVWriter;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashSet;

import static spark.Spark.*;


public class cis400Crawler {
	private HashSet<String> links;
	private static CSVWriter writer;

    public cis400Crawler() {
        links = new HashSet<String>();
    }

    public void getPageLinks(String URL) {
        //4. Check if you have already crawled the URLs 
        //(we are intentionally not checking for duplicate content in this example)
    	URL = URL.replace(".print", "").replace("#", "");
        if (!links.contains(URL) && !URL.contains("facebook") && !URL.contains("twitter") && !URL.contains("linkedin")&& !URL.contains("youtube") && URL.contains("fox")) {
            try {
                //4. (i) If not add it to the index
                if (links.add(URL)) {
                    System.out.println(URL);
                }
                //2. Fetch the HTML code
                Document document = Jsoup.connect(URL).get();
                //3. Parse the HTML to extract links to other URLs
                Elements linksOnPage = document.select("a[href]");
                Elements title = document.select("h1");
//                System.out.println(title.text());
                String txt = document.body().text();
//                Elements text = document.select("p");
//                System.out.println(text.text());
                
               
                
                String [] nextLine = {URL, title.text(), txt};
                writer.writeNext(nextLine);
                writer.flush();

                //5. For each extracted URL... go back to Step 4.
                for (Element page : linksOnPage) {
                	String l = page.attr("abs:href");
                	if(l.contains("foxnews.com/politics")) {
                		getPageLinks(page.attr("abs:href"));
                	}
                }
                
            } catch (IOException e) {
                System.err.println("For '" + URL + "': " + e.getMessage());
            }
        }
    }

    public static void main(String[] args) {    	
    	
    	//1. Pick a URL from the frontier
    	File file = new File("out6.csv"); 
        try { 
            // create FileWriter object with file as parameter 
            FileWriter outputfile = new FileWriter(file); 
      
            // create CSVWriter object filewriter object as parameter 
            writer = new CSVWriter(outputfile); 
      
            // adding header to csv 
            String[] header = { "URL", "Title", "Text" }; 
            writer.writeNext(header); 
      
            // add data to csv 
            String[] data1 = { "Aman", "10", "620" }; 
            writer.writeNext(data1); 
            String[] data2 = { "Suraj", "10", "630" }; 
            writer.writeNext(data2); 
      
            // closing writer connection 
            writer.close(); 
        } 
        catch (IOException e) { 
            // TODO Auto-generated catch block 
            e.printStackTrace(); 
        } 
        new cis400Crawler().getPageLinks("https://www.foxnews.com/politics");
    }

}

//import java.util.HashSet;
//import org.jsoup.Jsoup;
//import org.jsoup.nodes.Document;
//import org.jsoup.nodes.Element;
//import org.jsoup.select.Elements;
//
//import java.io.IOException;
//import java.util.HashSet;
//
//public class cis400Crawler {
//	private HashSet<String> links;
//
//    public cis400Crawler() {
//        links = new HashSet<String>();
//    }
//
//    public void getPageLinks(String URL) {
//        //4. Check if you have already crawled the URLs 
//        //(we are intentionally not checking for duplicate content in this example)
//        if (!links.contains(URL)) {
//            try {
//                //4. (i) If not add it to the index
//                if (links.add(URL)) {
//                    System.out.println(URL);
//                }
//
//                //2. Fetch the HTML code
//                Document document = Jsoup.connect(URL).get();
//                //3. Parse the HTML to extract links to other URLs
//                Elements linksOnPage = document.select("a[href]");
//
//                //5. For each extracted URL... go back to Step 4.
//                for (Element page : linksOnPage) {
//                    getPageLinks(page.attr("abs:href"));
//                }
//            } catch (IOException e) {
//                System.err.println("For '" + URL + "': " + e.getMessage());
//            }
//        }
//    }
//
//    public static void main(String[] args) {
//        //1. Pick a URL from the frontier
//        new cis400Crawler().getPageLinks("http://www.mkyong.com/");
//    }
//
//}
