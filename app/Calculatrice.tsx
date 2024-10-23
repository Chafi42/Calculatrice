import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Logo from '../components/logo/logo';
const { height, width } = Dimensions.get('window');

const CalculatorButton = ({ onPress, text }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [value, setValue] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const handleDelete = () => {
    if (displayValue.length > 1) {
      setDisplayValue(displayValue.slice(0, -1));
    } else {
      setDisplayValue('0');
    }
  };

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplayValue(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
    }
  };

  const inputDot = () => {
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
      setWaitingForOperand(false);
    }
  };

  const clearDisplay = () => setDisplayValue('0');

  const toggleSign = () => {
    setDisplayValue((prev) => String(parseFloat(prev) * -1));
  };

  const inputPercent = () => {
    const currentValue = parseFloat(displayValue);
    if (currentValue !== 0) {
      setDisplayValue(String(currentValue / 100));
    }
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (value === null) {
      setValue(inputValue);
    } else if (operator) {
      const currentValue = value || 0;
      const newValue = calculate(currentValue, inputValue, operator);
      setValue(newValue);
      setDisplayValue(String(newValue));
      setHistory((prevHistory) => [...prevHistory, `${currentValue} ${operator} ${inputValue} = ${newValue}`]);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (left, right, operator) => {
    switch (operator) {
      case '/': return left / right;
      case '*': return left * right;
      case '+': return left + right;
      case '-': return left - right;
      default: return right;
    }
  };

  const handlePress = (button) => {
    if (/\d/.test(button)) {
      inputDigit(button);
    } else if (button === '.') {
      inputDot();
    } else if (button === 'C') {
      clearDisplay();
    } else if (button === '±') {
      toggleSign();
    } else if (button === '%') {
      inputPercent();
    } else if (button === 'Supp') {
      handleDelete();
    } else if (button === 'Clear History') {
      setHistory([]);
    } else {
      performOperation(button);
    }
  };

    const buttons = [
    ['C', '±', '%', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=', 'Supp'],
    ['Clear History']
  ];

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.display}>{displayValue}</Text>
      {buttons.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((button) => (
            <CalculatorButton
              key={button}
              text={button}
              onPress={() => handlePress(button)}
            />
          ))}
        </View>
      ))}
      <View style={styles.historyContainer}>
        {history.map((entry, index) => (
          <Text key={index} style={styles.historyText}>{entry}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  display: {
    fontSize: 64,
    color: 'white',
    textAlign: 'right',
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 1,
  },
  button: {
    backgroundColor: '#333',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    margin: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
  },
  historyContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  historyText: {
    color: 'white',
    fontSize: 20,
  },
});

export default Calculator;