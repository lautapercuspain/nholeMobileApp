// @flow

import React, { Component } from 'react';
import { View, Text, TextInput, Keyboard, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import type { NavigationScreenProp } from 'react-navigation';

import { Page, Checkbox, FullButton } from 'nholeMobileApp/src/components';
import { sendMessage } from '../../modules/Message/actions';
import navigationHeader from '../../utils/navigationHeader';
import theme from 'nholeMobileApp/src/theme';

class Message extends Component<DispatchProps & NavigationScreenProp, StateType> {
  static navigationOptions = navigationHeader('Message');

  state = {
    slot: '',
    message: '',
  };

  handleTouchTap = slot => {
    this.setState({ slot });
  };

  sendMessageToClient = () => {
    Keyboard.dismiss();
    this.props.sendMessage(this.state.message, this.state.slot);
  };

  render() {
    return (
      <Page backgroundColor={'#fff'}>
        <TextInput
          style={styles.message}
          placeholder="Entrez votre message ici :)"
          onChangeText={message => this.setState({ message })}
          underlineColorAndroid={theme.color.blue}
          multiline
        />
        <Text style={styles.text}>Choisissez le créneau :</Text>
        <View style={styles.container}>
          <View style={styles.radioButtons}>
            <Checkbox
              style={styles.radioButton}
              text={'Matin'}
              onPress={() => this.handleTouchTap('morning')}
              isChecked={this.state.slot === 'morning' ? true : false}
              isRadioButton
            />
            <Checkbox
              style={styles.radioButton}
              text={'Midi'}
              onPress={() => this.handleTouchTap('lunch')}
              isChecked={this.state.slot === 'lunch' ? true : false}
              isRadioButton
            />
          </View>
          <View style={styles.radioButtons}>
            <Checkbox
              style={styles.radioButton}
              text={'Après-midi'}
              onPress={() => this.handleTouchTap('afternoon')}
              isChecked={this.state.slot === 'afternoon' ? true : false}
              isRadioButton
            />
            <Checkbox
              style={styles.radioButton}
              text={'Soir'}
              onPress={() => this.handleTouchTap('evening')}
              isChecked={this.state.slot === 'evening' ? true : false}
              isRadioButton
            />
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <FullButton onPress={this.sendMessageToClient} title="Envoyer" disabled={!this.state.slot} />
          <FullButton
            onPress={() => this.props.navigation.navigate('clients')}
            title="Voir mes clients"
            secondaryButton
          />
        </View>
      </Page>
    );
  }
}

type StateType = {
  slot: string,
  message: string,
};

type DispatchProps = {
  sendMessage: Function,
};

const mapDispatchToProps: DispatchProps = {
  sendMessage,
};

export default connect(null, mapDispatchToProps)(Message);

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    flexDirection: 'row',
  },
  radioButtons: {
    width: 150,
  },
  radioButton: {
    marginVertical: 5,
  },
  message: {
    height: 140,
    fontSize: theme.fontSize.normal,
  },
  text: {
    fontSize: theme.fontSize.normal,
    marginTop: 8,
  },
  buttonsContainer: {
    height: 100,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
