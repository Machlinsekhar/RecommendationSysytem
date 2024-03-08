import os
from extract_from_json import main_connect

def check_path(location):

    status = main_connect(location)
    return status


# location = 'bandra'
# check_path(location)