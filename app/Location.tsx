import React from 'react';
import { View, StyleSheet } from 'react-native';
import FlipCard from '../components/location/FlipCard';
import Api from '../components/location/api';
import AnnonceButton from '../components/location/button';

const Location = () => {
    return (
        <View>
            <Api />
            <FlipCard frontImage="image_url" title="Card Title" description="Card Description" />
            <AnnonceButton annonces={[]} setAnnonces={() => {}} />
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        margin: 10,
    },
});

export default Location;
