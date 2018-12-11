import React, { Component } from 'react';
import { 
	TextInput, 
	View, 
	StyleSheet, 
	ScrollView, 
	Text, 
	Image, 
	FlatList, 
	List,
	Dimensions,
} from 'react-native';

import { Card, ListItem, Button, Icon } from 'react-native-elements'
const onProfile = (navigation) => {
  const subscribe = navigation.getParam('subscribe', 'NO_SUBSCRIPTION');
  const user = navigation.getParam('user', 'NO_USER');
  const isArchive = navigation.getParam('isArchive', 'NOT_ARCHIVE');
  const publisher = navigation.getParam('publisher', 'NOT_PUBLISHER');
  const birthDate = navigation.getParam('birth_date', 'NO_BIRTH');
  const location = navigation.getParam('location', 'NO_LOCATION');
  const sex = navigation.getParam('sex', 'VIRGIN');
  const lastName = navigation.getParam('last_name', 'NO_LAST');
  const firstName = navigation.getParam('first_name', 'NO_FIRST');
  const dateJoined = navigation.getParam('date_joined', 'NO_DATE');
  const emailConfirmed = navigation.getParam('email_confirmed', 'NO_EMAIL');
  // const image = navigation.getParam('image', 'NO_IMAGE');
  const id = navigation.getParam('id', 'NO_ID');
  navigation.navigate('Profile', 
    {subscribe: subscribe, 
     id: id, 
     publisher: publisher, 
     birthDate: birthDate, 
     location: location,  
     sex: sex,
     lastName: lastName,
     firstName: firstName, 
     dateJoined: dateJoined,
     emailConfirmed: emailConfirmed,
   });
}

export default class CategorySelector extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "CATEGORY FILTER",
      headerLeft: null,
      headerStyle: {
        backgroundColor: "rgba(92, 99,216, 1)"
      },
      headerTintColor: 'white',
      headerRight: (
      <Button
        buttonStyle={{
          backgroundColor: "rgba(92, 110,216, 1)",
          borderColor: "transparent",
          width: 100,
          borderWidth: 0,
          borderRadius: 5
        }}
        color="#ff5c5c"
        containerStyle={{
          marginRight: 20,
        }}
        onPress={() => onProfile(navigation)}
        title="Profile"
        
      />
    ),
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      base_url: "https://api.jsonbin.io/b/5c0c0853c10055104caa133a/2",
      //base_url: "127.0.0.1:8000/blogcat"
    };
  }
 
  componentDidMount() {
    this.fetchDataFromApi();
  }

  fetchDataFromApi = () => {
    const url = "https://api.jsonbin.io/b/5c0c0853c10055104caa133a/2 ";
    //base_url: "127.0.0.1:8000/blogcat
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
    } = this.state;
    var newJson = [];
    const userLocation = navigation.getParam('location', 'NO_LOCATION');
    console.log('userLocation at CategorySelector: ' + userLocation);
    console.log(item);
    for(var index = 0; index < data.length; ++index){
      const categoryElement = data[index];
      if(categoryElement.parent == item.id){
        newJson.push(categoryElement);
      }
      if(categoryElement.id == item.id){
        newJson.push(categoryElement);
      }
    }
    if(item !== null) {
      navigation.navigate('Home', {subscribedList: newJson, userLocation: userLocation});
    } else { 
      Alert.alert('This category is unavailable.');
    }
  }


  findCategories(subscription){
  	const{ data } = this.state;
  	var newData = [];
    for (var index = 0; index < data.length; ++index) {

     var categories = data[index];

     if(subscription.includes(categories.id)){
     	newData.push(categories);
     }

    }
    return newData;
  }

  onLogout = () =>{
  	const{
      navigation,
    } = this.props;
  	navigation.navigate('Login');
  }

  selectAllCategories(){
    const {
      data,
    } = this.state;
    const {
      navigation,
    } = this.props;
    console.log('hi wtf');
    console.log(data);
    const userLocation = navigation.getParam('location', 'NO_LOCATION');
    navigation.navigate('Home', {subscribedList: data, userLocation: userLocation});

  }

  selectAllSubscribed(listOfCategories){
    const{
      navigation,
    } = this.props;
    const { 
      data, //category table
    } = this.state;
    var newJson = [];
    var dupeCheck = [];
    const userLocation = navigation.getParam('location', 'NO_LOCATION');
    // find all subcategories 
    for(var index = 0; index < data.length; ++index){
      for(var j = 0; j < listOfCategories.length; ++j){
        const categoryElement = data[index];
        const userSubcategory = listOfCategories[j];
        if(!dupeCheck.includes(categoryElement)){
          if(categoryElement.parent == userSubcategory.id){
            newJson.push(categoryElement);
            dupeCheck.push(categoryElement);
          }
          if(categoryElement.id == userSubcategory.id){
            newJson.push(categoryElement);
            dupeCheck.push(categoryElement);
          }
        }
      }
    }
    console.log('selectAllSubscribed list: ' + newJson);
    navigation.navigate('Home', {subscribedList: newJson, userLocation: userLocation});
  }

  render() {
    const { navigation } = this.props;
    const { data } = this.state;
    const username = navigation.getParam('first_name', 'NO_USERNAME');
    const id = navigation.getParam('id', 'NO_ID'); // REPLACE THIS WITH CATEGORY
    // user table will have list of subscribed categories. Only list those.
    const subscription = navigation.getParam('subscribe', 'NO_SUBSCRIPTION');
    const listOfCategories = this.findCategories(subscription);
    console.log('listOfCategories: ' + listOfCategories);
    return (
      <ScrollView>
        <View style={styles.container}>
	      <Text style={styles.description}>
	      	Welcome, {username}.
	      </Text>
        <Text>
          Please select a subscribed category of posts near you!
        </Text>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={listOfCategories}
            renderItem={({ item }) => (
              <Card
              	containerStyle={{width: Dimensions.get('window').width - 20}}
                title={item.name.toUpperCase()}>
                <Button
    		          onPress={() => this.moreInfo(item)} 
    		          title='SELECT'
    		          buttonStyle={{
    		            backgroundColor: "rgba(92, 99,216, 1)",
    		            width: 200,
    		            height: 45,
    		            borderColor: "transparent",
    		            borderWidth: 0,
    		            borderRadius: 5
    		          }}
    		          containerStyle={{ alignItems: 'center' }}
    		        />
              </Card>
            )}
          />
          <Text style={styles.other}>
            OTHER
          </Text>
          <Card
            containerStyle={{width: Dimensions.get('window').width - 20}}
            title="SELECT ALL SUBSCRIBED CATEGORIES">
            <Button
              onPress={() => this.selectAllSubscribed(listOfCategories)} 
              title='SELECT'
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
                paddingBottom: 30,
              }}
            />
          </Card>
          <Card
            containerStyle={{width: Dimensions.get('window').width - 20}}
            title="SELECT ALL CATEGORIES">
            <Button
              onPress={() => this.selectAllCategories()} 
              title='SELECT'
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
                paddingBottom: 30,
              }}
            />
          </Card>
          
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
        <Text>
            If you want to subscribe to more categories, please go to following link: 
            <Text style={{
              color: 'blue',
              paddingTop: 30
            }}>
              {" " + "http://SNS.com"}
            </Text>
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },
  description: {
  	textAlign: 'center',
    fontSize: 30,
  },
  other: {
    paddingTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
