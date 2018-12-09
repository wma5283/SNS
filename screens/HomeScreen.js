import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  onLogout = () =>{
    const{
      navigation,
    } = this.props;
    console.log('ha');
    navigation.navigate('Login');
  }

  onGoBack = () =>{
    const{
      navigation,
    } = this.props;
    console.log('ha');
    navigation.navigate('Home');
  }

  render() {
    const { navigation } = this.props;
    const authorName = navigation.getParam('author', 'NO_AUTHOR');
    const category = navigation.getParam('category', 'NO_CATEGORY');
    const datePosted = navigation.getParam('datePosted', 'NO_DATE');
    const content = navigation.getParam('content', 'NO_CONTENT');
    const title = navigation.getParam('title', 'NO_TITLE');
    const id = navigation.getParam('id', 'NO_ID');
    console.log(authorName);
    console.log(category);
    console.log(datePosted);
    console.log(content);
    console.log(title);
    console.log(id);
    return (
      <View style={styles.container}>
        <Text>
          Hi what is your name 
        </Text>
        <Button
          backgroundColor='#ecf0f1'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='Logout'
          onPress={this.onLogout.bind(this)} />
        <Button
          backgroundColor='#ecf0f1'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='Back to News Feed'
          onPress={this.onGoBack.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
  }
});
