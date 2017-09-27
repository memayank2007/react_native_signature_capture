import React, {
  Component, PropTypes
} from 'react';

import ReactNative, {
  View, Text, Modal, Platform, Alert,StyleSheet,TouchableHighlight
} from 'react-native';

import SignatureCapture from 'react-native-signature-capture';

const toolbarHeight = Platform.select({
  android: 0,
  ios: 22
});

const modalViewStyle = {
  paddingTop: toolbarHeight,
  flex: 1,
  position : 'relative',
  justifyContent : 'center'
};

class SignatureView extends Component {

  static propTypes = {
    onSave: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      blank: true
    };
  }

  show(display) {
    this.setState({visible: display});
  }

  render() {
    const {visible} = this.state;

    return (
      <Modal transparent={false} visible={visible} onRequestClose={this._onRequreClose.bind(this)}>
        <View style={modalViewStyle}>
          <View style={{padding: 10, flexDirection: 'row'}}>
            <Text onPress={this._onPressClose.bind(this)}>{' x '}</Text>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={{fontSize: 14}}>Please write your signature.</Text>
            </View>
          </View>

          <SignatureCapture
                    style={[{flex:1},styles.signature]}
                    ref="sign"
                    onDragEvent={this._onDragEvent.bind(this)}
                    onSaveEvent={this._onSaveEvent.bind(this)}
                    saveImageFileInExtStorage={false}
                    showNativeButtons={false}
                    showTitleLabel={true}
                    viewMode={"portrait"}/>
            <View style={{ flex: .1, flexDirection: "row" , height : 10}}>
                      <TouchableHighlight style={styles.buttonStyle}
                          onPress={() => { this.saveSign() } } >
                          <Text>Agree</Text>
                      </TouchableHighlight>

                      <TouchableHighlight style={styles.buttonStyle}
                          onPress={() => { this.resetSign() } } >
                          <Text>Reset</Text>
                      </TouchableHighlight>

              </View>
        </View>

      </Modal>
    );
  }

  _onPressClose() {
    this.show(false);
  }

  _onRequreClose() {
    this.show(false);
  }

  saveSign() {
    console.log('saving....');
      this.refs["sign"].saveImage();
    }

    resetSign() {
      console.log(this.state)
      this.setState({blank: true});
      console.log('on reset')
      this.refs["sign"].resetImage();

    }

  _onDragEvent() {
    // This callback will be called when the user enters signature
    console.log(this.state)
   console.log("dragged");
   this.setState({blank: false});
   console.log(this.state)
  }

  _onResetEvent() {
    // This callback will be called when the user enters signature
    console.log(this.state)
   console.log("reest");
    console.log(this.state)
  }

  _onSaveEvent(result) {
    //result.encoded - for the base64 encoded png
    //result.pathName - for the file path name
    console.log(result)
    if(this.state.blank){
      console.log('blank signature')
      Alert.alert(
          'Error',
          "Can't save blank signature!!",
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: true }
        )
      return;
    }
    else{
      this.setState({blank: true});
      this.props.onSave && this.props.onSave(result);
    }

  }
}

const styles = StyleSheet.create({
    signature: {
        flex: 1,
        borderColor: '#000033',
        borderWidth: 1,
        height:200
    },
    buttonStyle: {
        flex: 1, justifyContent: "center", alignItems: "center", height: 50,
        backgroundColor: "#eeeeee",
        margin: 1
    }
});

export default SignatureView;
