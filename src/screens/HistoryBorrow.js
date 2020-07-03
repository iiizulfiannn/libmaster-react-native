import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';

// import {data} from '../assets/Data';
import AsyncStorage from '@react-native-community/async-storage';

import {connect} from 'react-redux';
import {
  getBorrowByUserActionCreator,
  returnBookActionCreator,
} from '../redux/actions/borrow';
import qs from 'querystring';
import {URL_API} from '../utils/http';

export class HistoryBorrow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }
  componentDidMount = () => {
    AsyncStorage.getItem('user').then(value =>
      this.setState({user: JSON.parse(value)}, () => {
        this.getAllBorrows(this.state.user.id);
      }),
    );
  };

  getAllBorrows = async idUser => {
    await this.props.getBorrowByUserAction(idUser);
  };

  ItemSeparatorComponent = () => {
    return <View style={styles.itemSeparate} />;
  };

  handleReturn = async (borrowId, bookId) => {
    console.log(borrowId, bookId);
    const data = {
      borrowId,
      book_id: bookId,
    };

    await this.props.returnBookAction(qs.stringify(data));
    await this.getAllBorrows();
  };

  renderItem = ({item}) => {
    // console.log(item.image);
    return (
      <LinearGradient
        colors={['#02509E', '#4AB7FF']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        style={styles.item}>
        <View style={styles.image_container}>
          <Image
            source={{uri: `${URL_API}/${item.image}`}}
            style={styles.image}
          />
        </View>
        <View style={styles.content}>
          <View style={styles.contentAtas}>
            <Text style={styles.title}>{item.book_title}</Text>
            <Text style={styles.textUnderTitle}>
              Tgl Pinjam:{' '}
              <Text style={styles.author}>{item.date_of_borrow}</Text>
            </Text>
            <Text style={styles.textUnderTitle}>
              Tgl Kembali:{' '}
              <Text style={styles.author}>{item.date_of_return}</Text>
            </Text>
            <Text style={styles.textUnderTitle}>
              Status:{' '}
              <Text style={styles.author}>
                {item.date_of_return == null
                  ? 'Kamu sedang meminjam'
                  : 'Sudah Dikembalikan'}
              </Text>
            </Text>
          </View>
          <View style={styles.contentBawah}>
            {item.date_of_return == null ? (
              <TouchableOpacity
                onPress={() => {
                  this.handleReturn(item.id, item.book_id);
                }}>
                <View style={styles.returnContainer}>
                  <View style={styles.return}>
                    <Text style={styles.textReturn}>RETURN</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.push('Details', {
              id: item.book_id,
            })
          }
          style={styles.button}>
          <AntDesign name="arrowright" color="blue" size={15} />
        </TouchableOpacity>
      </LinearGradient>
    );
  };

  render() {
    const {borrow} = this.props;
    console.log(borrow.borrow);
    return (
      <View style={styles.container}>
        <View style={styles.flatList}>
          <FlatList
            data={borrow.borrow}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={this.ItemSeparatorComponent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({borrow}) => {
  return {
    borrow,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getBorrowByUserAction: idUser => {
      dispatch(getBorrowByUserActionCreator(idUser));
    },

    returnBookAction: data => {
      dispatch(returnBookActionCreator(data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HistoryBorrow);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 5,
  },
  flatList: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  item: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 10,
  },
  image_container: {
    width: 70,
    height: 90,
  },
  image: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  contentAtas: {
    flex: 3,
    justifyContent: 'center',
  },
  contentBawah: {
    flex: 2,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  textUnderTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  author: {
    color: '#f2f2f2',
    fontWeight: '300',
  },
  button: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemSeparate: {
    height: 10,
  },
  returnContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  return: {
    backgroundColor: 'white',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  textReturn: {
    color: 'blue',
    fontWeight: '300',
    fontSize: 11,
  },
});
