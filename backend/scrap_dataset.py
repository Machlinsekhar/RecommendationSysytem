    
import csv

from selenium import webdriver
from selenium.webdriver.common.by import By
from typing import List

# Waits for an element to disappear if it exists
from selenium.webdriver.remote.webelement import WebElement
from selenium.common.exceptions import NoSuchElementException


def wait_for_element_to_disappear(by: By, string: str):
    while True:
        try:
            elements = driver.find_elements(by, string)
            if len(elements) == 0:
                break
        except:
            pass

# Waits for an element to appear and returns that element
def wait_for_element(by: By, string: str) -> WebElement:
    while True:
        try:
            element = driver.find_element(by, string)
            break
        except:
            pass
    return element

# Waits for an element to appear and returns that element
def wait_for_elements(by: By, string: str) -> List[WebElement]:
    while True:
        try:
            elements = driver.find_elements(by, string)
            break
        except:
            pass
    return elements

REVIEWS_TAB_XPATH = '//button[@role="tab" and @data-tab-index="1"]'
LOADING_ICON_XPATH = '//div[@class="qjESne "]'
REVIEW_PARENT_CONTAINER = '//div[@data-review-id]'
REVIEW_CONTAINER = "//div[contains(@aria-label,'stars')]/../../../.."

# 'https://maps.app.goo.gl/LRoViM8hH4D3PtMd7', 'https://maps.app.goo.gl/srrPnKFCHN96uq3y5',

driver = webdriver.Chrome()
links = [ 'https://maps.app.goo.gl/LRoViM8hH4D3PtMd7']
for link in links:
    driver.get(link)
    title = wait_for_element(By.XPATH, '//div[@aria-label and @role ="main"]').get_attribute('aria-label')
    
    # Extract expense
    try: 
        expense_element = driver.find_element(By.XPATH, '//*[@id="QA0Szd"]/div/div/div[1]/div[2]/div/div[1]/div/div/div[2]/div/div[1]/div[2]/div/div[1]/span/span/span/span[2]/span/span')
        expense_label = expense_element.get_attribute('aria-label')
        expense_word = expense_label.split(":")[1].strip().lower()
        type_element = driver.find_element(By.XPATH, '//*[@id="QA0Szd"]/div/div/div[1]/div[2]/div/div[1]/div/div/div[2]/div/div[1]/div[2]/div/div[2]/span/span/button')
        restaurant_type = type_element.text
        print(expense_word, restaurant_type)
    except NoSuchElementException:
        expense_word = "N/A"
        restaurant_type = "N/A"
        print(expense_word, restaurant_type)

    wait_for_element(By.XPATH, REVIEWS_TAB_XPATH).click()
    i = 0
    previous_height = 0
    while True:
        review_container = wait_for_element(By.XPATH, REVIEW_CONTAINER)
        review_container.send_keys('                                                                   ')
        height = wait_for_element(By.XPATH, REVIEW_PARENT_CONTAINER+'/..').rect['height']
        print(height)
        if height > previous_height:
            previous_height = height
            i = 0
        i += 1
        if i >= 30 or len(driver.find_elements(By.XPATH, '//div[@data-review-id and @aria-label]')) >= 30:
            break
    
reviews = driver.find_elements(By.XPATH, '//div[@data-review-id and @aria-label]')
with open(f"{title}.csv", 'w', newline='', encoding='utf-8') as csvfile:
        # creating a csv writer object
        csvwriter = csv.writer(csvfile)
        csvwriter.writerow(["Reviewer", "Review", "Rating", "Expense", "Type"])
        number_of_reviews = 0
        for i in reviews:
            try:
                # Extract reviewer's name
                reviewer_name = i.find_element(By.XPATH, './/div[@class="d4r55 "]').text.encode("utf-8").decode('utf-8')
                
                # Extract review text
                review_text = i.find_element(By.XPATH, './/span[@class="wiI7pd"]').text.encode("utf-8").decode('utf-8')
                
                # Extract rating
                rating_element = i.find_element(By.XPATH, './/span[@class="kvMYJc" and @role="img" and @aria-label]')
                rating = rating_element.get_attribute('aria-label')

                csvwriter.writerow([reviewer_name, review_text, rating, expense_word, restaurant_type])
                number_of_reviews += 1
                if number_of_reviews >= 50:
                    break

                # span = i.find_element(By.XPATH, './/span[@class="wiI7pd"]')
                # csvwriter.writerow([str(i.find_element(By.XPATH, './/div[@class="d4r55 "]').text.encode("utf-8").decode('utf-8')), str(span.text.encode("utf-8").decode('utf-8'))])
            except Exception as e:
                print(f"Error processing review: {e}")
                pass