#!/usr/bin/env python
# coding: utf-8

# In[23]:


import pandas as pd
import requests
import matplotlib.pyplot as plt

# API endpoint URL
url = 'https://api.openweathermap.org/data/3.0/onecall'
params = {
    'lat': 17.3850,  # Latitude of the location
    'lon': 78.4867,  # Longitude of the location
    'exclude': 'part',  # Parts of weather data to exclude
    'appid': '4fb3b1abdab60488ace9f41ed7e0c1b0'  # Your OpenWeatherMap API key
}

# Send GET request to the API
response = requests.get(url, params=params)

# Check if the request was successful (status code 200)
if response.status_code == 200:
    # Convert the response to JSON format
    data = response.json()

    # Extract temperature data
    temperatures_kelvin = [hour['temp'] for hour in data['hourly']]
    
    # Convert temperatures to Celsius
    temperatures_celsius = [temp - 273.15 for temp in temperatures_kelvin]

    # Create a pandas DataFrame from the temperature data
    df = pd.DataFrame({'Temperature (C)': temperatures_celsius})
    
    print(df)

    # Plot the temperature graph
    plt.plot(df.index, df['Temperature (C)'])
    plt.xlabel('Time')
    plt.ylabel('Temperature (C)')
    plt.title('Temperature Variation')
    plt.show()
else:
    # Print an error message if the request was not successful
    print('Error:', response.status_code)

