import {
  pending,
  rejected,
  fulfilled,
  resetStateAction,
  addBorrowAction,
  getBorrowByUserAction,
  getAllBorrowAction,
  returnBookAction,
} from '../actions/actionTypes';

const initialValue = {
  borrow: [],
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  isSuccessAdd: false,
  message: '',
};

const borrow = (prevState = initialValue, action) => {
  switch (action.type) {
    case getBorrowByUserAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case getBorrowByUserAction + rejected:
      return {
        ...prevState,
        isRejected: true,
        isLoading: false,
      };
    case getBorrowByUserAction + fulfilled:
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
        borrow: action.payload.data.data,
      };

    case getAllBorrowAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case getAllBorrowAction + rejected:
      return {
        ...prevState,
        isRejected: true,
        isLoading: false,
      };
    case getAllBorrowAction + fulfilled:
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
        borrow: action.payload.data.data,
      };

    case addBorrowAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case addBorrowAction + rejected:
      return {
        ...prevState,
        isRejected: true,
        isLoading: false,
        message: 'Add Borrow Failed',
      };
    case addBorrowAction + fulfilled:
      prevState.borrow.unshift(action.payload.data.data[0]);
      return {
        ...prevState,
        isRejected: false,
        isFulfilled: true,
        isLoading: false,
        message: 'Success borrow',
      };

    case returnBookAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case returnBookAction + rejected:
      return {
        ...prevState,
        isRejected: true,
        isLoading: false,
        message: 'Return Book Failed',
      };
    case returnBookAction + fulfilled:
      const dataAfterUpdateBorrow = prevState.borrow.map(br => {
        if (br.id === action.payload.data.data[0].id) {
          return action.payload.data.data[0];
        }
        return br;
      });
      return {
        ...prevState,
        isRejected: false,
        isFulfilled: true,
        isLoading: false,
        borrow: dataAfterUpdateBorrow,
        message: 'Return Book Success',
      };

    case resetStateAction:
      return {
        ...prevState,
        isFulfilled: false,
        isLoading: false,
        isRejected: false,
      };

    default:
      return {
        ...prevState,
      };
  }
};

export default borrow;
