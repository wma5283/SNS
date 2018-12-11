import React, { Component } from 'react';
import { Platform, TextInput, View, StyleSheet, ScrollView, Text, Image, FlatList, List, Dimensions } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { Constants, Location, Permissions } from 'expo';

export default class ProfilePage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Profile",
      headerStyle: {
        backgroundColor: "rgba(92, 99,216, 1)"
      },
      headerTintColor: 'white',
    };
  };

  render() {
  	const {
  	  navigation,
  	} = this.props;
  	const subscribe = navigation.getParam('subscribe', 'NO_SUBSCRIPTION');
    const user = navigation.getParam('user', 'NO_USER');
    const isArchive = navigation.getParam('isArchive', 'NOT_ARCHIVE');
    const publisher = navigation.getParam('publisher', 'NOT_PUBLISHER');
    const birthDate = navigation.getParam('birthDate', 'NO_BIRTH');
    const location = navigation.getParam('location', 'NO_LOCATION');
    const sex = navigation.getParam('sex', 'VIRGIN');
    const lastName = navigation.getParam('lastName', 'NO_LAST');
    const firstName = navigation.getParam('firstName', 'NO_FIRST');
    const dateJoined = navigation.getParam('dateJoined', 'NO_DATE');
    const emailConfirmed = navigation.getParam('emailConfirmed', 'NO_EMAIL');
    const id = navigation.getParam('id', 'NO_ID');
    return (
      <View style={styles.container}>
      	<Text style={styles.header}>
      	  {firstName + " " + lastName}
      	</Text>
      	<Card
	      containerStyle={{width: Dimensions.get('window').width - 20}}
	      title={'User ID: ' + id}>
	      <Text style={{marginBottom: 10}}>
	        {'Birth Date: ' + birthDate + "\n"}
	        {'Sex: ' + sex + "\n"}
	        {'Location: ' + location + "\n"}
	        {'Publisher Status: ' + publisher + "\n"}
	        {'Date Joined: ' + dateJoined + "\n"}
	        {'Email Confirmed: ' + emailConfirmed + "\n"}
	      </Text>
	    </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'column',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
  }

});

