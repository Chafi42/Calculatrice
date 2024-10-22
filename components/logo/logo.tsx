import React, { useState } from 'react';
import { Image, StyleSheet, Dimensions, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importation de l'icône
import { Link } from 'expo-router'; // Importation du composant Link

const { width, height } = Dimensions.get('window'); 

const Logo = () => {
    const [menuVisible, setMenuVisible] = useState(false); // État pour contrôler la visibilité du menu déroulant

    // Fonction pour basculer le menu déroulant
    const toggleMenu = () => {
        setMenuVisible((prevState) => !prevState);
    };

    return (
        <View style={styles.container}>
            <Image 
                style={styles.logo} 
                source={require('../../assets/images/garage.png')} 
                resizeMode="contain" 
            />
            <TouchableOpacity onPress={toggleMenu}>
                <Ionicons name="menu" size={32} color="black" style={styles.menu} />
            </TouchableOpacity>

            {menuVisible && (
                <View style={styles.dropdown}>
                    <TouchableOpacity style={styles.menuItem}>
                        <Link href="/">
                            <Text>Accueil</Text>
                        </Link>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <Link href="/calculette">
                            <Text>Calculatrice</Text>
                        </Link>
                    </TouchableOpacity>
                </View>
            )}
        </View> 
    );
};

const styles = StyleSheet.create({
    logo: {
        width: width * 0.4, // Le logo prend 40% de la largeur de l'écran
        height: height * 0.4, // Hauteur égale à la largeur pour garder une forme carrée
        marginBottom: 350,
        marginRight: 170,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 150,
        position: 'relative', // Changed from 'absolute' to 'relative'
    },
    menu: {
        position: 'absolute',
        top: -538,
        left: 100,
    },
    dropdown: {
        position: 'absolute',
        top: -140,
        right: 20,
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 1,
    },
    menuItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default Logo;
