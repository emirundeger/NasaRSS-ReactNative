import React from 'react';
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableHighlight,
  Button,
} from 'react-native';
import Item from '../Item';
import Description from '../Description';
import {List, ListItem} from 'react-native-elements';
import * as rssParser from 'react-native-rss-parser';

class Home extends React.Component {
  state = {
    data: [],
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
    headerRight: () => (
      <Button
        onPress={() => alert('This is a button!')}
        title="Info"
        //color="#fff"
      />
    ),
  };

  renderItem = ({item}) => {
    const {navigate} = this.props.navigation;
    return (
      // <Item title={item.title} description={item.description} nav={navigate} />
      <TouchableHighlight
        onPress={() => {
          this.props.navigation.navigate('Description', {
            description: item.description,
          });
        }}>
        <Text style={{fontSize: 18, marginBottom: 15}}>{item.title}</Text>
      </TouchableHighlight>
      /*<View style={{flex: 1, flexDirection: 'row', marginBottom: 3}}>
        <Text style={{fontSize: 18, marginBottom: 15}}>{item.title}</Text>
      </View>*/
    );
  };

  renderSeparator = () => {
    return <View style={{height: 1, width: '100%', backgroundColor: 'grey'}} />;
  };

  componentDidMount() {
    //this.fetchData();
    const url = 'https://www.nasa.gov/rss/dyn/breaking_news.rss';

    fetch(url)
      .then(response => response.text())
      .then(responseData => rssParser.parse(responseData))
      .then(rss => {
        this.setState({
          data: rss.items,
          isLoading: false,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  /*fetchData = async () => {
    const response = await fetch('https://www.tokentalk.co/rss');
    const json = await response.json();
    this.setState({data: json.results});
  };*/

  render() {
    return this.state.isLoading ? (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#330066" animating />
      </View>
    ) : (
      <View style={styles.container}>
        {/* <Text style={styles.headerText}>Home Activity</Text> */}
        {/* <Button
          title="Go to Profile Activity"
          onPress={() => this.props.navigation.navigate('Profile')}
        /> */}
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}

export default Home;

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
