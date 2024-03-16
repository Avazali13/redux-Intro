import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullname: "",
  nationalID: "",
  createdAt: "",
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullname: action.payload.fullname,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return {
        ...state,
        fullname: action.payload,
      };
    default:
      return state;
  }
}

const rootReducer=combineReducers({
  account:accountReducer,
  customer:customerReducer
})

const store = createStore(rootReducer);

// store.dispatch({type:'account/deposit',payload:500})
// store.dispatch({type:'account/withdraw',payload:270})

// store.dispatch({type:'account/requestLoan',payload:{amount:1000,purpose:'to buy a moto-moto'}})

// console.log(store.getState());

// store.dispatch({type:'account/payLoan'})
// console.log(store.getState());

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount: amount, purpose: purpose },
  };
}
function payLoan(amount) {
  return { type: "account/payLoan" };
}

// store.dispatch(deposit(450));
// console.log(store.getState());
// store.dispatch(withdraw(230));
// console.log(store.getState());
// store.dispatch(requestLoan(1000, "to buy a home"));
// console.log(store.getState());
// store.dispatch(payLoan());
// console.log(store.getState());

function createCustomer(fullname, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullname, nationalID, createdAt: new Date().toISOString() },
  };
}

function updateName(fullname) {
  return {
    type: "customer/updateName",
    payload: fullname,
  };
}


store.dispatch(createCustomer('Avgu Alha','1331'))
store.dispatch(withdraw(207))
console.log(store.getState())

// store.dispatch(updateName('avaz Gulnar'))
