import React, { PureComponent } from 'react';
import {
  StyleSheet
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { height } from '../constants/constants';

export default class GradView extends PureComponent {
  render(){
    return(
      <LinearGradient
        colors={['#AE0FF9', '#8135F8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.8, y: 1.0}}
        style={[style.container, { ...this.props.containerStyle, height: this.props.height ? this.props.height : height * 0.33333 }]}
      >
        {this.props.children}
      </LinearGradient>
    )
  }
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    zIndex: 0
  }
})