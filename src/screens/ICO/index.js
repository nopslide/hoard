import React, { Component } from "react";
import {
  Alert,
  View,
  Text,
  ScrollView,
  StyleSheet
} from "react-native";
import Modal from "components/Modal";
import SelectableCoin from "components/SelectableCoin";
import { convertCurrency, SOLVE_FOR } from "lib/currency-helpers";
import {limitNumber, formatDecimalInput} from 'lib/formatters';
import Button from 'components/Button';
import Input from 'components/Input';

const allowedCurrencies = ["BTC", "ETH"];

const PRICE_PRECISION = 8;
const OAR_LIMIT = 10000;
const FIAT_LIMIT = 1000000;

const numberLimiter = limitNumber(PRICE_PRECISION);
const decimalInputFormatter = formatDecimalInput(PRICE_PRECISION);

export default class ICO extends Component {
  state = {
    modalOpen: false,
    oarPrice: 0.46,
    oarTotal: 0,
    selectedCurrency: "BTC",
    pickerSelection: "BTC",
    amountPaid: '',
    priceTotal: 0,
    /* TODO: each time we fetch these prices,
     *   - ensure that the currently selected price is there
     *     - if not, show an error and ask to reselect a currency
     *   - make sure they are numeric
     */
    prices: {
      BTC: 11190.28,
      ETH: 1044.74
    }
  };

  openModal = () => {
    this.setState({
      modalOpen: true,
      pickerSelection: this.state.selectedCurrency
    });
  };

  handleChangeCurrency = value => () =>
    this.setState({ pickerSelection: value });

  cancelModal = () => {
    this.setState({
      modalOpen: false
    });
  };

  confirmSelection = () => {
    this.setState({
      modalOpen: false,
      selectedCurrency: this.state.pickerSelection
    }, () => {
      const { oarPrice, prices, selectedCurrency, oarTotal } = this.state;
      const { source } = convertCurrency({
        source: {
          pair: "USD",
          price: prices[selectedCurrency],
          amount: SOLVE_FOR
        },
        destination: {
          pair: "USD",
          price: oarPrice,
          amount: oarTotal
        }
      });

      this.handleChangePaid(source.amount.toString());
    });
  };

  handleChangePaid = value => {
    const { oarPrice, prices, selectedCurrency } = this.state;

    const formattedValue = decimalInputFormatter(value);

    const valueAsNumber = Number(formattedValue) || 0;
    const { destination, totalCost } = convertCurrency({
      source: {
        pair: "USD",
        price: prices[selectedCurrency],
        amount: valueAsNumber
      },
      destination: {
        pair: "USD",
        price: oarPrice,
        amount: SOLVE_FOR
      }
    });

    this.setState({
      // TODO: address rounding issues
      oarTotal: numberLimiter(destination.amount),
      priceTotal: totalCost,
      amountPaid: formattedValue
    });
  };

  resetToOarMaximum = () => {
    const { oarPrice, prices, selectedCurrency } = this.state;
    const { source } = convertCurrency({
      source: {
        pair: "USD",
        price: prices[selectedCurrency],
        amount: SOLVE_FOR
      },
      destination: {
        pair: "USD",
        price: oarPrice,
        amount: OAR_LIMIT
      }
    });

    this.handleChangePaid(source.amount.toString());
  }

  resetToFiatMaximum = () => {
    const { prices, selectedCurrency } = this.state;
    const { source } = convertCurrency({
      source: {
        pair: "USD",
        price: prices[selectedCurrency],
        amount: SOLVE_FOR
      },
      destination: {
        pair: "USD",
        price: 1,
        amount: FIAT_LIMIT
      }
    });

    this.handleChangePaid(source.amount.toString());
  }

  validatePurchase = () => {
    if (this.state.oarTotal > OAR_LIMIT) {
      Alert.alert(
        'OAR limit reached',
        `We cap our ICO purchase limit to ${OAR_LIMIT} OAR. We have reduced you to that amount`,
        [{text: 'OK', onPress: this.resetToOarMaximum}]
      );
      return false;
    }

    if (this.state.priceTotal > FIAT_LIMIT) {
      Alert.alert(
        'OAR limit reached',
        `We cap our ICO purchase limit to ${FIAT_LIMIT} USD. We have reduced you to that amount`,
        [{text: 'OK', onPress: this.resetToFiatMaximum}]
      );
      return false;
    }

    return true;
  }

  handleSubmit = () => {
    if (this.validatePurchase()) {
      console.log(this.state); // eslint-disable-line no-console
    }
  }

  render() {
    const {
      modalOpen,
      amountPaid,
      oarPrice,
      oarTotal,
      selectedCurrency,
      pickerSelection,
      priceTotal,
      prices
    } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Participate in the OAR ICO</Text>
        <View style={styles.form}>
          <Text style={[styles.infoText, styles.formItem]}>
            Current Price: ${oarPrice}
          </Text>
          <Button style={styles.formItem} onPress={this.openModal}>
            {`Select Currency: ${selectedCurrency}`}
          </Button>
          <Text style={styles.infoText}>
            {selectedCurrency} Price: ${prices[selectedCurrency]}
          </Text>
          <Input
            style={styles.formItem}
            keyboardType="numeric"
            placeholder={`Amount of ${selectedCurrency}`}
            value={amountPaid}
            onChangeText={this.handleChangePaid}
          />
          <Text style={styles.infoText}>Price Total: ${priceTotal.toFixed(2)}</Text>
          <Text style={styles.infoText}>Oar Received: {oarTotal}</Text>
        </View>
        <Button style={styles.confirm} onPress={this.handleSubmit}>
          Confirm Purchase
        </Button>
        <Modal
          show={modalOpen}
          title="Select Currency"
          onCancel={this.cancelModal}
          actionButtons={[
            {text: 'Done', type: 'primary', onPress: this.confirmSelection},
            {text: 'Cancel', type: 'text', onPress: this.cancelModal}
          ]}
        >
          <ScrollView bounces={false} style={styles.scrollView}>
            {allowedCurrencies.map(currency => (
              <SelectableCoin
                key={currency}
                onPress={this.handleChangeCurrency(currency)}
                selected={currency === pickerSelection}
                currency={currency}
              />
            ))}
          </ScrollView>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B273F",
    justifyContent: "space-between"
  },
  heading: {
    marginTop: 50,
    textAlign: "center",
    fontSize: 24,
    color: "#FFF",
    fontWeight: "900"
  },
  form: {
    justifyContent: "center",
    flex: 1
  },
  formItem: {
    margin: 10
  },
  infoText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "700"
  },
  confirm: {
    marginVertical: 50,
    marginHorizontal: 10
  },
  scrollView: {
    marginVertical: 10
  }
});
