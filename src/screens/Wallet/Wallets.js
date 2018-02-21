import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import T from 'components/Typography';
import WalletList from './WalletList';
import WalletListEntry from './WalletListEntry';
import { getColors } from 'styles';
import Button from 'components/Button';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

class Wallet extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired
    }).isRequired,
    wallet: PropTypes.shape({
      wallets: PropTypes.object.isRequired
    }).isRequired
  };

  handleWalletGenerate = () => {
    this.props.navigation.navigate('Mnemonic');
  };

  handleWalletRecover = () => {
    this.props.navigation.navigate('Recover');
  };

  render() {
    const themedStyles = getThemedStyles(getColors());

    const walletList = this.props.wallet.wallets;

    return (
      <View style={[styles.container, themedStyles.container]}>
        <WalletList style={styles.walletList}>
          {Object.keys(walletList).length > 0 &&
            Object.keys(walletList).map((wallet, i) => {
              return (
                <WalletListEntry
                  key={`wallet-${i}`}
                  name={`My ${walletList[wallet].symbol} Wallet`}
                  symbol={walletList[wallet].symbol}
                  balance={walletList[wallet].balance}
                  publicAddress={walletList[wallet].publicAddress}
                  value={getRandomInt(100, 20000).toString()}
                  change={getRandomInt(1, 20).toString()}
                />
              );
            })}
          {Object.keys(walletList).length === 0 && (
            <T.Heading>Create or recover a wallet!</T.Heading>
          )}
        </WalletList>

        <View style={styles.footerContainer}>
          <Button style={styles.buttonLeft} type="secondary" onPress={this.handleWalletGenerate}>
            Create
          </Button>
          <Button style={styles.buttonRight} type="secondary" onPress={this.handleWalletRecover}>
            Recover
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  walletList: {
    backgroundColor: 'white'
  },
  footerContainer: {
    flexDirection: 'row',
    padding: 20
  },
  buttonLeft: {
    flex: 1,
    marginRight: 7.5
  },
  buttonRight: {
    flex: 1,
    marginLeft: 7.5
  }
});

const getThemedStyles = colors => {
  return {
    container: {
      backgroundColor: colors.background
    }
  };
};

export default Wallet;