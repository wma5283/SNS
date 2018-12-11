import React, { Component } from 'react';
import { Platform, TextInput, View, StyleSheet, ScrollView, Text, Image, FlatList, List, Dimensions } from 'react-native';
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
      base_url: "https://api.jsonbin.io/b/5c0c08759b34c6328cc4093b/3",
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
    const url = "https://api.jsonbin.io/b/5c0c08759b34c6328cc4093b/3";
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
    const readerLocation = navigation.getParam('userLocation', 'NO_LOCATION');
    console.log('readerLocation at HomePage: ' + readerLocation);
    if(item !== null) {
      navigation.navigate('Info', {item, readerLocation: readerLocation});
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
    /*
    render the item into the list if:
    1. message category is part of user's subscription
    2. if message category is part of parent category
    3. if message is not in archive (complete)
    4. within reader's location
    */

    return (
      <Card
        containerStyle={{width: Dimensions.get('window').width - 20}}
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
    return null;
  }

  categoryFiltering(subscribedList, messageList){
    const{
      navigation,
    } = this.props;
    const userLocation = navigation.getParam('userLocation', 'NO_LOCATION');
    // traverse messageList and determine if subscribedList 
    newJson = [];
    for(var i = 0; i < messageList.length; ++i){
      for(var j = 0; j < subscribedList.length; ++j){
        var message = messageList[i];
        var subscription = subscribedList[j];
        if(subscription.id == message.category){
          if(message.isArchive == false){
            if(message.location == userLocation){
              newJson.push(message);
            }
          }
        }
      }
    }
    return newJson;
  }

  render() {
    const { navigation } = this.props;
    const { data } = this.state;

    const subscribedList = navigation.getParam('subscribedList', 'NO_LIST');

    //Retrieving Location
    let readerLocation = 'Waiting..';
    if (this.state.errorMessage) {
      readerLocation = this.state.errorMessage;
    } else if (this.state.location) {
      readerLocation = JSON.stringify(this.state.location);
    }
    console.log(readerLocation);

    const subscribedItems = this.categoryFiltering(subscribedList, data);
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.header}>
            News Feed {"\n"}
          </Text>
          <FlatList
            keyExtractor={item => item.id.toString()}
            data={subscribedItems}
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
