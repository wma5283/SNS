import React, { Component } from 'react';
import { Platform, TextInput, View, StyleSheet, ScrollView, Text, Image, FlatList, List } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { Constants, Location, Permissions } from 'expo';

export default class HomePage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "SNS POSTS",
      headerStyle: {
        backgroundColor: "rgba(92, 99,216, 1)"
      },
      headerTintColor: 'white',
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      base_url: "https://api.jsonbin.io/b/5c0c08759b34c6328cc4093b/1",
      //base_url: "127.0.0.1:8000/blogpost"
      location: null,
      errorMessage: null,
    };
  }
 
  componentDidMount() {
    this.fetchDataFromApi();
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

   _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  fetchDataFromApi = () => {
    const url = "https://api.jsonbin.io/b/5c0c08759b34c6328cc4093b/1";
    // const url = "127.0.0.1:8000/blogpost"

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res,
          error: null,
        });
      })
  };

  moreInfo = (item) => {
    const{
      navigation,
    } = this.props;
    const { 
      data,
      location,
    } = this.state;
    if(item !== null) {
      navigation.navigate('Info', item);
    } else {
      Alert.alert('This post is unavailable.');
    }
  }

  onLogout = () =>{
    const{
      navigation,
    } = this.props;
    navigation.navigate('Login');
  }

  onRenderItem = ({item}) => {
    const{
      navigation,
    } = this.props;
    const categoryData = navigation.getParam('data', 'NO_CATEGORY');
    
    const id = navigation.getParam('id', 'NO_ID');
    const name = navigation.getParam('name', 'NO_NAME');
    const parent = navigation.getParam('parent', 'NO_PARENT');
    // console.log('haha wow ok wow ok');
    // console.log(id);
    // console.log(name);
    // console.log(parent);

    // console.log('category: ' + item.category);
    // console.log('author: ' + item.author);
    // console.log('isArchive: ' + item.isArchive);
    // console.log('date_posted: ' +item.date_posted);
    // console.log('id: ' + item.id);
    // console.log('title: ' + item.title);
    /*
    render the item into the list if:
    1. message category is part of user's subscription
    2. if message category is part of parent category
    3. if message is not in archive (complete)
    4. within reader's location
    */

    // we currently don't have publisher current location
    let pseudoLocation = 'MD';
    let isValid = 0; //0 = true, 1 = false;
    if(item.isArchive == true){
      isValid = 1;
      return null;
    }
    if(pseudoLocation !== item.location){
      isValid = 1;
    }
    // console.log('hahahahahhahahahaha');
    console.log(item.category);
    console.log(id);
    if(item.category == null || item.category !== id){
    //   console.log('here');
    //   console.log(item.category);
    // console.log(id);
      isValid = 1;
    console.log('pass here1');
    }

    // if(isValid == 0){
    if(true){
      console.log(' i wanna go see ');
      return (
        <Card
          title={item.title}>
          <Text style={{marginBottom: 10}}
            numberOfLines={1}>
            {item.content}
          </Text>
          <Button
            onPress={() => this.moreInfo(item)}
            title='READ MORE'
            buttonStyle={{
              backgroundColor: "rgba(92, 99,216, 1)",
              width: 200,
              height: 45,
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 5
            }}
            containerStyle={{ 
              alignItems: 'center',
            }}
          />
        </Card>
      );
    }
    return null;
  }

  render() {
    const { navigation } = this.props;
    const { data } = this.state;

    //Retrieving Location
    let readerLocation = 'Waiting..';
    if (this.state.errorMessage) {
      readerLocation = this.state.errorMessage;
    } else if (this.state.location) {
      readerLocation = JSON.stringify(this.state.location);
    }
    console.log(readerLocation);
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.header}>
            News Feed {"\n"}
          </Text>
          <FlatList
            keyExtractor={item => item.id.toString()}
            data={data}
            renderItem={this.onRenderItem}
            removeClippedSubviews={false}
          />
          <Button
            onPress={this.onLogout.bind(this)}
            title='LOG-OUT'
            buttonStyle={{
              backgroundColor: "red",
              width: 100,
              height: 45,
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 5
            }}
            containerStyle={{ 
              alignItems: 'center',
              marginTop: 40,
            }}
          />
        </View>
      </ScrollView>
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
