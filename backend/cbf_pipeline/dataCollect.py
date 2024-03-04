from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webelement import WebElement
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from typing import List
import time
import base64
import os
import re
from dotenv import load_dotenv
# import csv

load_dotenv()
uploads_directory = os.getenv("UPLOADS_DIRECTORY")

REVIEW_PARENT_CONTAINER = '//div[@class=\'review-dialog-list\']'
REVIEW_CONTAINER = '//div[@class=\'WMbnJf vY6njf gws-localreviews__google-review\']'
REST_TYPE = '//span[contains(@class, "E5BaQ") and contains(text())]'
REST_COST = "//div[@class=\"rjxHPb PZPZlf\"]//br/following-sibling::span[1]"
IMG_URL = '//g-img[@class="ZGomKf"]/img'
REVIEW_COUNT = '//*[@id="gsr"]/span[2]/g-lightbox/div/div[2]/div[3]/span/div/div/div/div[1]/div[2]/div[1]/div/div/span/span'
RATING_VAL = "//span[@class='Aq14fc']"
REST_INFO = "//div[@class=\"rjxHPb PZPZlf\"]"

def start_function(location, resto, warning):
    torestaurants=[]
    toreviews=[]
    driver = webdriver.Chrome() 
    address=""
    driver2 = open_function(driver, location, resto, address)
    main_result = main_function(driver2, location, resto, warning)
    if main_result is not None:
        torestaurants, toreviews = main_result
        driver2.quit()
        print("driver2 thread closed")
        return torestaurants, toreviews
    else:
        print("main_function returned None")  
        driver2.quit()
        print("driver2 thread closed")
        return [], []

def open_function(driver, location, resto, address):
    driver.get("https://www.google.com")
    search_box = driver.find_element("name", "q")
    search_box.send_keys(f"{resto} restaurant {location} {address}")
    search_box.send_keys(Keys.RETURN)
    print("after open function")
    return driver

def download_image(url, save_path):
    print("in download image")
    try:
        header, data = url.split(',', 1)
        img_data = base64.b64decode(data)

        with open(save_path, 'wb') as f:
            f.write(img_data)

        print("Image saved successfully.")

    except Exception as e:
        print("An error occurred:", e)

