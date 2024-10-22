import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Logo from '../components/logo/logo';

export default function App() {
  const Button = ({ onPress, text }: { onPress: () => void; text: string }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
  const [display, setDisplay] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  const addToHistory = (expression: string, result: string) => {
    setHistory((prevHistory) => [...prevHistory, `${expression} = ${result}`]);
  };

  const handlePress = (input: string) => {
    if (input === '=') {
      try {
        const result = eval(display).toString();
        setDisplay(result);
        addToHistory(display, result);
      } catch {
        setDisplay('Error');
      }
    } else if (input === 'clear') {
      setDisplay('');
    } else {
      setDisplay((prev) => prev + input);
    }
  };

  const buttons = [
    ['clear', '=', '+'],
    ['7', '8', '9', '-'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '/'],
    ['.','0', '%', '^'],
  ];

  return (
    <View style={styles.container}>
      <Logo />
      
        <View>
        <Text style={styles.text}>History:</Text>
        {history.map((entry, index) => (
          <Text key={index} style={styles.text}>{entry}</Text>
        ))}
      </View>
      <Text style={styles.display}>{display || '0'}</Text>
      {buttons.map((row, i) => (
        
        <View key={i} style={styles.row}>
          {row.map((text, j) => (
            <Button key={j} text={text} onPress={() => handlePress(text)} />
          ))}
        </View>
      ))}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F5F8',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 300,
  },
  display: {
    fontSize: 64,
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    margin: 5,
    minWidth: 64,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
  },
  text: {
    margin: 10,
  },
});