import React, { useEffect, useState } from 'react';
import { Input } from './components';
import useCurrencyInfo from './hooks/useCurrencyInfo';

const App = () => {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <>
      <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat bg-[url('https://plus.unsplash.com/premium_photo-1681437744904-d815bc19c2f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3VycmVuY3l8ZW58MHx8MHx8fDA%3D')]">
        <div className="w-full">
          <div className="w-full max-w-md mx-auto border border-gray-50 rounded-lg p-5 backdrop-blur-sm bg-white/30">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                convert();
              }}>
              <div className="w-full mb-1">
                <Input
                  label="From"
                  amount={amount}
                  currencyOptions={options}
                  onAmountChange={(amount) => setAmount(amount)}
                  onCurrencyChange={(currency) => setFrom(currency)}
                  selectCurrency={from}
                />
              </div>
              <div className="w-full h-0.5 relative">
                <button 
                  type="button"
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-300 px-3 py-0.5 rounded-lg"
                  onClick={swap}>
                  Swap
                </button>
              </div>
              <div className="w-full mt-1 mb-4">
                <Input
                  label="To"
                  amount={convertedAmount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => setTo(currency)}
                  selectCurrency={to}
                  amountDisabled
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-900 text-white px-4 py-3 rounded-lg">
                Convert {from} to {to}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
