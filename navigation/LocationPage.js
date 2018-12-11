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
      markers:  [
      {
        coordinate: {
          latitude: 39.0458,
          longitude: -76.6413,
        },
        title: "MD",
        description: "This is the best place in MD",
        id: 1,
      },
      {
        coordinate: {
          latitude: 38.907192,
          longitude: -77.036873,
        },
        title: "DC",
        description: "This is the best place in DC",
        id: 2,
      },
      {
        coordinate: {
          latitude: 41.878113,
          longitude:-87.629799,
        },
        title: "CH",
        description: "This is the best place in Chicago",
        id: 3,
      },
      {
        coordinate: {
          latitude: 37.774929,
	      longitude: -122.419418,
        },
        title: "CA1",
        description: "This is the best place in SanFran",
        id: 4,
      },
      {
        coordinate: {
          latitude: 36.778259,
	      longitude: -119.417931,
        },
        title: "CA",
        description: "This is the best place in CA",
        id: 5,
      },
      {
        coordinate: {
          latitude: 39.290386,
	      longitude: -76.612190,
        },
        title: "BA",
        description: "This is the best place in Baltimore",
        id: 6,
      }],
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
  
  getCoord=() =>{
  	const {
  	  navigation,
  	} = this.props;

  	const location = navigation.getParam('readerLocation', 'NO_LOCATION');
  	console.log('location...' + location);
  	if(location == 'MD'){
	  	return(
	  	 <MapView
	        style={{ flex: 1 }}
	        initialRegion={{
	          latitude: 39.0458,
	          longitude: -76.6413,
	          latitudeDelta: 0.0922,
	          longitudeDelta: 0.0421,
	        }}
	      >
        {this.state.markers.map((marker:any)  => (  
          <MapView.Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          />
         ))}
	      </MapView>
	    );
	 }else if(location == 'DC'){
	 	return(
	  	 <MapView
	        style={{ flex: 1 }}
	        initialRegion={{
	          latitude: 38.907192,
	          longitude: -77.036873,
	          latitudeDelta: 0.0922,
	          longitudeDelta: 0.0421,
	        }}
        >
        {this.state.markers.map((marker:any)  => (  
          <MapView.Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          />
         ))}
	      </MapView>
	    );
	 }else if(location == 'CH'){
	 	return(
	  	 <MapView
	        style={{ flex: 1 }}
	        initialRegion={{
	          latitude: 41.878113,
	          longitude: -87.629799,
	          latitudeDelta: 0.0922,
	          longitudeDelta: 0.0421,
	        }}
	      >
        {this.state.markers.map((marker:any)  => (  
          <MapView.Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          />
         ))}
	      </MapView>
	    );
	 }else if(location == 'CA1'){
	 	return(
	  	 <MapView
	        style={{ flex: 1 }}
	        initialRegion={{
	          latitude: 37.774929,
	          longitude: -122.419418,
	          latitudeDelta: 0.0922,
	          longitudeDelta: 0.0421,
	        }}
	      >
        {this.state.markers.map((marker:any)  => (  
          <MapView.Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          />
         ))}
	      </MapView>
	    );
	 }else if(location == 'CA'){
	 	return(
	  	 <MapView
	        style={{ flex: 1 }}
	        initialRegion={{
	          latitude: 36.778259,
	          longitude: -119.417931,
	          latitudeDelta: 0.0922,
	          longitudeDelta: 0.0421,
	        }}
	      >
        {this.state.markers.map((marker:any)  => (  
          <MapView.Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          />
         ))}
	      </MapView>
	    );
	 }else if(location == 'BA'){
	 	return(
	  	 <MapView
	        style={{ flex: 1 }}
	        initialRegion={{
	          latitude: 39.290386,
	          longitude: -76.612190,
	          latitudeDelta: 0.0922,
	          longitudeDelta: 0.0421,
	        }}
	      >
        {this.state.markers.map((marker:any)  => (  
          <MapView.Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          />
         ))}
	      </MapView>
	    );
	 }
	return(
  	 <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 39.0458,
          longitude: -76.6413,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    );
  }

  render() {
  	return this.getCoord()
  }
}
