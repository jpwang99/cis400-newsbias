package usaco;

import static spark.Spark.get;
import static spark.Spark.port;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;




public class cis400Server {
	public static void main(String[] args) {
		port(8081);
		get("/", (request, response) -> {
			System.out.println(request.queryParams("url"));
			Document document = Jsoup.connect(request.queryParams("url")).get();

			//3. Parse the HTML to extract links to other URLs
//            Elements linksOnPage = document.select("a[href]");
//            Elements title = document.select("h1");
//            System.out.println(title.text());
			response.status(200);
			System.out.println(document.body().text());
            return document.body().text();
		});
	}
}
