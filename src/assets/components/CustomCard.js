import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View
} from "react-native";
import colors from '../constants/colors';

export default class CustomCard extends PureComponent {
  render(){
    return(
      <View
        style={[styles.cardStyle, { ...this.props.moreStyle }]}
        {...this.props}
      >
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 7,
    elevation: 2
  }
})