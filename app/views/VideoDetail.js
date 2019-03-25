import React from 'react';
import { Text, View, WebView } from 'react-native';

export class VideoDetail extends React.Component {

    render() {
        let tubeId = this.props.navigation.getParam('ytubeId', 'NO VIDEO');
        let tubeUrl = `https://www.youtube.com/embed/${tubeId}`;
        return (
            <WebView
                style={{marginTop: 20}}
                javaScriptEnabled={true}
                source={{uri: tubeUrl}}
            />
        )
    }
}