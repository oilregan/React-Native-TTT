import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Alert } from 'react-native';
import { Button, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }
    checkPass() {
        if ((this.state.username == 'Admin') && (this.state.password === '123456')) {
            Actions.contentfeed();
        } else {
            Alert.alert(
                'Username หรือ Password ไม่ถูกต้อง',
                'Username หรือ Password ลองใหม่อีกครั้ง',
                [
                    { text: 'ลองอีกครั้ง' }
                ],
                { cancelable: false }

            );
        }
    }
    render() {
        return (
            <Image source={require('../Images/BG.jpg')}
                style={[styles.loginBG, {
                    backgroundColor: 'transparent'
                }]}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    padding: 20
                }}>
                    <Image source={require('../Images/second.png')} style={{
                        width: 150,
                        height: 150,
                        alignSelf:'center',
                        marginBottom:20
                    }} />
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <View style={styles.viewHalf}>
                            <Text style={styles.strongLabel}>Username :</Text>
                        </View>
                        <View style={styles.view2_3}>
                            <TextInput
                                placeholder="Username"
                                onChangeText={(username) => this.setState({ username })}
                                style={styles.loginInput}
                            />
                        </View>

                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 10
                    }}>
                        <View style={styles.viewHalf}>
                            <Text style={styles.strongLabel}>Password :</Text>
                        </View>
                        <View style={styles.view2_3}>
                            <TextInput
                                placeholder="Password"
                                onChangeText={(password) => this.setState({ password })}
                                style={styles.loginInput}
                                secureTextEntry={true}
                            />
                        </View>

                    </View>

                    <View style={{
                        marginTop: 20,
                        marginLeft:120
                    }}>
                        <Button outline light bordered
                            onPress={this.checkPass.bind(this)}
                        >
                            <Icon name="md-contact" />
                            <Text style={{
                                color: 'white',
                                fontWeight: 'bold'
                            }}>Login</Text>
                        </Button>
                    </View>
                </View>
            </Image>
        );
    }
}
const styles = StyleSheet.create({
    loginBG: {
        flex: 1,
        width: null,
        justifyContent: 'center',
        height: null
    },
    viewHalf: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        marginRight: 10
    },
    view2_3: {
        flex: 2,
        backgroundColor: 'transparent'
    },
    strongLabel: {
        fontWeight: 'bold',
        color: '#ffffff',
        fontSize: 16
    },
    loginInput: {
        height: 35,
        padding: 10,
        backgroundColor: 'white'
    }
});
export default Login;
