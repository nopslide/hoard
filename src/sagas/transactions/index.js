import {
  INIT_REQUESTING,
  SYMBOL_ETH
} from "containers/App/constants";
import { AsyncStorage } from 'react-native';
import { throttle, fork, all, put, takeLatest, select, takeEvery, call } from "redux-saga/effects";
import {
  TRANSACTION_FOUND,
  SEARCH_FOR_TRANSACTIONS,
  TRANSACTION_UPDATE,
  TRANSACTIONS_STORAGE_KEY
} from './constants';
import {transactionFound} from './actions';
import ethSagas, {fetchHistoryEth} from './ethsagas';
import { walletSelector } from 'screens/Wallet/selectors';


export default function* transactionSagaWatcher() {
  yield all([
    takeLatest(INIT_REQUESTING, initialize),
    takeEvery(SEARCH_FOR_TRANSACTIONS, fetchHistory),
    throttle(1000, TRANSACTION_FOUND, forwardActionToSaveTransactions),
    throttle(1000, TRANSACTION_UPDATE, forwardActionToSaveTransactions)
  ]);
}

export function* initialize() {
  yield fork(ethSagas);

  yield call(hydrate);
}

export function* hydrate() {
  const savedTransactions = yield call(AsyncStorage.getItem, TRANSACTIONS_STORAGE_KEY);

  let transactions;

  if (savedTransactions) {
    try {
      transactions = JSON.parse(savedTransactions);
    } catch(e) {
      transactions = null;
    }
  }

  if (transactions) {
    const transactionsArray = Object.values(transactions);
    for (const transaction of transactionsArray) {
      yield put(transactionFound(transaction, true));
    }
  }
}

export function* forwardActionToSaveTransactions(action) {
  if (!action.doNotSave) {
    yield call(saveTransactions);
  }
}

export function* saveTransactions() {
  const transactions = yield select(state => state.transactions.transactions);

  yield call(
    AsyncStorage.setItem,
    TRANSACTIONS_STORAGE_KEY,
    JSON.stringify(transactions)
  );
}

export function* fetchHistory(action) {
  const receivedWallet = yield select(walletSelector(action.id));
  const wallet = receivedWallet ? receivedWallet : {};

  switch(wallet.symbol) {
  case SYMBOL_ETH: {
    yield call(fetchHistoryEth, action);
    return;
  }
  default: {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log('unable to fetch transaction history for wallet: ', action.address);
    }
    return;
  }
  }
}
