from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webelement import WebElement
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from typing import List
import time
import csv
import base64
import os
import re

REVIEW_PARENT_CONTAINER = '//div[@class=\'review-dialog-list\']'
REVIEW_CONTAINER = '//div[@class=\'WMbnJf vY6njf gws-localreviews__google-review\']'
REST_TYPE = '//span[contains(@class, "E5BaQ") and contains(text())]'
REST_COST = "//div[@class=\"rjxHPb PZPZlf\"]//br/following-sibling::span[1]/span"
IMG_URL = '//g-img[@class="ZGomKf"]/img'
REVIEW_COUNT = '//*[@id="gsr"]/span[2]/g-lightbox/div/div[2]/div[3]/span/div/div/div/div[1]/div[2]/div[1]/div/div/span/span'

driver = webdriver.Chrome() 
wait = WebDriverWait(driver, 10)

def wait_for_element_to_disappear(by: By, string: str):
    while True:
        try:
            elements = driver.find_elements(by, string)
            if len(elements) == 0:
                break
        except:
            pass

def wait_for_element(by: By, string: str) -> WebElement:
    while True:
        try:
            element = driver.find_element(by, string)
            break
        except:
            return None
    return element

def wait_for_elements(by: By, string: str) -> List[WebElement]:
    while True:
        try:
            elements = driver.find_elements(by, string)
            break
        except:
            return None
    return elements

def download_image(url, save_path):
    try:
        header, data = url.split(',', 1)
        img_data = base64.b64decode(data)

        with open(save_path, 'wb') as f:
            f.write(img_data)

        print("Image saved successfully.")
    except Exception as e:
        print("An error occurred:", e)

def main_function(jagah, top_restaurants):

    os.makedirs(f"backend/dataset/{jagah}", exist_ok=True)
    file_path = os.path.join(f"backend/dataset/{jagah}", f"{jagah}_profile.csv")
    with open(file_path, 'w', newline='', encoding='utf-8') as csvfile:
        csv_writer = csv.writer(csvfile)
        csv_writer.writerow(["restaurant_name", "restaurant_type", "budget", "review_count"])

    for place in top_restaurants:
        address="" 

        driver.get("https://www.google.com")
        search_box = driver.find_element("name", "q")
        search_box.send_keys(f"{place} {jagah} {address}")
        search_box.send_keys(Keys.RETURN)

        print(place)

        try:
            reviews_link = driver.find_element(By.CSS_SELECTOR, 'span[jscontroller="qjk5yc"]')
            
            expense_word = "N/A"
            restaurant_type = "N/A"
            img_url = "N/A"
            count = "N/A"

            # RESTAURANT COST
            try:
                expense_element = wait_for_element(By.XPATH, REST_COST)
                if expense_element is not None:
                    expense_label = expense_element.get_attribute('aria-label')
                    expense_word = expense_label.lower()
                    print(expense_word)
            except NoSuchElementException:
                print("Error occurred while retrieving aria-label attribute") 
                pass 

            # RESTAURANT TYPE
            try:
                type_element = wait_for_element(By.CLASS_NAME, 'E5BaQ')
                print(type_element)
                if type_element is not None:
                    restaurant_type = type_element.text.lower()
                    print(restaurant_type)
            except NoSuchElementException:
                pass  
            
            # RESTAURANT IMG_URL
            try:
                image_element = driver.find_element(By.XPATH, IMG_URL)
                img_url = image_element.get_attribute("src")
                print("url found")
                os.makedirs(f"backend/dataset/{jagah}/reviews/{place}", exist_ok=True)
                img_file_path = os.path.join(f"backend/dataset/{jagah}/reviews/{place}", f"{place}.jpg")
                download_image(img_url, img_file_path)
            except NoSuchElementException:
                print("url not found")
                pass

            reviews_link = driver.find_element(By.CSS_SELECTOR, 'span[jscontroller="qjk5yc"]')
            reviews_link.click()

            review_box = wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "c9QyIf")))

            # REVIEW COUNT
            try:
                count_element = driver.find_element(By.XPATH, REVIEW_COUNT)
                count = int(count_element.text.split()[0].replace(',', ''))
            except NoSuchElementException:
                pass 
            
            # CSV WRITE IN PROFILE.CSV
            with open(f"backend/dataset/{jagah}/{jagah}_profile.csv", 'a', newline='', encoding='utf-8') as csvfile:
                csv_writer = csv.writer(csvfile)
                csv_writer.writerow([place, restaurant_type, expense_word, count])

            # SCROLL VIEW
            while True:
                review_container = wait_for_element(By.XPATH, REVIEW_PARENT_CONTAINER)
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

            rest_file_path = os.path.join(f"backend/dataset/{jagah}/reviews/{place}", f"{place}.csv")
            with open(rest_file_path, 'w', newline='', encoding='utf-8') as csvfile:
                csvwriter = csv.writer(csvfile)
                csvwriter.writerow(["Reviewer", "Review", "Rating", "Recommended dishes"])
                number_of_reviews = 0

                # FOR EACH REVIEW CONTAINER
                for i in reviews:
                    dishes=""
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
                        try:
                            parent_element = i.find_element(By.XPATH, './/div[@class="k8MTF"]')
                            driver.execute_script("arguments[0].style.display = 'block';", parent_element)
                            try:
                                dishes_element = parent_element.find_element(By.XPATH,'.//span[b[text()="Recommended dishes"]]/..').text
                                # if dishes_element:
                                #     print('dish exists under ',reviewer_name)
                                #     print(dishes_element.split('Recommended dishes'))
                                match = re.search(r'Recommended dishes\n(.*?)(?=\n\n|\Z)', dishes_element)
                                if match:
                                    dishes=match.group(1)
                                    print(dishes)
                                else: 
                                    pass
                            except NoSuchElementException:
                                pass
                        except:
                            pass
                        
                        # RATING
                        rating_element = i.find_element(By.XPATH, './/span[@class=\'lTi8oc z3HNkc\']')
                        rating = rating_element.get_attribute('aria-label')
                        rating_score = float(rating.split(" ")[1])

                        # CSV WRITE IN PLACE.CSV
                        csvwriter.writerow([reviewer_name, review_text, rating_score, dishes])

                        number_of_reviews += 1
                        
                        # COUNTER
                        if number_of_reviews >= 20:
                            break

                    except Exception as e:
                        print(f"Error processing review: {e}")
                        pass

        except NoSuchElementException:
            if driver.find_elements(By.CSS_SELECTOR, 'div.YzSd'):
                try:
                    places_box = driver.find_element(By.CLASS_NAME, 'cXedhc')
                    print("multiple restaurants found")
                    address = places_box.find_element(By.XPATH, ".//div[@class=\"rllt__details\"]/div[3]").text
                    print(address)
                    main_function(place, address) # new address

                except:
                    print("restaurant not found")
            else:
                print("restaurant not found")

# main_function("pune", ["jama","bebo"])