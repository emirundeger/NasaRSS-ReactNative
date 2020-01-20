import React from 'react';
import ActionSheet from 'react-native-actionsheet';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Image} from 'react-native';
import {connect} from 'react-redux';
import {changeLanguage} from '../actions/actions';

class LanguagePicker extends React.Component {
  state = {
    flagUrl: require('../../images/en.png'),
  };
  showActionSheet = () => {
    this.ActionSheet.show();
  };
  selectLanguage(index) {
    let language;

    switch (index) {
      case 1:
        this.setState({flagUrl: require('../../images/fr.png')});
        language = 'fr';
        break;
      case 2:
        this.setState({flagUrl: require('../../images/de.png')});
        language = 'de';
        break;
      case 3:
        this.setState({flagUrl: require('../../images/es.png')});
        language = 'es';
        break;
      default:
        this.setState({flagUrl: require('../../images/en.png')});
        language = 'en';
        break;
    }

    this.props.changeLanguage(language);
  }
  render() {
    return (
      <View style={styles.viewStyle}>
        <TouchableOpacity onPress={this.showActionSheet}>
          <Image
            style={styles.imageForButtonFlag}
            source={this.state.flagUrl}
          />
        </TouchableOpacity>
        <ActionSheet
          ref={o => (this.ActionSheet = o)}
          title={'Select the language'}
          options={['English', 'French', 'German', 'Spanish', 'Cancel']}
          cancelButtonIndex={4}
          //destructiveButtonIndex={0}
          onPress={index => this.selectLanguage(index)}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  changeLanguage: payload => dispatch(changeLanguage(payload)),
});

export default connect(null, mapDispatchToProps)(LanguagePicker);

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageForButtonFlag: {
    width: 28,
    height: 28,
    right: Platform.OS === 'ios' ? 10 : 10,
    bottom: Platform.OS === 'ios' ? 5 : -3,
  },
});
