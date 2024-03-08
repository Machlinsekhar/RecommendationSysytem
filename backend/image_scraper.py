from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
import base64
import os
import re
from dotenv import load_dotenv
# import csv

load_dotenv()
uploads_directory = os.getenv("UPLOADS_DIRECTORY")

IMG_URL = '//g-img[@class="ZGomKf"]/img'

options = Options()
options.add_argument("--headless") 
options.add_argument('--log-level=3')

def run_query_function(driver, location, resto, address):
    driver.get("https://www.google.com")
    search_box = driver.find_element("name", "q")
    search_box.send_keys(f"{resto} restaurant {location} {address}")
    search_box.send_keys(Keys.RETURN)
    print("after open function")
    return driver

def image_url_scraper(driver, jagah, place_, address, call_count):

    place = re.sub(r'[^a-zA-Z0-9\s]', '', place_)
    print(place)

    img_url = "N/A"

    try:
        image_element = driver.find_element(By.XPATH, IMG_URL)
        img_url = image_element.get_attribute("src")
        print(f"url found for {place}")
        os.makedirs(f"{uploads_directory}/{jagah}", exist_ok=True)

        img_file_path = os.path.join(f"{uploads_directory}/{jagah}", f"{place}.jpg")
        status = download_image(img_url, img_file_path, call_count)
        if status == True:
            print("image processing done")
        else: 
            call_count += 1
            main_function(jagah, place_, address, call_count)

    except NoSuchElementException:
        print("url not found")
        pass

def download_image(url, save_path, call_count):
    print("in download image")
    try:
        parts = url.split(',', 1)
        if len(parts) != 2 and call_count<2:
            return False
        header, data = parts
        img_data = base64.b64decode(data)

        with open(save_path, 'wb') as f:
            f.write(img_data)

        return True

    except Exception as e:
        print("An error occurred:", e)


def main_function(location, resto, address, call_count):
    service = Service(executable_path='D:\Projects\RecommendationSysytem\\build\chromedriver-122.exe')
    driver = webdriver.Chrome(service=service, options=options)
    driver2 = run_query_function(driver, location, resto, address)
    image_url_scraper(driver2, location, resto, address, call_count)


# main_function("pune","Chinese Room","Chinese Room, 2434, East St, Hulshur, Camp, Pune, Maharashtra 411001", 0)