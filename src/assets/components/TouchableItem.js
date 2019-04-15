import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native'

export default TouchableItem = Platform.select({
  ios: TouchableOpacity,
  android: TouchableNativeFeedback
})