def main_function(driver, jagah, place_, warning):

    # os.makedirs(f"backend/dataset/{jagah}", exist_ok=True)
    # file_path = os.path.join(f"backend/dataset/{jagah}", f"{jagah}_profile.csv")
    # with open(file_path, 'w', newline='', encoding='utf-8') as csvfile:
    #     csv_writer = csv.writer(csvfile)
    #     csv_writer.writerow(["restaurant_name", "restaurant_type", "budget", "review_count"])

    # for place in top_restaurants:
    torestaurants = []
    toreviews = []

    place = re.sub(r'[^a-zA-Z0-9\s]', '', place_)
    print(place)

    try:
        print('start of try block')
        reviews_link = driver.find_element(By.CSS_SELECTOR, 'span[jscontroller="qjk5yc"]')
        
        expense_word = "1"
        restaurant_type = "any"
        img_url = "N/A"
        count = "N/A"
        rev_count = 0
        print("warning=",warning)

        try:
            rest_info_element = driver.find_element(By.XPATH, REST_INFO)
            # rest_info_element = WebDriverWait(driver, 1000).until(EC.visibility_of_element_located((By.XPATH, REST_INFO)))

            # RESTAURANT COST
            try:
                expense_element = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.XPATH, REST_COST)))
                if expense_element is not None:
                    expense_label = expense_element.text
                    expense_word = expense_label.lower()
                    if expense_word == "inexpensive":
                        expense_word = 0
                    elif expense_word == "moderate":
                        expense_word = 1
                    elif expense_word == "expensive":
                        expense_word = 2
                    elif expense_word == "very expensive":
                        expense_word = 3
                    print(expense_word)

            except NoSuchElementException:
                print("Error occurred while retrieving aria-label attribute") 
                pass 

            # RESTAURANT TYPE
            try:
                type_element = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CLASS_NAME, 'E5BaQ')))
                if type_element is not None:
                    restaurant_type = type_element.text.lower()
                    if restaurant_type == "restaurant":
                        restaurant_type = "any"
                    else:
                        restaurant_type = restaurant_type.replace(" restaurant", "")
                    print(restaurant_type)
            except NoSuchElementException:
                pass  
            
            # RESTAURANT IMG_URL
            try:
                image_element = driver.find_element(By.XPATH, IMG_URL)
                img_url = image_element.get_attribute("src")
                print(f"url found for {place}")
                os.makedirs(f"{uploads_directory}/{jagah}", exist_ok=True)

                img_file_path = os.path.join(f"{uploads_directory}/{jagah}", f"{place}.jpg")
                download_image(img_url, img_file_path)
                print("image saved")

            except NoSuchElementException:
                print("url not found")
                pass

            reviews_link = driver.find_element(By.CSS_SELECTOR, 'span[jscontroller="qjk5yc"]')
            reviews_link.click()

            wait = WebDriverWait(driver, 20)
            review_box = wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "c9QyIf")))

            # REVIEW COUNT
            try:
                count_element = driver.find_element(By.XPATH, REVIEW_COUNT)
                rev_count = int(count_element.text.split()[0].replace(',', ''))
            except NoSuchElementException:
                rev_count = 50
                pass 

            # REVIEW RATING
            try:
                rating_element = driver.find_element(By.XPATH, RATING_VAL)
                overall_rating = rating_element.text
            except NoSuchElementException:
                pass 

            torestaurants.append(expense_word)
            torestaurants.append(restaurant_type)
            torestaurants.append(overall_rating)
            torestaurants.append(rev_count)
            # torestaurants.append(img_bin)
            print(torestaurants)
            
            # CSV WRITE IN PROFILE.CSV
            # with open(f"backend/dataset/{jagah}/{jagah}_profile.csv", 'a', newline='', encoding='utf-8') as csvfile:
            #     csv_writer = csv.writer(csvfile)
            #     csv_writer.writerow([place, restaurant_type, expense_word, count])

            # SCROLL VIEW
            while True:
                review_container = WebDriverWait(driver, 20).until(EC.visibility_of_element_located((By.XPATH, REVIEW_PARENT_CONTAINER)))
                for i in range(0,2):
                    driver.execute_script('arguments[0].scrollTop = arguments[0].scrollHeight', review_container)
                    time.sleep(1)
                    reviews_count = len(driver.find_elements(By.XPATH, REVIEW_CONTAINER))
                    print(reviews_count)

                    # COUNTER
                    if reviews_count>=20:
                        break  
                break 
                
            reviews = driver.find_elements(By.XPATH, REVIEW_CONTAINER)

            # rest_file_path = os.path.join(f"backend/dataset/{jagah}/reviews/{place}", f"{place}.csv")
            # with open(rest_file_path, 'w', newline='', encoding='utf-8') as csvfile:
                # csvwriter = csv.writer(csvfile)
                # csvwriter.writerow(["Reviewer", "Review", "Rating", "Recommended dishes"])
            number_of_reviews = 0

            # FOR EACH REVIEW CONTAINER
            for i in reviews:
                dishes=""
                single_review=[]
                try:
                    # REVIEWER NAME
                    reviewer_name = i.find_element(By.XPATH, './/div[@class="TSUbDb"]').text.encode("utf-8").decode('utf-8')
                    
                    try:
                        # EXPANDED REVIEW
                        review_element = i.find_element(By.XPATH, './/span[@class="review-full-text"]')
                        driver.execute_script("arguments[0].style.display = 'block';", review_element)
                        review_text = review_element.text.encode("utf-8").decode('utf-8')

                    except NoSuchElementException:
                        # SHORT REVIEW
                        try:
                            review_element = i.find_element(By.XPATH, './/span[@data-expandable-section]')
                            review_text = review_element.text
                        except NoSuchElementException:
                            review_text = "No review found"

                    # RECOMMENDED DISH
                    # try:
                    #     parent_element = i.find_element(By.XPATH, './/div[@class="k8MTF"]')
                    #     driver.execute_script("arguments[0].style.display = 'block';", parent_element)
                    #     try:
                    #         dishes_element = parent_element.find_element(By.XPATH,'.//span[b[text()="Recommended dishes"]]/..').text
                    #         # if dishes_element:
                    #         #     print('dish exists under ',reviewer_name)
                    #         #     print(dishes_element.split('Recommended dishes'))
                    #         match = re.search(r'Recommended dishes\n(.*?)(?=\n\n|\Z)', dishes_element)
                    #         if match:
                    #             dishes=match.group(1)
                    #             print(dishes)
                    #         else: 
                    #             pass
                    #     except NoSuchElementException:
                    #         pass
                    # except:
                    #     pass
                    
                    # RATING
                    rating_element = i.find_element(By.XPATH, './/span[@class=\'lTi8oc z3HNkc\']')
                    rating = rating_element.get_attribute('aria-label')
                    rating_score = float(rating.split(" ")[1])

                    # CSV WRITE IN PLACE.CSV
                    # csvwriter.writerow([reviewer_name, review_text, rating_score, dishes])

                    single_review.append(reviewer_name)
                    single_review.append(rating_score)
                    single_review.append(review_text)

                    toreviews.append(single_review)

                    number_of_reviews += 1
                    
                    # COUNTER
                    if number_of_reviews >= 20:
                        break

                except Exception as e:
                    print(f"Error processing review: {e}")
                    pass
            
            print("after main function")
            return torestaurants, toreviews
        
        except NoSuchElementException:
            if warning == 0:
                print("retrying link again")
                warning += 1
                start_function(f"{jagah}",f"{place}", warning)
            else:
                print("setting as null values")
                torestaurants = "what"
                toreviews = "what"
                return torestaurants, toreviews

    except NoSuchElementException:
        if driver.find_elements(By.CSS_SELECTOR, 'div.YzSd'):
            try:
                places_box = driver.find_element(By.CLASS_NAME, 'cXedhc')
                print("multiple restaurants found")
                address = places_box.find_element(By.XPATH, ".//div[@class=\"rllt__details\"]/div[3]").text
                print(address)
                open_function(driver, jagah, place, address)

            except:
                print("restaurant not found")
        else:
            print("restaurant not found")
            
# start_function('hyderabad','jewel of nizam - the minar', 0)

# rest_list = ['Olive Bar & Kitchen', 'Out of the Box', 'Yum Yum Cha Khan Market']
# for rest_item in rest_list:
#     warning = 0
#     start_function('delhi',rest_item, warning)