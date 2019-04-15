import {
  StyleSheet,
  StatusBar
} from 'react-native';
import colors from './constants/colors';
import { normalize } from 'react-native-elements';
import { height, width } from './constants/constants';
import { Header } from 'react-navigation';

export default globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  centerContainer: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerTitle: {
    fontFamily: 'SanomatSans',
    textAlign: 'center',
    fontSize: normalize(42)
  },
  pokename: {
    color:colors.dark, 
    fontSize:18, 
    width:width*0.85, 
    textAlign:'center', 
    backgroundColor:colors.white
  },
  h1Center: {
    fontFamily: 'SanomatSans',
    textAlign: 'center',
    fontSize: normalize(20)
  },
  h2Center: {
    fontFamily: 'SanomatSans',
    textAlign: 'center',
    fontSize: normalize(14)
  },
  h1Left: {
    fontFamily: 'SanomatSans',
    fontSize: normalize(20),
    color: colors.dark
  },
  h4Left: {
    fontFamily: 'SanomatSans',
    fontSize: normalize(14),
    color: colors.dark
  },
  h4Center: {
    fontFamily: 'SanomatSans',
    fontSize: normalize(14),
    color: colors.dark,
    textAlign: 'center'
  },
  headerContainer: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%'
  },
  absoluteFooterContainer: {
    flex: 1,
    marginTop: height * 0.85,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
  }
})