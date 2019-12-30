import React from 'react';
import Home from './Home/index';
import Description from './Description';
import {View, Text, TouchableOpacity, TouchableHighlight} from 'react-native';

class Item extends React.Component {
  //goToDescription = () => this.props.navigation.push('Details');
  /*goToDescription = () =>
    navigate('Description', {description: this.props.description});*/
  render() {
    //const {navigate} = this.props.navigation;
    return (
      <View style={{flex: 1, flexDirection: 'row', marginBottom: 3}}>
        <TouchableHighlight
          style={styles.button}
          onPress={() =>
            this.props.nav('Description', {
              description: this.props.description,
            })}>
          <Text style={{fontSize: 18, marginBottom: 15}}>
            {this.props.title}
          </Text>
        </TouchableHighlight>
      </View>
    );
    // const {title, description} = this.state;

    // const {navigate} = this.props.navigation;
    // return (
    //   <TouchableOpacity
    //     onPress={() => {
    //       props.navigation.navigate('Home');
    //     }}>
    //     <View style={{flex: 1, flexDirection: 'row', marginBottom: 3}}>
    //       <Text style={{fontSize: 18, marginBottom: 15}}>{description}</Text>
    //     </View>
    //   </TouchableOpacity>
    // );
  }
}

export default Item;
