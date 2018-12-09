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

export default class HomePage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "CATEGORY FILTER",
      headerLeft: null,
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
      base_url: "https://api.jsonbin.io/b/5c0c0853c10055104caa133a",
      //base_url: "127.0.0.1:8000/blogcat"
    };
  }
 
  componentDidMount() {
    this.fetchDataFromApi();
  }

  fetchDataFromApi = () => {
    const url = "https://api.jsonbin.io/b/5c0c0853c10055104caa133a";
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
    if(item !== null) {
      navigation.navigate('Home', item);
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

  render() {
    const { navigation } = this.props;
    const { data } = this.state;
    const username = navigation.getParam('first_name', 'NO_USERNAME');
    const id = navigation.getParam('id', 'NO_ID'); // REPLACE THIS WITH CATEGORY
    // user table will have list of subscribed categories. Only list those.
    const subscription = navigation.getParam('subscribe', 'NO_SUBSCRIPTION');
    const listOfCategories = this.findCategories(subscription);
    return (
      <ScrollView>
        <View style={styles.container}>
	      <Text style={styles.description}>
	      	Welcome, {username}. Please select a category of posts near you!
	      </Text>
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={listOfCategories}
            renderItem={({ item }) => (
              <Card
              	containerStyle={{width: Dimensions.get('window').width - 20}}
                title={item.name}>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },
  description: {
  	textAlign: 'center',
  },
});
