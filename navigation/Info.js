import React, { Component } from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card, ListItem, Button} from 'react-native-elements';

export default class InfoPage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "SNS POSTS",
      headerStyle: {
        backgroundColor: "rgba(92, 99,216, 1)"
      },
      headerTintColor: 'white',
    };
  };
  render() {
  	const{
  	  navigation,
  	} = this.props;
  	// const title = navigation.getParam('title', 'NO_TITLE');
  	// const content = navigation.getParam('content', 'NO_CONTENT');
  	// const category = navigation.getParam('category', 'NO_CATEGORY');
  	// const author = navigation.getParam('author', 'NO_AUTHOR');
  	// const date = navigation.getParam('date', 'N/A');
  	// const isArchive = navigation.getParam('isArchive', 'ARCHIVE_UNKNOWN');
  	// const location = navigation.getParam('location', 'NO_LOCATION');
  	// const image = navigation.getParam('image', 'NO_IMAGE');
  	// const id = navigation.getParam('id', 'NO_ID');
  	const item = navigation.getParam('item', 'NO_ITEM');
  	const readerLocation = navigation.getParam('readerLocation', 'NO_LOCATION');
    return(
      <ScrollView>
	  <View style={styles.container}>
	 	<Text style={styles.title}>
		  {item.title}
		</Text>
	    <Card
	      containerStyle={{width: Dimensions.get('window').width - 20}}
        >
          <Text style={styles.content}>
            {item.content}
          </Text>
          <Text>
          	{'Category: ' + item.category + "\n"}
          	{'Location: ' + item.location + "\n"}
          	{'Date: ' + item.date}
          </Text>
        </Card>
		<Button
      		icon={
			  <Icon
			    name='location-arrow'
			    size={30}
			    color='black'
			  />
			}
          onPress={() => navigation.navigate('Location', {readerLocation: readerLocation})}
          title='LOCATION'
          buttonStyle={{
		    backgroundColor: "rgba(92, 99,216, 1)",
		    width: 300,
		    height: 45,
		    borderColor: "transparent",
		    borderWidth: 0,
		    borderRadius: 5
		  }}
		  containerStyle={{
		   marginTop: 50,
		   paddingBottom: 30
		  }}
        />
	  </View>
	  </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
	title: {
	  fontSize: 40,
	  fontWeight: 'bold',
	},
	author: {
 	  fontStyle: 'italic',
	},
	content: {
	  fontSize: 20,
	  marginBottom: 10,
	},
	container: {
      flex: 1,
      paddingTop: 30,
      justifyContent: 'space-between',
      alignItems: 'center',
      // alignContent: 'center',
    },
	locationButton: {
		backgroundColor: 'white',
	    borderColor: 'white',
	    borderWidth: 1,
	    borderRadius: 12,
	    color: 'white',
	    fontSize: 24,
	    fontWeight: 'bold',
	    overflow: 'hidden',
	    padding: 30,
	    textAlign:'center',
	},
});