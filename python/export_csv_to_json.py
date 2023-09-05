import pandas as pd
 
# reading the CSV file
df = pd.read_csv('data/reviews.csv')
 
# displaying the contents of the CSV file
df.to_json('reviews.json', orient='records')