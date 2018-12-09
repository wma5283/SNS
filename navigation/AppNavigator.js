import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import CategorySelector from './CategorySelector';
import InfoPage from './Info';
import LocationPage from './LocationPage';

const RootStack = createStackNavigator({
    Login: {
      screen: LoginPage
    },
    Category: {
	  screen: CategorySelector
    },
    Home: {
      screen: HomePage
    },
    Info: {
      screen: InfoPage
    },
    Location: {
      screen: LocationPage
    }
  });

const App = createAppContainer(RootStack);

export default App;