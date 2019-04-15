import React, { PureComponent } from 'react';
import {
  View,
  Image
} from "react-native";
import GradView from './GradientContainer'

export default class Header extends PureComponent {
  render(){
    return(
      <View>
        <GradView height={this.props.height}/> 
        <View style={{alignItems:'center', justifyContent:'center'}}>
            <Image
                source={require('../../assets/images/Pokemon.png')}
                style={{ height: 80}}
                resizeMethod='resize'
                resizeMode='contain'
            />
        </View> 
      </View>
    )
  }
}