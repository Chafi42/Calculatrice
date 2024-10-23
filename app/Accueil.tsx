import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Logo from '../components/logo/logo';
import { Link } from 'expo-router';

export default function App() {
  return (
    <View style={styles.container}>

      <Logo />

      <Text style={styles.title}>L'école du numérique pour tous·tes !</Text>

      <Text style={styles.subtitle}>
        Maîtrise ton avenir et comprends les outils numériques en les codant.
      </Text>

      <Text style={styles.description}>
        Garage404 est une école qui s’est donné pour mission d’enseigner le numérique à tous·tes à travers des parcours éducatifs pour les enfants, les ados et pour les adultes avec des formations métiers professionnalisantes.
      </Text>
      <Link style={styles.button} href="/Calculatrice">
        <Text style={styles.buttonText}>Calculatrice</Text>
      </Link>
      <Link style={styles.button} href="/Location">
        <Text style={styles.buttonText}>Calculatrice</Text>
      </Link>
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
    paddingVertical: 210,
    
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c2c2c',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#00b894',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#636e72',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#6c5ce7',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
