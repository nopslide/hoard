import {
  WALLET_HYDRATED,
  WALLET_INITIALIZE_PASSPHRASE,
  WALLET_TRACK_SYMBOL,
  WALLET_TRACK_SYMBOL_SUCCESS,
  WALLET_TRACK_SYMBOL_ERROR,
  WALLET_IMPORT,
  WALLET_IMPORT_SUCCESS,
  WALLET_IMPORT_ERROR,
  WALLET_UPDATE_BALANCE_SUCCESS
} from "./constants";

const initialState = {
  track_requesting: false,
  track_successful: false,
  track_error: null,
  import_requesting: false,
  import_successful: false,
  import_error: null,
  mnemonicPhrase: '',
  isMnemonicInitialized: false,
  hydrationCompleted: false,
  walletIds: [
    /* id[] */
  ],
  hoardWallets: {
    /*
      <symbol>: <id>
    */
  },
  wallets: {
    /*
      <id>: {
        id: string
        symbol: string
        balance: number
        publicAddress: string
      }
    */
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case WALLET_HYDRATED: {
    return {
      ...state,
      hydrationCompleted: true
    };
  }
  case WALLET_INITIALIZE_PASSPHRASE: {
    return {
      ...state,
      mnemonicPhrase: action.mnemonicPhrase,
      isMnemonicInitialized: true
    };
  }
  case WALLET_TRACK_SYMBOL:
    return {
      ...state,
      track_requesting: true,
      track_successful: false,
      track_error: null
    };
  case WALLET_TRACK_SYMBOL_SUCCESS: {
    const payload = action.payload;
    return {
      ...state,
      track_requesting: false,
      track_successful: true,
      track_error: null,
      walletIds: [...state.walletIds, payload.id],
      hoardWallets: {
        ...state.hoardWallets,
        [payload.symbol]: payload.id
      },
      wallets: {
        ...state.wallets,
        [payload.id]: {
          id: payload.id,
          symbol: payload.symbol,
          imported: false,
          balance: payload.balance,
          publicAddress: payload.publicAddress
        }
      }
    };
  }
  case WALLET_TRACK_SYMBOL_ERROR: {
    return {
      ...state,
      track_requesting: false,
      track_successful: false,
      track_error: action.error,
    };
  }
  case WALLET_IMPORT:
    return {
      ...state,
      import_requesting: true,
      import_successful: false,
      import_error: null
    };
  case WALLET_IMPORT_SUCCESS: {
    const payload = action.payload;
    return {
      ...state,
      import_requesting: false,
      import_successful: true,
      import_error: null,
      walletIds: [...state.walletIds, payload.id],
      wallets: {
        ...state.wallets,
        [payload.id]: {
          id: payload.id,
          symbol: payload.symbol,
          imported: true,
          balance: payload.balance,
          publicAddress: payload.publicAddress
        }
      }
    };
  }
  case WALLET_IMPORT_ERROR: {
    return {
      ...state,
      import_requesting: false,
      import_successful: false,
      import_error: action.error,
    };
  }
  case WALLET_UPDATE_BALANCE_SUCCESS: {
    const payload = action.payload;
    return {
      ...state,
      wallets: {
        ...state.wallets,
        [payload.id]: {
          ...state.wallets[payload.id],
          balance: payload.balance
        }
      }
    };
  }
  default:
    return state;
  }
}
