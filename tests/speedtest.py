import requests
import time
import statistics
from random import choice

def get_response_time(url):
  # Enregistrer le temps avant la requête
  start_time = time.time()
  
  try:
    # Effectuer la requête GET
    response = requests.get(url)
    
    # Enregistrer le temps après la requête
    end_time = time.time()
    
    # Calculer le temps de réponse
    response_time = end_time - start_time
    return response_time
      
  except requests.RequestException as e:
    # Gérer les exceptions potentielles
    print(f"Une erreur est survenue : {e}")

# Exemple d'utilisation

def new_text():
  text = ""
  alphabet = "azertyuiopqsdfghjklmwxcvbn"
  for i in range(0, 20): 
    text += choice(alphabet)
  return text


urls = [
  {"name": "Minipills",  "url": "https://minipills.pelsy.net/pill?1t=coucou"},
  {"name": "Shield.io",  "url": "https://img.shields.io/badge/any_text_i_like-grey"},
  {"name": "Badgen.net", "url": "https://badgen.net/badge/this/test"},
  {"name": "Badger.space",  "url": "https://badgers.space/badge/server/offline"},
  {"name": "Badger.space",  "url": "https://badgers.space/badge/server/offline"}
]

for url in urls:
  time_keeper = []
  for i in range(0,200):
    time_keeper.append(get_response_time(url))
    time.sleep(0.2)
  print(f"Temps de réponse pour {url}: {statistics.mean(time_keeper)}")