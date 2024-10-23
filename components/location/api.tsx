import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import FlipCard from './FlipCard';

type Annonce = {
    image: string;
    ville: string;
    codePostal: string;
    prix: number;
};

// Api Component containing both the fetching logic and the FlipCard structure
const Api = () => {
    const [annonces, setAnnonces] = useState<Annonce[]>([]);

    // Fetching data from the API
    useEffect(() => {
        const fetchAnnonces = async () => {
            try {
                const response = await fetch('http://192.168.1.61:3000/annonces');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: Annonce[] = await response.json();
                setAnnonces(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchAnnonces();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Liste des Annonces :</Text>
            {annonces.length > 0 ? (
                annonces.map((annonce, index) => (
                    <FlipCard
                        key={index}
                        frontImage={annonce.image}
                        title={`${annonce.ville} - ${annonce.codePostal}`}
                        description={`Prix : ${annonce.prix} €`}
                    />
                ))
            ) : (
                <Text style={styles.noAnnonces}>Pas d'annonces</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    buttonContainer: {
        marginBottom: 20,
    },
    noAnnonces: {
        fontSize: 18,
        color: 'gray',
    },
});

export default Api;