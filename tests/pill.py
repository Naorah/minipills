#
# Test for the one_pill
#
import requests

URL = "http://localhost:5173/pill?e"

# What needs to be tested ?
# -> fail if no 1t
# -> ok if 1t
# -> ok if 1t 1c
# -> ok if 1t 1bc
# -> ok if 1t 1c 1bc
# -> ok if 1t l
# -> ok if 1t lc
# -> ok if 1t l lc

param_dict = {
  "1t"  : "&1t=first",
  "1c"  : "&1c=eeeeee",
  "1bc" : "&1bc=aa0000",
  "2t"  : "&2t=second",
  "2c"  : "&2c=3333ee",
  "2bc" : "&2bc=eeeeee",
  "3t"  : "&3t=third",
  "3c"  : "&3c=212121",
  "3bc" : "&3bc=00aa00",
  "l"   : "&l=minipills",
  "lc"  : "&lc=ee0022",
  "s"   : "&s",
  "sc"  : "&sc=2.5",
}

test_load = [
  {"result": False, "data": []},
  {"result": True,  "data": ["1t"]},
  {"result": True,  "data": ["1t", "1c"]},
  {"result": True,  "data": ["1t", "1bc"]},
  {"result": True,  "data": ["1t", "1c", "1bc"]},
  {"result": True,  "data": ["1t", "l"]},
  {"result": True,  "data": ["1t", "lc"]},
  {"result": True,  "data": ["1t", "l", "lc"]},
  {"result": True,  "data": ["1t", "1c", "l"]},
  {"result": True,  "data": ["1t", "1bc", "l"]},
  {"result": True,  "data": ["1t", "1c", "l", "lc"]},
  {"result": True,  "data": ["1t", "1bc", "l", "lc"]},
  {"result": True,  "data": ["1t", "1c", "1bc", "l", "lc"]},
  {"result": True,  "data": ["1t", "1c", "1bc", "l", "lc", "s"]},
  {"result": True,  "data": ["1t", "1c", "1bc", "l", "lc", "sc"]},
  {"result": False, "data": ["1c"]},
  {"result": False, "data": ["1bc"]},
  {"result": False, "data": ["1c", "1bc"]},
  {"result": False, "data": ["l"]},
  {"result": False, "data": ["lc"]},
  {"result": False, "data": ["l", "lc"]},
  {"result": False, "data": ["1c", "l"]},
  {"result": False, "data": ["1bc", "l"]},
  {"result": False, "data": ["1c", "l", "lc"]},
  {"result": False, "data": ["1bc", "l", "lc"]},
  {"result": False, "data": ["1c", "1bc", "l", "lc"]},
  {"result": False, "data": ["1c", "1bc", "l", "lc", "s"]},
  {"result": False, "data": ["1c", "1bc", "l", "lc", "sc"]},
  {"result": False, "data": ["2t"]},
  {"result": False, "data": ["3t"]},
  {"result": True,  "data": ["1t", "2t"]},
  {"result": True,  "data": ["1t", "1c", "2t", "3t"]},
  {"result": True,  "data": ["1t", "2bc", "2bc"]},
  {"result": True,  "data": ["1t", "2c", "2bc"]},
  {"result": True,  "data": ["1t", "3t", "l"]},
  {"result": True,  "data": ["1t", "1c", "1bc", "2t", "2c", "2bc", "3t", "3c", "3bc", "l", "lc", "sc", "s"]},
]

def get_response(url):
  try:
    # Effectuer la requête GET
    response = requests.get(url)
    return response
      
  except requests.RequestException as e:
    # Gérer les exceptions potentielles
    print(f"Une erreur est survenue : {e}")



def check_result(nb, response, goal):
  """
  check_result : function:
  -----
  Params:
  nb       : test number
  response : response after calling the api
  goal     : objective of the test ( can be positive or negative )
  -----
  Result:
  """
  result = False

  if str(response.status_code) == "200" and "misused" not in str(response.content): 
    result = True

  if result == goal:
    print(f"{nb} passed")
    return True
  else:
    print(f"{nb} failed")
    return False
  

if __name__ == "__main__":
  """
  Main program
  """
  counter = 0
  for test in test_load:
    # build the url
    final_url = URL
    for data in test['data']:
      final_url += param_dict[data]
    # call the api
    response = get_response(final_url)
    # check if right results
    if not check_result(counter, response, test['result']):
      print(final_url)
    counter += 1
