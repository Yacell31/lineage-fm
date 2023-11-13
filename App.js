import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MusicScreen from './screens/Player';
import MusicPlayer from './screens/Player';


export default function App() {
  return (
    <View style={styles.container}>
     <MusicPlayer></MusicPlayer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
