import os
from backend.connect import main_connect

def check_path(location):

    status = main_connect(location)
    return status


# location = 'bandra'
# check_path(location)