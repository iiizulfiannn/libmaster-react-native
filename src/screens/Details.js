import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {URL_API} from '../utils/http';
import {
  getBookActionAdmin,
  // updateStatusActionCreator,
} from '../redux/actions/books';
import {connect} from 'react-redux';
import qs from 'querystring';

import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import {addBorrowActionCreator} from '../redux/actions/borrow';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  getBook = async id => {
    await this.props.getBookAction(id);
  };

  componentDidMount = () => {
    this.getBook(this.props.route.params.id);
    AsyncStorage.getItem('user').then(value =>
      this.setState({user: JSON.parse(value)}),
    );
  };

  handleBorrow = async () => {
    const {books} = this.props;
    const data = {
      user_id: this.state.user.id,
      book_id: books.book.id,
    };
    await this.props.addBorrowAction(qs.stringify(data));
    await this.props.getBookAction(this.props.route.params.id);
  };

  componentDidUpdate = prevProps => {
    console.log(prevProps);
  };

  render() {
    const {books} = this.props;
    return (
      <View style={styles.container}>
        {/* <StatusBar barStyle="light-content" /> */}
        <ImageBackground
          source={require('../assets/header_detail1.png')}
          style={styles.imageBackground}
          resizeMode={'stretch'}>
          <View style={styles.image_container}>
            <Image
              source={{
                uri:
                  books.book.image === undefined
                    ? null
                    : `${URL_API}/${books.book.image}`,
              }}
              style={styles.image}
            />
          </View>
          <TouchableOpacity
            style={styles.back}
            onPress={() => this.props.navigation.goBack()}>
            <Ionicons name="ios-arrow-round-back" color="white" size={35} />
          </TouchableOpacity>
        </ImageBackground>
        <ScrollView style={styles.footer}>
          <View style={styles.status}>
            <Text style={styles.textStatus}>{books.book.status_name}</Text>
          </View>
          <Text numberOfLines={2} style={styles.bookTitle}>
            {books.book.title}
          </Text>
          <Text style={styles.textGenre}>{books.book.genre_name}</Text>
          <Text style={styles.textAuthor}>{books.book.author_name}</Text>
          <Text style={styles.textDetail}>{books.book.description}</Text>
          {books.book.status_name === 'Available' ? (
            <TouchableOpacity
              style={styles.containerDescription}
              onPress={this.handleBorrow}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#02509E', '#4AB7FF']}
                style={styles.button}>
                <Text style={styles.textOrder}>BORROW</Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : null}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({books, borrow}) => {
  //sebenarnya ini state
  return {
    books,
    borrow,
  };
};

const mapDispatchToProps = dispatch => {
  // console.log(dispatch)
  return {
    getBookAction: id => {
      dispatch(getBookActionAdmin(id));
    },

    addBorrowAction: data => {
      dispatch(addBorrowActionCreator(data));
    },

    // updateStatusAction: data => {
    //   dispatch(updateStatusActionCreator(data));
    // },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Details);

const height = Dimensions.get('screen').height;
const height_image = height * 0.5 * 0.5;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  footer: {
    flex: 1,
    paddingHorizontal: 40,
  },
  imageBackground: {
    flex: 1,
    alignItems: 'center',
  },
  image_container: {
    width: height_image,
    height: height_image,
    marginTop: 8,
  },
  image: {
    width: '100%',
    height: '130%',
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20,
  },
  back: {
    position: 'absolute',
    left: 0,
    marginTop: 10,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  status: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 3,
    borderColor: '#02509E',
  },
  textGenre: {
    color: '#02509E',
    fontWeight: 'bold',
    fontSize: 20,
  },
  textAuthor: {
    color: 'gray',
    fontStyle: 'italic',
    fontSize: 20,
  },
  bookTitle: {
    color: '#3e3c3e',
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 5,
  },
  textDetail: {
    color: 'gray',
    marginVertical: 20,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    paddingVertical: 10,
    borderRadius: 100,
  },
  textOrder: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  textStatus: {
    color: '#02509E',
  },
  containerDescription: {
    marginBottom: 30,
  },
});
