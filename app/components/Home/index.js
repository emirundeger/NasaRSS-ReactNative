import React from 'react';
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import Item from '../Item';
import Description from '../Description';
import {List, ListItem} from 'react-native-elements';
import * as rssParser from 'react-native-rss-parser';
import LanguagePicker from '../LanguagePicker';
import {ActionSheet} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TranslationService from '../../helpers/TranslationService';
import {connect} from 'react-redux';

class Home extends React.Component {
  state = {
    constData: [],
    currentDataTitle: [],
    currentDataDescription: [],
    isLoading: true,
  };
  static navigationOptions = {
    title: 'NASA News',
    headerStyle: {
      backgroundColor: '#03A9F4',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    headerRight: () => <LanguagePicker />,
  };
  renderItem = ({item, index}) => {
    const {navigate} = this.props.navigation;
    return (
      <TouchableHighlight
        onPress={() => {
          this.props.navigation.navigate('Description', {
            description: this.getDescription(index),
          });
        }}>
        <Text style={{fontSize: 18, marginBottom: 15}}>{item}</Text>
      </TouchableHighlight>
    );
  };
  renderSeparator = () => {
    return <View style={{height: 1, width: '100%', backgroundColor: 'grey'}} />;
  };
  getDescription(index) {
    let item;
    if (this.props.language != 'en') {
      item = this.state.currentDataDescription[index];
    } else {
      item = this.state.constData[index].description;
    }
    return item;
  }
  async translateData() {
    let listTitle = [];
    let listDesc = [];

    if (this.props.language != 'en') {
      for (var i = 0; i < this.state.constData.length; i++) {
        var itemTitle = await TranslationService(
          this.state.constData[i].title,
          this.props.language,
        );
        listTitle.push(itemTitle);

        var itemDesc = await TranslationService(
          this.state.constData[i].description,
          this.props.language,
        );
        listDesc.push(itemDesc);
      }
    } else {
      for (var i = 0; i < this.state.constData.length; i++) {
        listTitle.push(this.state.constData[i].title);
        listDesc.push(this.state.constData[i].description);
      }
    }

    this.setState({
      currentDataTitle: listTitle,
      currentDataDescription: listDesc,
      isLoading: false,
    });
  }
  /*async translateDescription() {
    let listDesc = [];

    if (this.props.language != 'en') {
      for (var i = 0; i < this.state.constData.length; i++) {
        var item = await TranslationService(
          this.state.constData[i].description,
          this.props.language,
        );
        listDesc.push(item);
      }
    } else {
      for (var i = 0; i < this.state.constData.length; i++) {
        listDesc.push(this.state.constData[i].description);
      }
    }

    this.setState({
      currentDataDescription: listDesc,
      isLoading: false,
    });
  }*/
  async fetchData() {
    const url = 'https://www.nasa.gov/rss/dyn/breaking_news.rss';

    fetch(url)
      .then(response => response.text())
      .then(responseData => rssParser.parse(responseData))
      .then(rss => {
        this.setState({constData: rss.items});

        let list = [];
        for (var i = 0; i < rss.items.length; i++) {
          list.push(rss.items[i].title);
        }

        this.setState({
          currentDataTitle: list,
          isLoading: false,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.language !== this.props.language) {
      this.setState({
        isLoading: true,
      });
      this.translateData();
      //this.translateDescription();
    }
  }
  /*fetchData = async () => {
    const response = await fetch('https://www.tokentalk.co/rss');
    const json = await response.json();
    this.setState({data: json.results});
  };*/
  render() {
    const {currentDataTitle} = this.state;

    return this.state.isLoading ? (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#330066" animating />
      </View>
    ) : (
      <View style={styles.container}>
        <FlatList
          data={currentDataTitle}
          renderItem={this.renderItem}
          /*renderItem={(item, index) => (
            <RenderItem title={item} index={index} />
          )}*/
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {language: state.language};
};

export default connect(mapStateToProps)(Home);

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 15,
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
