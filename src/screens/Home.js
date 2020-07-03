import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import CS from '../components/CustomStyle';
import LinearGradient from 'react-native-linear-gradient';
import {URL_API} from '../utils/http';

// Icon
import FontAwesome from 'react-native-vector-icons/FontAwesome'; //search
import Ionicons from 'react-native-vector-icons/Ionicons'; //ios-arrow-back
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; //close
import AntDesign from 'react-native-vector-icons/AntDesign'; //arrow-right

// Redux
import {connect} from 'react-redux';
import {
  getAllBooksActionHomeCreator,
  getAllBooksLoadMoreActionHomeCreator,
} from '../redux/actions/books';
import {getAllGenresActionAdmin} from '../redux/actions/genres';

// Axios
import qs from 'querystring';
import Loading from '../components/Loading';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: data,
      search: '',
      order: 'desc',
      sort: '',
      page: 1,
      limit: 10,
      isSearchActive: false,
      typing: false,
      typingTimeOut: 0,
    };
  }

  handleSearch = e => {
    if (this.state.typingTimeOut) {
      clearTimeout(this.state.typingTimeOut);
    }
    this.setState({
      search: e,
      page: 1,
      typing: false,
      typingTimeOut: setTimeout(() => {
        const reqData = {
          search: this.state.search,
          page: this.state.page,
        };
        this.getAllBooks(reqData);
      }, 1500),
    });
  };

  listBook = ({item}) => {
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
        <View style={styles.contentFlatlist}>
          <Text style={styles.title}>
            {item.title.length < 30
              ? item.title
              : `${item.title.slice(0, 30)}...`}
          </Text>
          <Text style={styles.author}>{item.author_name}</Text>
          <View style={styles.genre_container}>
            <View style={styles.genre}>
              <Text style={styles.textGenre}>{item.genre_name}</Text>
            </View>
          </View>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.push('Details', {
                id: item.id,
              })
            }>
            <AntDesign name="arrowright" color="blue" size={15} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  };

  ItemSeparatorComponent = () => {
    return <View style={styles.itemSeparate} />;
  };

  getAllBooks = async (reqData, newReqData) => {
    if (this.state.page === 1) {
      reqData = {
        limit: this.state.limit,
        page: this.state.page,
        order: this.state.order,
      };
      if (this.state.sort !== '') {
        reqData.sort = this.state.sort;
      }
      if (this.state.search !== '') {
        reqData.search = this.state.search;
      }
      await this.props.getAllBooksActionHome(qs.stringify(reqData));
    } else {
      await this.props.getAllBooksLoadMoreActionHome(qs.stringify(newReqData));
    }
  };

  handleLoadMore = () => {
    this.setState({page: this.state.page + 1}, () => {
      const newReqData = {
        page: this.state.page,
        limit: this.state.limit,
        order: this.state.order,
      };
      if (this.state.sort !== '') {
        newReqData.sort = this.state.sort;
      }
      if (this.state.search !== '') {
        newReqData.search = this.state.search;
      }
      this.getAllBooks(false, newReqData);
    });
  };

  handleOrder = () => {
    if (this.state.order === 'asc') {
      this.setState({order: 'desc', page: 1}, () => {
        const reqData = {
          order: this.state.order,
          page: this.state.page,
        };
        this.getAllBooks(reqData);
      });
    }
    if (this.state.order === 'desc') {
      this.setState({order: 'asc', page: 1}, () => {
        const reqData = {
          order: this.state.order,
          page: this.state.page,
        };
        this.getAllBooks(reqData);
      });
    }
  };

  handleSort = name => {
    this.setState({sort: name, page: 1}, () => {
      const reqData = {
        sort: this.state.sort,
        page: this.state.page,
      };
      this.getAllBooks(reqData);
    });
  };

  getAllGenre = async () => {
    await this.props.getAllGenresAction();
  };

  componentDidMount = () => {
    this.getAllBooks();
    this.getAllGenre();
  };

  // renderLoader = () => {
  //   return this.props.books.books.isLoading ? (
  //     <View style={styles.loader}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   ) : null;
  // };

  render() {
    const {books, genres} = this.props;
    // console.log(this.state.search);
    return (
      <View style={styles.container}>
        {/* HEADER */}
        {this.state.isSearchActive ? (
          <Animatable.View
            animation="fadeInRight"
            duration={300}
            style={styles.headerSearch}>
            <TouchableOpacity
              onPress={() => {
                this.setState(
                  {
                    isSearchActive: false,
                    search: '',
                    page: 1,
                    order: 'desc',
                    sort: '',
                  },
                  () => {
                    console.log(this.state.isSearchActive);
                    const reqData = {
                      page: this.state.page,
                    };
                    this.getAllBooks(reqData);
                  },
                );
              }}>
              <Ionicons
                name="ios-arrow-back"
                color={CS.colorSecondary}
                size={20}
              />
            </TouchableOpacity>
            <TextInput
              name="search"
              placeholder="Search..."
              value={this.state.search}
              style={styles.search}
              onChangeText={e => this.handleSearch(e)}
            />
            <TouchableOpacity onPress={() => this.setState({search: ''})}>
              <MaterialCommunityIcons
                name="close"
                color={CS.colorSecondary}
                size={20}
              />
            </TouchableOpacity>
          </Animatable.View>
        ) : (
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.headerRight}
              onPress={() =>
                this.setState(
                  {page: 1, order: 'desc', sort: '', search: ''},
                  () => {
                    const reqData = {
                      page: this.state.page,
                    };
                    this.getAllBooks(reqData);
                  },
                )
              }>
              <Image
                source={require('../assets/logo.png')}
                style={styles.logo}
              />
              <Text style={styles.textLogo}>LibMaster</Text>
            </TouchableOpacity>
            <View style={styles.headerLeft}>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    isSearchActive: true,
                    sort: '',
                    order: 'asc',
                    page: 1,
                  })
                }>
                <FontAwesome
                  name="search"
                  color={CS.colorSecondary}
                  size={18}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* GENRE */}
        {this.state.isSearchActive ? null : (
          <View style={styles.genreWrapper}>
            <View style={styles.orderWrapper}>
              <TouchableOpacity onPress={this.handleOrder}>
                {this.state.order === 'asc' ? (
                  <MaterialCommunityIcons
                    name={'sort-ascending'}
                    color={CS.colorSecondary}
                    size={20}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name={'sort-descending'}
                    color={CS.colorSecondary}
                    size={20}
                  />
                )}
              </TouchableOpacity>
            </View>

            {genres.isLoading ? (
              <Loading />
            ) : (
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {genres.genres.map(item => {
                  return (
                    <TouchableOpacity
                      style={styles.genreButton}
                      key={item.id}
                      onPress={() => this.handleSort(item.name)}>
                      <Text style={styles.genreText}>
                        {item.name.toUpperCase()}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            )}
          </View>
        )}

        {/* CONTENT */}
        <View style={styles.content}>
          {books.isLoading && this.state.page === 1 ? (
            <Loading />
          ) : books.isRejected ? (
            <View styles={styles.notFound}>
              <Text styles={styles.notFoundText}>Not Found, try again ;)</Text>
            </View>
          ) : (
            <FlatList
              data={books.books}
              renderItem={this.listBook}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={this.ItemSeparatorComponent}
              showsVerticalScrollIndicator={false}
              onEndReached={this.handleLoadMore}
              // onEndReachedThreshold={0}
              // ListFooterComponentStyle={this.renderLoader}
            />
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({books, genres}) => {
  //sebenarnya ini state
  return {
    books,
    genres,
  };
};

const mapDispatchToProps = dispatch => {
  // console.log(dispatch)
  return {
    getAllBooksActionHome: requestData => {
      dispatch(getAllBooksActionHomeCreator(requestData));
    },

    getAllBooksLoadMoreActionHome: requestData => {
      dispatch(getAllBooksLoadMoreActionHomeCreator(requestData));
    },

    getAllGenresAction: () => {
      dispatch(getAllGenresActionAdmin());
    },

    // currentUserAction: () => {
    //   dispatch(currentUserActionCreator())
    // }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

// const {width} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomColor: CS.colorBorderBottom,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  logo: {
    height: 30,
    width: 30,
  },
  textLogo: {
    paddingLeft: 5,
    fontSize: 18,
  },
  headerSearch: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomColor: CS.colorBorderBottom,
    alignItems: 'center',
  },
  search: {
    width: '60%',
  },
  genreWrapper: {
    height: CS.heightHeader,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    borderBottomColor: CS.colorBorderBottom,
  },
  genreButton: {
    height: 25,
    paddingHorizontal: 15,
    borderColor: CS.colorSecondary,
    borderRadius: 50,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  genreText: {fontSize: 13},

  // flatList
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
  contentFlatlist: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    textTransform: 'uppercase',
  },
  author: {
    color: '#f2f2f2',
    fontStyle: 'italic',
    fontSize: 12,
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
  genre_container: {
    flexDirection: 'row',
    marginTop: 10,
  },
  genre: {
    backgroundColor: 'white',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  textGenre: {
    color: 'blue',
    fontWeight: '300',
    fontSize: 10,
  },
  loader: {
    marginTop: 20,
    alignItems: 'center',
  },
  orderWrapper: {
    width: 30,
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: CS.colorBorderBottom,
    marginRight: 15,
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: 20,
  },
});
