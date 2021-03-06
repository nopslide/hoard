import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import { Dimensions } from 'react-native';
import Wallet from 'screens/Wallet';
import KYC from 'screens/KYC';
import Settings from 'screens/Settings';
import About from 'screens/About';
import GetHelp from 'screens/GetHelp';
import Legal from 'screens/Legal';
import SendRequest from 'screens/SendRequest';
import CoinInformation from 'screens/CoinInformation';
import TransactionStatus from 'screens/TransactionStatus';
import ViewAddress from 'screens/ViewAddress';
import Authenticate from 'components/Authenticate';
import Store from 'components/Pin/Store';
import Menu from './Menu';

import {
  transitionConfig,
  getNavigationOptions,
} from 'components/Base/Navigation';

const RouteConfigs = {
  Wallet: {
    screen: createStackNavigator(
      {
        Wallet: {
          screen: Wallet,
          navigationOptions: navProps =>
            getNavigationOptions({
              ...navProps,
              leftAction: false,
              title: 'My Wallet',
            }),
        },
        CoinInformation: {
          screen: CoinInformation,
          navigationOptions: navProps =>
            getNavigationOptions({
              ...navProps,
            }),
        },
        SendRequest: {
          screen: SendRequest,
          navigationOptions: navProps =>
            getNavigationOptions({
              ...navProps,
              leftAction: 'back',
              title: 'Transfer Funds',
            }),
        },
        TransactionStatus: {
          screen: TransactionStatus,
          navigationOptions: navProps =>
            getNavigationOptions({
              ...navProps,
              leftAction: 'cancel',
            }),
        },
        ViewAddress: {
          screen: ViewAddress,
          navigationOptions: navProps =>
            getNavigationOptions({
              ...navProps,
              leftAction: 'cancel',
            }),
        },
      },
      {
        headerMode: 'float',
        cardStyle: { backgroundColor: 'transparent' },
        transitionConfig,
      }
    ),
  },
  Settings: {
    screen: Settings,
  },
  KYC: {
    screen: KYC,
  },
  Authenticate: {
    screen: Authenticate,
  },
  Store: {
    screen: Store,
  },
  Legal: {
    screen: Legal,
  },
  About: {
    screen: About,
  },
  GetHelp: {
    screen: GetHelp,
  },
};

const drawerNavigatorConfig = {
  headerMode: 'float',
  drawerPosition: 'right',
  drawerWidth: Dimensions.get('window').width - 100,
  contentComponent: Menu,
};

export default createDrawerNavigator(RouteConfigs, drawerNavigatorConfig);
