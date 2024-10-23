import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';

const FlipCard = ({ frontImage, title, description }: { frontImage: string, title: string, description: string }) => {
    const [flipped, setFlipped] = useState(null);
    const flipAnim = useRef(new Animated.Value(0)).current;

    const flipToFront = () => {
        Animated.timing(flipAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => setFlipped(false));
    };

    const flipToBack = () => {
        Animated.timing(flipAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start(() => setFlipped(true));
    };

    const flipCard = () => {
        if (flipped) {
            flipToFront();
        } else {
            flipToBack();
        }
    };

    const frontInterpolate = flipAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    const backInterpolate = flipAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['180deg', '360deg'],
    });

    const frontAnimatedStyle = {
        transform: [{ rotateY: frontInterpolate }],
    };

    const backAnimatedStyle = {
        transform: [{ rotateY: backInterpolate }],
    };

    return (
        <TouchableWithoutFeedback onPress={flipCard}>
            <View style={styles.flipCardContainer}>
                <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                    <Image source={{ uri: frontImage }} style={styles.flipCardImage} />
                    <Text style={styles.textShadow}>{title}</Text>
                </Animated.View>
                <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle]}>
                    <Text style={styles.flipCardDescription}>{description}</Text>
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    flipCardContainer: {
        width: 300,
        height: 300,
        marginBottom: 20,
    },
    flipCard: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backfaceVisibility: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        overflow: 'hidden',
    },
    flipCardBack: {
        backgroundColor: '#313131',
    },
    flipCardImage: {
        width: '100%',
        height: 200,
    },
    flipCardDescription: {
        fontSize: 14,
        color: '#999',
    },
    textShadow: {
        fontSize: 20,
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -10, height: 1 },
        textShadowRadius: 10,
        marginTop: 10,
    },
});

export default FlipCard;