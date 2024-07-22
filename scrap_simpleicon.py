import json
import sqlite3

# Charger les données depuis le fichier JSON
with open('icons_data.json', 'r') as json_file:
    icons_data = json.load(json_file)

# Se connecter à la base de données SQLite
conn = sqlite3.connect('./dev.db')
cursor = conn.cursor()

# Mettre à jour la base de données
for icon in icons_data:
    icon_name = icon['icon_name']
    display_name = icon['name']
    color = icon['color']
    
    # Mettre à jour la table 'icons' avec les nouvelles valeurs
    cursor.execute('''
        UPDATE icons
        SET display_name = ?, color = ?
        WHERE icon_name = ?
    ''', (display_name, color, icon_name))

# Sauvegarder (commit) les changements et fermer la connexion
conn.commit()
conn.close()

print("Mise à jour de la base de données terminée.")