import {
  getAllBooksAction,
  addBookAction,
  updateBookAction,
  getBookAction,
  deleteBookAction,
  pending,
  rejected,
  fulfilled,
  getAllBooksActionHome,
  getAllBooksLoadMoreActionHome,
  resetStateAction,
  // updateStatusAction,
} from '../actions/actionTypes';

const initialValue = {
  books: [],
  book: {},
  pagination: {},
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
  message: '',
};

const books = (prevState = initialValue, action) => {
  switch (action.type) {
    // case updateStatusAction + fulfilled:
    //   const dataAfterUpdateStatus = prevState.books.map(book => {
    //     if (book.id === action.payload.data.data.id) {
    //       return action.payload.data.data;
    //     }
    //     return book;
    //   });
    //   return {
    //     ...prevState,
    //     book:
    //   };
    case getAllBooksAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case getAllBooksAction + rejected:
      return {
        ...prevState,
        isRejected: true,
        isLoading: false,
      };
    case getAllBooksAction + fulfilled:
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
        books: action.payload.data.data,
      };

    case getAllBooksActionHome + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case getAllBooksActionHome + rejected:
      return {
        ...prevState,
        isRejected: true,
        isLoading: false,
      };
    case getAllBooksActionHome + fulfilled:
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
        books: action.payload.data.data,
        pagination: action.payload.data.pagination,
      };

    case getAllBooksLoadMoreActionHome + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case getAllBooksLoadMoreActionHome + rejected:
      return {
        ...prevState,
        isRejected: true,
        isLoading: false,
      };
    case getAllBooksLoadMoreActionHome + fulfilled:
      return {
        ...prevState,
        isFulfilled: true,
        isLoading: false,
        books: prevState.books.concat(action.payload.data.data),
        pagination: action.payload.data.pagination,
      };

    case getBookAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case getBookAction + rejected:
      return {
        ...prevState,
        isRejected: true,
        isLoading: false,
      };
    case getBookAction + fulfilled:
      // console.log(action.payload.data.data);
      return {
        ...prevState,
        isRejected: false,
        isFulfilled: true,
        isLoading: false,
        book: action.payload.data.data,
      };

    case addBookAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case addBookAction + rejected:
      return {
        ...prevState,
        isRejected: true,
        isLoading: false,
        message: 'Add Book Failed',
      };
    case addBookAction + fulfilled:
      prevState.books.push(action.payload.data.data);
      return {
        ...prevState,
        isRejected: false,
        isFulfilled: true,
        isLoading: false,
        books: prevState.books,
        message: 'Add Book Success',
      };

    case updateBookAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case updateBookAction + rejected:
      return {
        ...prevState,
        isRejected: true,
        isLoading: false,
        message: 'Update Book Failed',
      };
    case updateBookAction + fulfilled:
      const dataAfterUpdateBook = prevState.books.map(book => {
        if (book.id === action.payload.data.data.id) {
          return action.payload.data.data;
        }
        return book;
      });
      return {
        ...prevState,
        isRejected: false,
        isFulfilled: true,
        isLoading: false,
        books: dataAfterUpdateBook,
        message: 'Update Book Success',
      };

    case deleteBookAction + pending:
      return {
        ...prevState,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case deleteBookAction + rejected:
      return {
        ...prevState,
        isRejected: true,
        isLoading: false,
        message: 'Failed Delete - Data Constraint each other',
      };
    case deleteBookAction + fulfilled:
      const dataAfterDelete = prevState.books.filter(
        // eslint-disable-next-line radix
        book => book.id !== parseInt(action.payload.data.data.id),
      );
      return {
        ...prevState,
        isRejected: false,
        isFulfilled: true,
        isLoading: false,
        books: dataAfterDelete,
        message: 'Success delete Book',
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

export default books;
