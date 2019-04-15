import React, { Component } from 'react';
import { Text, View, FlatList, ActivityIndicator, Image, TextInput, Modal } from 'react-native';
import globalStyles from '../../assets/globalStyles';
import Fontawesome from 'react-native-vector-icons/FontAwesome'
import { normalize, ListItem, Divider } from 'react-native-elements'
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
            prevdata: [],
            next: '',
            morepoke:false,
            keyword: '',
            filter: false,
            types: false,
            type: '',
            abilities: false,
            ability: ''
        }
    }

    async componentDidMount(){
        axios.get('https://pokeapi.co/api/v2/pokemon/')
            .then((res1) => {
                let results = [...res1.data.results]
                results.map((item, index)=>{
                    axios.get(item.url).then((res2) => {
                        results[index] = { name: item.name, image: res2.data.sprites.front_default }
                        if(index == results.length - 1) this.setState({ data: results, prevdata: results, next: res1.data.next, loading: false})
                    })
                })
            })
    }

    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    pokeLists({ item, index }){
        return (
            <TouchableItem onPress={()=> this.props.navigation.navigate('Pokedetail', {name: item.name, image: item.image})}>
                <CustomCard
                    key={index}
                    moreStyle={{ flexDirection:'row', padding: 10, marginHorizontal: width * 0.05, marginVertical: 15, alignItems:'center', justifyContent:'center' }}
                >
                    <Image
                        source={{uri:item.image}}
                        style={{ width: height * 0.2, height: height * 0.2}}
                        resizeMethod='resize'
                        resizeMode='contain'
                    />
                    <View style={{ marginLeft:10, marginRight:10}}>
                        <Text style={[globalStyles.h1Left, {color:colors.gray2}]}>{item.name}</Text>
                    </View>
                </CustomCard>
            </TouchableItem>
        )
      }

    render() {
        return (
            <View style={globalStyles.container}>
                <Header height={130}/>
                <CustomCard
                    moreStyle={{ padding: 10, marginHorizontal: width * 0.05, marginVertical: 15, height: 60, alignItems:'center' }}
                >
                    <View style={{flexDirection:'row'}}>
                        <TextInput 
                            value={this.state.keyword}
                            placeholder='Enter Pokemon' 
                            placeholderTextColor={colors.gray2}
                            onChangeText={(keyword)=>{
                                if(keyword == '') this.setState({ keyword: keyword, data: this.state.prevdata })
                                this.setState({keyword:keyword, type:'', ability:''})
                            }}
                            onSubmitEditing={()=>{
                                setTimeout(()=>{
                                    if(this.state.keyword != ''){
                                        this.setState({ data: [], loading:true, type: '', ability: '' })
                                        axios.get('https://pokeapi.co/api/v2/pokemon/'+this.state.keyword.toLowerCase())
                                            .then((res) => {
                                                let results = { name: res.data.name, image: res.data.sprites.front_default }
                                                this.setState({ data: [results], loading:false })
                                            })
                                            .catch((err) => {
                                                let filteredData = this.state.prevdata;
                                                const newdata = filteredData.filter((item) => {
                                                    return item.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1
                                                })
                                                this.setState({ data: newdata, loading: false }) 
                                            })
                                    }
                                },100)
                            }}
                            style={[{fontSize:16, width:width*0.75, textAlign:'center', backgroundColor:colors.white, alignItems:'center'}]}
                        />
                        <TouchableItem
                            onPress={()=>this.setState({ filter: true })}
                        >
                            <Fontawesome
                                name="filter" 
                                color={colors.gray2} 
                                size={normalize(24)} 
                            />
                        </TouchableItem>
                    </View>
                </CustomCard>
                {
                    this.isEmpty(this.state.data) && this.state.loading ? 
                    <View style={globalStyles.centerContainer}>
                        <ActivityIndicator color={colors.purple} size='large' />
                    </View>
                        :
                    !this.isEmpty(this.state.data) ?
                    <FlatList
                        data={this.state.data}
                        keyExtractor={(item, index) => item.name}
                        renderItem={this.pokeLists.bind(this)}
                    />
                        :
                    <View style={globalStyles.centerContainer}>
                        <Text>Ups... There is no such as {this.state.keyword}{this.state.type == '' ? this.state.ability : this.state.type}</Text>
                    </View>
                }
                {
                    this.state.keyword != '' ?
                    null
                    :
                    <View style={globalStyles.absoluteFooterContainer} zIndex={1} >
                        <TouchableItem
                            onPress={() => {
                                this.setState({morepoke: true})
                                if(this.state.next != ''){
                                    axios.get(this.state.next)
                                        .then((res1) => {
                                            let results = [...this.state.data]
                                            res1.data.results.map((item, index)=>{
                                                axios.get(item.url).then((res2) => {
                                                    results.push({ name: item.name, image: res2.data.sprites.front_default })
                                                    if(index == res1.data.results.length - 1) this.setState({ data: results, prevdata: results, next: res1.data.next, morepoke: false})
                                                }).catch((err) => this.setState({morepoke: false}))
                                            })
                                        }).catch((err) => this.setState({morepoke: false}))
                                }else{
                                    this.setState({morepoke: false})
                                }
                        }}>
                            <View style={{
                                height: height * 0.06,
                                borderWidth: 0.25,
                                borderColor: '#cccccc',
                                borderRadius: 15,
                                backgroundColor: 'white',
                                elevation: 1,
                                padding: 3,
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginRight: width * 0.05
                            }}>
                                <View style={{
                                    marginVertical: 10,
                                    marginHorizontal: 20,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row'
                                }}>
                                    {
                                        this.state.morepoke ? <ActivityIndicator color={colors.purple} size='small' /> : null
                                    }
                                    <Text style={[globalStyles.h4Left, {marginLeft:this.state.morepoke ? 10 : 0}]}>Give more Pokemons !</Text>
                                </View>
                            </View>
                        </TouchableItem>
                    </View>
                }
                <Modal
                    visible={this.state.filter}
                    onRequestClose={() => this.setState({ filter: false })}
                    transparent
                    animationType='fade'
                >
                    <TouchableItem
                        onPress={() => this.setState({ filter: false })}
                    >
                        <View style={{ flex:1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)'}}>
                            <View style={{ backgroundColor: 'white', height: height * 0.3, padding: 15 }}>
                                <Text style={[globalStyles.h1Center, { marginBottom: 25 }]}>Filter by</Text>
                                <ListItem
                                    title='Types' 
                                    onPress={() => {
                                        this.setState({ filter: false, types: true })
                                    }}
                                    titleStyle={{ color: colors.dark }}
                                    containerStyle={{ borderBottomWidth: 0, backgroundColor: colors.white, elevation: 0.5 }}
                                />
                                <Divider />
                                <ListItem
                                    title='Abilities'
                                    onPress={() => {
                                        this.setState({ filter: false, abilities: true })
                                    }}
                                    titleStyle={{ color: colors.dark }}
                                    containerStyle={{ borderBottomWidth: 0, backgroundColor: colors.white, elevation: 0.5 }}
                                />
                            </View>
                        </View>
                    </TouchableItem>
                </Modal>
                <Modal
                    visible={this.state.types}
                    onRequestClose={() => this.setState({ types: false })}
                    transparent
                    animationType='fade'
                >
                    <TouchableItem
                        onPress={() => this.setState({ types: false })}
                    >
                        <View style={{ flex:1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)'}}>
                            <CustomCard
                                moreStyle={{ padding: 10, marginHorizontal: width * 0.05, marginVertical: 15, height: 60, backgroundColor:colors.white, alignItems:'center' }}
                            >
                                <TextInput 
                                    value={this.state.type}
                                    placeholder='Enter of Type' 
                                    placeholderTextColor={colors.gray2}
                                    onChangeText={(type)=>{
                                        if(type == '') this.setState({ type: type, data: this.state.prevdata })
                                        this.setState({type})
                                    }}
                                    onSubmitEditing={()=>{
                                        setTimeout(()=>{
                                            if(this.state.type != ''){
                                                this.setState({ data: [], loading:true, types: false })
                                                axios.get('https://pokeapi.co/api/v2/type/'+this.state.type.toLowerCase())
                                                    .then((res1) => {
                                                        let results = [...res1.data.pokemon]
                                                        results.map((item, index)=>{
                                                            axios.get(item.pokemon.url).then((res2) => {
                                                                results[index] = { name: item.pokemon.name, image: res2.data.sprites.front_default }
                                                                if(index == results.length - 1) this.setState({ data: results, loading: false})
                                                            })
                                                        })
                                                    })
                                                    .catch((err) => {
                                                        this.setState({ loading: false }) 
                                                    })
                                            }
                                        },100)
                                    }}
                                    style={[{fontSize:16, width:width*0.75, textAlign:'center', backgroundColor:colors.white, alignItems:'center'}]}
                                />
                            </CustomCard>
                        </View>
                    </TouchableItem>
                </Modal>
                <Modal
                    visible={this.state.abilities}
                    onRequestClose={() => this.setState({ abilities: false })}
                    transparent
                    animationType='fade'
                >
                    <TouchableItem
                        onPress={() => this.setState({ abilities: false })}
                    >
                        <View style={{ flex:1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)'}}>
                            <CustomCard
                                moreStyle={{ padding: 10, marginHorizontal: width * 0.05, marginVertical: 15, height: 60, backgroundColor:colors.white, alignItems:'center' }}
                            >
                                <TextInput 
                                    value={this.state.ability}
                                    placeholder='Enter of Ability' 
                                    placeholderTextColor={colors.gray2}
                                    onChangeText={(ability)=>{
                                        if(ability == '') this.setState({ ability: ability, data: this.state.prevdata })
                                        this.setState({ability})
                                    }}
                                    onSubmitEditing={()=>{
                                        setTimeout(()=>{
                                            if(this.state.ability != ''){
                                                this.setState({ data: [], loading:true, abilities: false })
                                                axios.get('https://pokeapi.co/api/v2/ability/'+this.state.ability.toLowerCase())
                                                    .then((res1) => {
                                                        let results = [...res1.data.pokemon]
                                                        results.map((item, index)=>{
                                                            axios.get(item.pokemon.url).then((res2) => {
                                                                results[index] = { name: item.pokemon.name, image: res2.data.sprites.front_default }
                                                                if(index == results.length - 1) this.setState({ data: results, loading: false})
                                                            })
                                                        })
                                                    })
                                                    .catch((err) => {
                                                        this.setState({ loading: false }) 
                                                    })
                                            }
                                        },100)
                                    }}
                                    style={[{fontSize:16, width:width*0.75, textAlign:'center', backgroundColor:colors.white, alignItems:'center'}]}
                                />
                            </CustomCard>
                        </View>
                    </TouchableItem>
                </Modal>
            </View>
        );
    }
}
