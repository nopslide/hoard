import React from 'react';
import { Button, Text } from 'react-native';
import { getColors } from 'styles';
import NavigatorService from '../navigator';

export default function withHeader(title, WrappedComponent) {
  return class Wrapper extends React.Component {
    static displayName = `withHeader(${title})`;
    static navigationOptions = () => ({
      drawerLabel: ({ focused }) => (
        <Text
          style={{
            color: focused
              ? getColors().interactivePrimaryText
              : getColors().textPrimary,
            backgroundColor: focused
              ? getColors().interactivePrimary
              : getColors().background,
            padding: 20,
            textAlign: 'center',
            width: '100%'
          }}
        >
          {title}
        </Text>
      ),
      headerTitle: title,
      headerTintColor: getColors().textPrimary,
      headerStyle: { backgroundColor: getColors().background },
      headerRight: (
        <Button
          title="="
          onPress={() => NavigatorService.navigate('DrawerOpen')}
          color={getColors().menu}
        />
      )
    });

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}
