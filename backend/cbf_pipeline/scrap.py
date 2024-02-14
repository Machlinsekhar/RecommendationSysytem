import os
from cbf_pipeline.call_loc import search_loc

def check_path(location):
    full_path = f"backend/dataset/{location}"
    print(full_path)

    if os.path.exists(full_path) and os.path.isdir(full_path):
        print('exists')
        return True
    else:
        print('does not exist')
        search_loc(location)
        return False

# location = 'bandra'
# check_path(location)