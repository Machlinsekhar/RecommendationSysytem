from selenium import webdriver
from dotenv import load_dotenv
from selenium.webdriver.chrome.service import Service
import os
from selenium.webdriver.common.by import By
import csv
load_dotenv()

driver_directory = os.getenv("DRIVER_DIRECTORY")

# Initialize the Chrome driver
service = Service(executable_path=f"{driver_directory}")
driver = webdriver.Chrome(service=service)

# Open the webpage
driver.get("https://daltonluka.com/blog/google-my-business-categories")

# Find the ul element by XPath
ul_element = driver.find_element(By.XPATH, "/html/body/article/div/div/ul[3]")

# Find all li elements within the ul
li_elements = ul_element.find_elements(By.TAG_NAME, "li")

# Empty list to store restaurant names
restaurant_names = []

# Loop through each li element
for li in li_elements:
    # Get the text of the li element
    li_text = li.text
    # Split the text into words
    words = li_text.split()
    # Check if the last word is "restaurant"
    if words[-1].lower() == "restaurant":
        # If it is, append it to the list of restaurant names
        restaurant_names.append(li_text)

# Close the browser
driver.quit()

# Write restaurant names to a CSV file
with open("restaurant_names.csv", "w", newline="") as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(["Restaurant Names"])
    for name in restaurant_names:
        writer.writerow([name])

print("Data written to restaurant_names.csv file successfully.")
