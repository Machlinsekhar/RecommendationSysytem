from google_scraper.src import Gmaps

def scrape_data(queries):
   Gmaps.places(queries, max=5, reviews_max=2, scrape_reviews=True, reviews_sort=Gmaps.MOST_RELEVANT)