import React, { useEffect, useState } from "react";
import { View, StyleSheet,ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SplashScreen from 'expo-splash-screen';


// Suppress the splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();




const SplashScreenComponent = () => {
	const [loading, setLoading] = useState(true);
	const navigation = useNavigation();


    useEffect(() => {
        setTimeout(() => {
          SplashScreen.hideAsync(); // Hide the splash screen
          navigation.replace('MainScreen'); // Navigate to the MainScreen
        }, 2000);
      }, [navigation]);
    


	return (
		<View style={styles.loadingContainer}
		>
			{/* Add a loading spinner if you like */}
		</View>
	);
};

const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		width: null,
		height: null,
		justifyContent: "center",
		alignItems: "center",
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.2)", // Optional: adds a dark overlay to the image
	},
});

export default SplashScreenComponent;
