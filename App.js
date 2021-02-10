import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MainScreen from './src/screens/MainScreen';
import GoogleScreen from './src/screens/GoogleScreen';

const navigator = createStackNavigator(
  {
    Main: MainScreen,
    Google: GoogleScreen,
  },
  {
    initialRouteName: 'Main',
    defaultNavigationOptions: {
      title: 'Text-to-Speech Modules',
      cardStyle: {backgroundColor: 'white'},
    },
  },
);

export default createAppContainer(navigator);
