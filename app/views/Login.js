import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Alert, AsyncStorage } from 'react-native';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            passwrd: ''
        };
    };

    cancelLogin = () => {
        Alert.alert('Login cancelled');
        this.props.navigation.navigate('HomeRT');
    };

    loginUser = () => {
        if ( !this.state.username ) {
            Alert.alert('Please enter a Username')
        }
        else if ( !this.state.passwrd ) {
            Alert.alert('Please enter a Password')
        }
        else {
            AsyncStorage.getItem('userLoggedIn', (er, result) => {
                if ( result !== 'none') {
                    Alert.alert('Someone already logged on');
                    this.props.navigation.navigate('HomeRT');
                }
                else {
                    AsyncStorage.getItem(this.state.username, (err, result) => {
                        if ( result !== null ) {
                            if ( result !== this.state.passwrd) {
                                Alert.alert('Password incorrect')
                            }
                            else {
                                AsyncStorage.setItem('userLoggedIn', this.state.username, (err, result) => {
                                    Alert.alert(`${this.state.username} Logged In`);
                                    this.props.navigation.navigate('HomeRT');
                                });
                            }
                        }
                        else {
                            Alert.alert(`No account for ${this.state.username}`);
                        }
                    })
                }

            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>  Login </Text>
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
                 <TouchableHighlight onPress={this.loginUser} underlayColor='#31e981'>
                    <Text style = {styles.buttonsLogin}>
                        Login
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.cancelLogin} underlayColor='#31e981'>
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
    buttonsLogin: {
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