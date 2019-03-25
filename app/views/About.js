import React from 'react';
import { StyleSheet, Text, ScrollView, Image } from 'react-native';

const aboutSite = `This site is awesome `;
const whatSite = ` Truly Awesome `;

export class About extends React.Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.aboutText}>{aboutSite}</Text>
                <Text style={styles.aboutText}>{whatSite}</Text>
                <Text onPress={() => this.props.navigation.goBack()} style={styles.backButton}>Go Back</Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    aboutText: {
        padding: 10,
        fontSize: 30
    },
    backButton: {
        padding: 15,
        textAlign: 'center',
        borderWidth: 3,
        borderColor: "#35605a",
        borderRadius: 20,
        fontSize: 35
    }
});