import React from 'react';
import {View, Text} from 'react-native';

class Description extends React.Component {
  static navigationOptions = {
    title: 'News Detail',
    headerStyle: {
      backgroundColor: '#03A9F4',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center',
      justifyContent: 'center',
    },
  };
  removeCharacter(item) {
    let newItem = item.substr(1, item.length - 2);
    //let newItem = item.replace(/"/g, '');
    return newItem;
  }
  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text>
          {this.removeCharacter(
            JSON.stringify(navigation.getParam('description')),
          )}
        </Text>
      </View>
    );
  }
}

export default Description;
