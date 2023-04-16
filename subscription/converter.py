import decimal

import requests

CONVERT_URL = 'https://api.exchangerate-api.com/v4/latest/USD'
BASE_CURRENCY = 'USD'


class RealTimeCurrencyConverter(object):
    def __init__(self, url):
        self.data = requests.get(url).json()
        self.currencies = self.data['rates']

    def convert(self, from_currency, to_currency, amount):
        initial_amount = amount
        # first convert it into USD if it is not in USD.
        # because our base currency is USD
        if from_currency.upper() != BASE_CURRENCY:
            amount = amount / self.currencies[from_currency.upper()]
        # limiting the precision to 2 decimal places
        amount = round(amount * decimal.Decimal(self.currencies[to_currency]), 4)
        return amount


converter = RealTimeCurrencyConverter(CONVERT_URL)
