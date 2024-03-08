from google_scraper_new.src import Gmaps

def scrape_data(queries):
   Gmaps.places(queries, max=10, reviews_max=20, scrape_reviews=True, reviews_sort=Gmaps.MOST_RELEVANT)