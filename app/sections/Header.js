import React from 'react';
import { StyleSheet, Text, View, Image, AsyncStorage, Alert } from 'react-native';

export class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            loggedUser: false
        };
    }

    toggleUser = () => {
        if (this.state.isLoggedIn) {
            AsyncStorage.setItem('userLoggedIn', 'none', (err, result) => {
                this.setState({
                    isLoggedIn: false,
                    loggedUser: false
                });
                Alert.alert('User Logged Out');
            })
        }
        else {
            this.props.navigate('LoginRT')
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('userLoggedIn', (err, result) => {
            if ( result === 'none' ) {
                console.log('NONE');
            }
            else if (result === null) {
                AsyncStorage.setItem('userLoggedIn', 'none', (err, result) => {
                    console.log('Set user to NONE');
                })
            }
            else {
                this.setState({
                    isLoggedIn: true,
                    loggedUser: result
                });
            }

        })
    }

    render() {
        let display = this.state.isLoggedIn ? `${this.state.loggedUser} - Log Out` : this.props.message;
        return (
            <View style={styles.headStyle}>
                <Image 
                    style={styles.logoStyle}
                    source={ require('./img/logoIntel.png')}
                />
                <Text 
                    style={styles.headText}
                    onPress={this.toggleUser}>{display}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headText: {
        textAlign: 'right',
        color: '#35605a',
        marginRight: 20,
        fontSize: 20,
        flex: 1
    },
    headStyle: {
        paddingTop: 60,
        paddingRight: 10,
        backgroundColor: 'lightgray',
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 4,
        borderColor: '#35605a'
    },
    logoStyle: {
        flex: 1,
        marginBottom: 20,
        marginRight: 15,
        width: undefined,
        height: undefined,
    }
});
