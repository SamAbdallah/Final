import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import OnBoarding from './pages/onBoarding';
import OnBoarding2 from './pages/Onboarding2';

export default function App() {
  return (
    <View style={styles.container}>
      <OnBoarding2></OnBoarding2>
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
