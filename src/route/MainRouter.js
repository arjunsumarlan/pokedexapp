import {
    createStackNavigator,
    createAppContainer
  } from "react-navigation";
  import {
    Pokedex,
    Pokedetail
  } from "../screens";
  
  const MainRoute = createStackNavigator({
    Pokedex: {
      screen: Pokedex,
      navigationOptions: {
        header: null
      }
    },
    Pokedetail: {
      screen: Pokedetail,
      navigationOptions: {
        header: null
      }
    }
  }, {
    initialRouteName: "Pokedex"
  })

  export default createAppContainer(MainRoute);