#!/usr/bin/env python3.10

import requests
import os

response = requests.get('https://api.gemini.com/v1/pricefeed')
jsonResponse = response.json()

for i in jsonResponse:
    if i["pair"] == "BTCUSD":
        os.system('sketchybar -m --set btc label=' + i["price"])
        break
