import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

interface Annonce {
    image: string;
    ville: string;
    codePostal: string;
    prix: number;
}

interface ButtonProps {
    annonces: Annonce[];
    setAnnonces: (annonces: Annonce[]) => void;
}

const AnnonceButton: React.FC<ButtonProps> = ({ annonces, setAnnonces }) => {
    return (
        <View style={styles.buttonContainer}>
            <Button
                title="Ajouter Annonce"
                onPress={() => {
                    const newAnnonce: Annonce = {
                        image: 'https://via.placeholder.com/150',
                        ville: 'Paris',
                        codePostal: '75000',
                        prix: 100000,
                    };
                    setAnnonces([...annonces, newAnnonce]);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        margin: 10,
    },
});

export default AnnonceButton;
