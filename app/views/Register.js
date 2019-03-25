import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Alert, AsyncStorage } from 'react-native';

export class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            passwrd: '',
            passwrdConfirm: ''
        };
    };

    cancelRegister = () => {
        Alert.alert('Registration cancelled');
        this.props.navigation.navigate('HomeRT');
    };

    registerAccount= () => {
        if ( !this.state.username ) {
            Alert.alert('Please enter a username')
        }
        else if (this.state.passwrd !== this.state.passwrdConfirm) {
            Alert.alert('Password do not match')
        }
        else {
            AsyncStorage.getItem(this.state.username, (err, result) => {
                if (result !== null) {
                    Alert.alert(`${this.state.username} already exists`);
                }
                else {
                    AsyncStorage.setItem(this.state.username, this.state.passwrd, (err, result) => {
                        Alert.alert(`${this.state.username} account created`);
                        this.props.navigation.navigate('HomeRT');
                    });
                }
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}> Register Account</Text>
                <Text style={styles.labels}> Enter Username</Text>
                <TextInput
                    style={styles.inputs}
                    onChangeText={(text) => this.setState({username: text})}
                    value={this.state.username}
                />
                <Text style={styles.labels}> Enter Password </Text>
                <TextInput
                    style={styles.inputs}
                    onChangeText={(text) => this.setState({passwrd: text})}
                    value={this.state.passwrd}
                    secureTextEntry={true}
                />
                <Text style={styles.labels}> Confirm Password </Text>
                <TextInput
                    style={styles.inputs}
                    onChangeText={(text) => this.setState({passwrdConfirm: text})}
                    value={this.state.passwrdConfirm}
                    secureTextEntry={true}
                />
                <TouchableHighlight onPress={this.registerAccount} underlayColor='#31e981'>
                    <Text style = {styles.buttonRegister}>
                        Register
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.cancelRegister} underlayColor='#31e981'>
                    <Text style = {styles.buttons}>
                        Cancel
                    </Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: '50%',
        paddingTop: '10%'
    },
    heading: {
        fontSize: 25,
        flex: 1,
        padding: 20,
        'paddingBottom': 40,
        color: '#35605a'
    },
    inputs: {
        flex: 1,
        width: '80%',
        borderBottomColor: '#35605a',
        borderBottomWidth: 2
    },
    buttons: {
        marginTop: 15,
        fontSize: 16,
        color: '#35605a'
    },
    buttonRegister: {
        marginTop: 15,
        fontSize: 16,
        color: '#35605a',
        borderRadius: 20,
        borderWidth: 2,
        padding: 15,
        borderColor: '#cccccc',
        alignItems: 'center',
        justifyContent: 'center'
    },
    labels: {
        flex: 1
    }
});