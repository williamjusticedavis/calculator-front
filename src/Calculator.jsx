import React, { useState } from 'react';

const Calculator = () => {
  const [display, setDisplay] = useState('');
  const [isScientific, setIsScientific] = useState(false);

  const appendToDisplay = (value) => {
    if (value === '.' && display.endsWith('.')) return; // Prevent consecutive dots
    // Prevent multiple dots within the same number
    if (value === '.' && /(\d*\.\d*)$/.test(display)) return;
    setDisplay(display + value);
  };

  const calculateResult = () => {
    try {
      setDisplay(eval(display).toString()); // Be cautious with eval, especially with user input
    } catch {
      setDisplay('Error');
    }
  };

  const clearDisplay = () => {
    setDisplay('');
  };

  const toggleScientificMode = () => {
    setIsScientific(!isScientific);
  };

  const handleApiCall = async () => {
    try {
      const response = await fetch('https://calculator-back-mn8p.onrender.com/api/trigger');
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      alert('API request failed.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-xs mx-auto p-4 bg-gray-800 rounded-lg shadow-lg">
      <input
        type="text"
        value={display}
        disabled
        className="w-full mb-4 p-3 text-right text-2xl bg-gray-700 text-white rounded"
      />
      <button
        onClick={toggleScientificMode}
        className="w-full p-2 mb-4 bg-yellow-500 text-white rounded hover:bg-yellow-600"
      >
        {isScientific ? "Basic Mode" : "Scientific Mode"}
      </button>

      <div className={`grid gap-2 ${isScientific ? 'grid-cols-5' : 'grid-cols-4'}`}>
        <button onClick={clearDisplay} className="p-4 bg-red-500 text-white rounded hover:bg-red-600">C</button>
        <button onClick={() => appendToDisplay('/')} className="p-4 bg-blue-500 text-white rounded hover:bg-blue-600">/</button>
        <button onClick={() => appendToDisplay('*')} className="p-4 bg-blue-500 text-white rounded hover:bg-blue-600">*</button>
        <button onClick={() => appendToDisplay('-')} className="p-4 bg-blue-500 text-white rounded hover:bg-blue-600">-</button>

        {isScientific && (
          <>
            <button onClick={() => appendToDisplay('(')} className="p-4 bg-gray-500 text-white rounded hover:bg-gray-600">(</button>
            <button onClick={() => appendToDisplay(')')} className="p-4 bg-gray-500 text-white rounded hover:bg-gray-600">)</button>
            <button onClick={() => appendToDisplay('Math.sin(')} className="p-4 bg-purple-500 text-white rounded hover:bg-purple-600">sin</button>
            <button onClick={() => appendToDisplay('Math.cos(')} className="p-4 bg-purple-500 text-white rounded hover:bg-purple-600">cos</button>
            <button onClick={() => appendToDisplay('Math.tan(')} className="p-4 bg-purple-500 text-white rounded hover:bg-purple-600">tan</button>

            <button onClick={() => appendToDisplay('Math.sqrt(')} className="p-4 bg-purple-500 text-white rounded hover:bg-purple-600">√</button>
            <button onClick={() => appendToDisplay('**')} className="p-4 bg-purple-500 text-white rounded hover:bg-purple-600">^</button>
            <button onClick={() => appendToDisplay('%')} className="p-4 bg-purple-500 text-white rounded hover:bg-purple-600">%</button>
          </>
        )}

        <button onClick={() => appendToDisplay('7')} className="p-4 bg-gray-600 text-white rounded hover:bg-gray-700">7</button>
        <button onClick={() => appendToDisplay('8')} className="p-4 bg-gray-600 text-white rounded hover:bg-gray-700">8</button>
        <button onClick={() => appendToDisplay('9')} className="p-4 bg-gray-600 text-white rounded hover:bg-gray-700">9</button>
        <button onClick={() => appendToDisplay('+')} className="p-4 bg-blue-500 text-white rounded hover:bg-blue-600">+</button>

        <button onClick={() => appendToDisplay('4')} className="p-4 bg-gray-600 text-white rounded hover:bg-gray-700">4</button>
        <button onClick={() => appendToDisplay('5')} className="p-4 bg-gray-600 text-white rounded hover:bg-gray-700">5</button>
        <button onClick={() => appendToDisplay('6')} className="p-4 bg-gray-600 text-white rounded hover:bg-gray-700">6</button>
        <button onClick={calculateResult} className="row-span-2 p-4 bg-green-500 text-white rounded hover:bg-green-600">=</button>

        <button onClick={() => appendToDisplay('1')} className="p-4 bg-gray-600 text-white rounded hover:bg-gray-700">1</button>
        <button onClick={() => appendToDisplay('2')} className="p-4 bg-gray-600 text-white rounded hover:bg-gray-700">2</button>
        <button onClick={() => appendToDisplay('3')} className="p-4 bg-gray-600 text-white rounded hover:bg-gray-700">3</button>
        <button onClick={() => appendToDisplay('0')} className="col-span-2 p-4 bg-gray-600 text-white rounded hover:bg-gray-700">0</button>
        <button onClick={() => appendToDisplay('.')} className="p-4 bg-gray-600 text-white rounded hover:bg-gray-700">.</button>
        <button onClick={handleApiCall} className="p-4 bg-purple-500 text-white rounded hover:bg-purple-600">API</button>
      </div>
    </div>
  );
};

export default Calculator;
