import React, { Component } from 'react';
import { Text, View, ActivityIndicator, Image, ScrollView, ProgressBarAndroid } from 'react-native'; 
import globalStyles from '../../assets/globalStyles';
import { width, height } from '../../assets/constants/constants';
import TouchableItem from '../../assets/components/TouchableItem'
import CustomCard from '../../assets/components/CustomCard'
import Header from '../../assets/components/Header'
import colors from '../../assets/constants/colors';
import axios from 'axios'


export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading:true,
            data: [],
            name: this.props.navigation.state.params.name,
            image: this.props.navigation.state.params.image
        }
    }

    async componentDidMount(){
        axios.get('https://pokeapi.co/api/v2/pokemon/'+this.state.name.toLowerCase())
            .then((res) => {
              this.setState({ data: [res.data], loading: false})
            })
    }

    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    render() {
        return (
            <View style={globalStyles.container}>
                <Header height={120}/>
                <CustomCard
                    moreStyle={{ padding: 10, marginHorizontal: width * 0.05, marginVertical: 15}}
                >
                  <View style={{alignItems:'center'}}>
                    <Text style={globalStyles.pokename}>{this.state.name}</Text>
                  </View>
                </CustomCard>
                {
                  this.isEmpty(this.state.data) && this.state.loading ? 
                  <View style={globalStyles.centerContainer}>
                      <ActivityIndicator color={colors.purple} size='large' />
                  </View>
                      :
                  !this.isEmpty(this.state.data) ?
                  <ScrollView>
                    <CustomCard
                      moreStyle={{ padding: 10, marginHorizontal: width * 0.05, alignItems:'center', justifyContent:'center' }}
                    >
                      <Image
                          source={{uri:this.state.image}}
                          style={{ width: height * 0.35, height: height * 0.35}}
                          resizeMethod='resize'
                          resizeMode='contain'
                      />
                    </CustomCard>
                    <View style={{ marginTop:15, marginBottom:height*0.15, marginLeft: width * 0.15, marginRight: width * 0.15 }}>
                      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={[globalStyles.h1Left, {color:colors.gray2, fontWeight:'bold', marginTop: 15}]}>Weight</Text>
                        <Text style={[globalStyles.h1Left, {color:colors.gray2, marginTop: 15}]}>{this.state.data[0].weight}</Text>
                      </View>
                      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={[globalStyles.h1Left, {color:colors.gray2, fontWeight:'bold', marginTop: 15}]}>Height</Text>
                        <Text style={[globalStyles.h1Left, {color:colors.gray2, marginTop: 15}]}>{this.state.data[0].height}</Text>
                      </View>
                        <Text style={[globalStyles.h1Left, {color:colors.gray2, fontWeight:'bold', marginTop: 15}]}>Abilities</Text>
                        <View style={{marginLeft:width*0.1}}>
                          {
                            this.state.data[0].abilities.map((item, index) => {
                              return(
                                <Text key={index} style={[globalStyles.h1Left, {color:colors.gray2, marginTop: 15}]}>{item.ability.name}</Text>
                              )
                            })
                          }
                        </View>
                        <Text style={[globalStyles.h1Left, {color:colors.gray2, fontWeight:'bold', marginTop: 15}]}>Types</Text>
                        <View style={{marginLeft:width*0.1}}>
                          {
                            this.state.data[0].types.map((item, index) => {
                              return(
                                <Text key={index} style={[globalStyles.h1Left, {color:colors.gray2, marginTop: 15}]}>{item.type.name}</Text>
                              )
                            })
                          }
                        </View>
                        <Text style={[globalStyles.h1Left, {color:colors.gray2, fontWeight:'bold', marginTop: 15}]}>Stats</Text>
                        <View style={{marginLeft:width*0.1}}>
                          {
                            this.state.data[0].stats.map((item, index) => {
                              return(
                                <View key={index}>
                                  <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                    <Text style={[globalStyles.h1Left, {color:colors.gray2, marginTop: 15}]}>{item.stat.name}</Text>
                                    <Text style={[globalStyles.h1Left, {color:parseInt(item.base_stat) >= 50 ? colors.green : colors.red, marginTop: 15}]}>{item.base_stat}%</Text>
                                  </View>
                                  <ProgressBarAndroid
                                    styleAttr="Horizontal"
                                    indeterminate={false}
                                    progress={parseInt(item.base_stat)/100}
                                    color={colors.green}
                                  />
                                </View>
                              )
                            })
                          }
                        </View>
                    </View>
                  </ScrollView>
                      :
                  <View style={globalStyles.centerContainer}>
                      <Text>Please, Check your network connection !</Text>
                  </View>
                }

                <View style={globalStyles.absoluteFooterContainer} zIndex={1} >
                  <TouchableItem
                    onPress={() => this.props.navigation.goBack()
                  }>
                    <View style={{
                        height: height * 0.06,
                        borderWidth: 0.25,
                        borderColor: '#cccccc',
                        borderRadius: 15,
                        backgroundColor: colors.white,
                        elevation: 1,
                        padding: 3,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <View style={{
                            marginVertical: 10,
                            marginHorizontal: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}>
                            <Text style={globalStyles.h4Left}>Back to My Pokedex !</Text>
                        </View>
                    </View>
                  </TouchableItem>
                </View>
            </View>
        );
    }
}
