import React from 'react';
import {Text, View, Platform, StyleSheet} from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import MapView, {Marker} from 'react-native-maps';

export default class LocationPage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "CURRENT LOCATION",
      headerStyle: {
        backgroundColor: "rgba(92, 99,216, 1)"
      },
      headerTintColor: 'white',
    };
  };

  constructor(props){
  	super(props);

  	this.state = {
  	  location: null,
      errorMessage: null,
      isMapReady: false,
      markers: null,
  	};
  }
   componentWillMount() {
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

  onMapLayout = () => {
    this.setState({ isMapReady: true });
  }

  render() {
  	const {
  	  location,
  	  isMapReady,
  	} = this.state;
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }
    console.log(text);
    return (
       <Text>
       {text}
       </Text>
    );
  }
}
