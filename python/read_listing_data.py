# import csv

# with open('data/listings.csv', mode='r') as file:
#     csvFile = csv.reader(file)

#     for lines in csvFile:
#         print(lines)

import pandas as pd
 
# reading the CSV file
df = pd.read_csv('data/listings.csv')
 
# displaying the contents of the CSV file
df.to_json('data.json', orient='records')
