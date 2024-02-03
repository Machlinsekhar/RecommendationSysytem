from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
import time
import re

def convert_review_count(review_count_str):
    match = re.search(r'([\d.]+)([Tt]?)', review_count_str)
    if match:
        value, suffix = match.groups()
        value = float(value)
        if suffix.lower() == 't':
            value *= 1000
        return int(value)
    return 0

def google_search(query, location):
    driver = webdriver.Chrome() 
    try:
        driver.get("https://www.google.com")
        search_box = driver.find_element("name", "q")
        search_box.send_keys(f"{query} {location}")
        search_box.send_keys(Keys.RETURN)

        time.sleep(2)

        more_places_link = driver.find_element(By.LINK_TEXT, "More places")
        more_places_link.click()

        time.sleep(5)

        page_source = driver.page_source
        soup = BeautifulSoup(page_source, "html.parser")

        restaurants = soup.find_all("div", jscontroller="AtSb")
        top_restaurants = []

        for restaurant in restaurants:
            if restaurant.get("data-is-ad") == "1":
                continue

            restaurant_name = restaurant.find("span", class_="OSrXXb").text

            review_count_element = restaurant.find("span", class_="RDApEe YrbPuc")
            review_count_match = re.search(r'\([\d.]+[T]?\)', review_count_element.text)
            review_count=convert_review_count(review_count_match.group(0))

            # Check if the review count is greater than 50
            if review_count > 50:
                top_restaurants.append(restaurant_name)
                if len(top_restaurants) >= 10:
                    break

        print("Top 10 Restaurants:")
        for idx, restaurant_name in enumerate(top_restaurants, start=1):
            print(f"{idx}. {restaurant_name}")


    finally:
        driver.quit()

google_search("top restaurants in", "New York")
