import React, { Component } from 'react';
import { Alert, TextInput, View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';

export default class App extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "SNS LOGIN",
      headerStyle: {
        backgroundColor: "rgba(92, 99,216, 1)"
      },
      headerTintColor: 'white',
    };
  };
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
      data: [],
      error: null,
      refreshing: false,
      base_url: "https://api.jsonbin.io/b/5c0c0811c10055104caa1325/2",
      // base_url: "127.0.0.1:8000/bloguser" 
      loading: false,
    };
  }
 
  componentDidMount() {
    this.fetchDataFromApi();
  }

  fetchDataFromApi = () => {
    const url = "https://api.jsonbin.io/b/5c0c0811c10055104caa1325/2";
    // base_url: "127.0.0.1:8000/bloguser" 

    this.setState({ loading : true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res,
          error: null,
          loading: false,
          refreshing: false,
        });
      })
      .catch(error => {
        this.setState({ error, loading : false });
      })
  };

  onLogin() {
    const{
      navigation,
    } = this.props;
    const { 
      username, 
      password,
      data,
    } = this.state;

    var hasMatch =false;

    for (var index = 0; index < data.length; ++index) {

     var jsonObject = data[index];

     if(jsonObject.first_name == username && jsonObject.last_name == password){
      hasMatch = true;
      navigation.navigate('Category', jsonObject);
       break;
     }
    }
    if(hasMatch == false){
      Alert.alert('Invalid Credentials. Try Again.');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Please log in to continue
        </Text>
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          placeholder={'Username'}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />
        <Button
          onPress={this.onLogin.bind(this)}
          title='LOG-IN'
          buttonStyle={{
            backgroundColor: "rgba(92, 99,216, 1)",
            width: 200,
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5
          }}
          containerStyle={{ marginTop: 50 }}
        />
        <Text style={styles.notification}>
          Please Note: Only existing users can use the mobile app. If you do
          not already have an account, please register through the official website.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ecf0f1',
  },
  header: {
    fontSize: 20,
    paddingTop: 50,
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  notification: {
    paddingTop: 200,
    color: 'red',
  }
});
