import React from 'react';
import { StyleSheet, Image } from 'react-native';

export class Hero extends React.Component {
    render() {
        return (
            <Image
                style={styles.heroImage}
                source={ require('./img/bigSizePhoto.jpeg')}
            />
        );
    }
}

const styles = StyleSheet.create ({
    heroImage: {
        flex: 8,
        width: undefined,
        height: undefined,
    }
})
