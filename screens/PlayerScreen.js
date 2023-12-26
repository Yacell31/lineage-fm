import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	Button,
	Image,
	TouchableOpacity,
	Switch,
} from "react-native";
import {
	Audio,
	InterruptionModeAndroid,
	InterruptionModeIOS,
	ResizeMode,
	Video,
} from "expo-av";
import { MaterialIcons } from "@expo/vector-icons"; // Make sure to install @expo/vector-icons

import { STREAM_URL, API_URL } from "@env";
import SkeletonLoader from "../components/SkeletonLoading";

export default function PlayerScreen() {
	const [sound, setSound] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isActiveInBackground, setIsActiveInBackground] = useState(false);
	const [currentTrackData, setCurrentTrackData] = useState();

	const fetchTrackInfo = async () => {
		try {
			const response = await fetch(API_URL);
			const data = await response.json();
			console.log(data["current-track"]);
			const trackData = data["current-track"];
			setCurrentTrackData(trackData);
		} catch (error) {
			console.error("Error fetching track info:", error);
		}
	};

	async function playAudio() {
		if (sound) {
			await sound.playAsync();
			setIsPlaying(true);
			setIsLoading(false);
		} else {
			console.log("Audio not loaded yet");
			setIsLoading(true);
		}
	}

	async function pauseAudio() {
		if (sound) {
			await sound.pauseAsync();
			setIsPlaying(false);
		}
	}

	useEffect(() => {
		fetchTrackInfo();

		// Set up interval to fetch track info
		const intervalId = setInterval(fetchTrackInfo, 30000);

		Audio.requestPermissionsAsync();
		Audio.setAudioModeAsync({
			staysActiveInBackground: isActiveInBackground,
			interruptionModeIOS: InterruptionModeIOS.DoNotMix,
			playsInSilentModeIOS: true,
			shouldDuckAndroid: false,
			interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
			playThroughEarpieceAndroid: false,
		});

		(async () => {
			try {
				const { sound } = await Audio.Sound.createAsync({ uri: STREAM_URL });
				setSound(sound);
				if (sound) {
					await sound.playAsync();
					setIsPlaying(true);
				}
			} catch (e) {
				console.error("Failed to load audio", e);
			}
		})();
		// Clear interval when component unmounts
		return () => clearInterval(intervalId);
	}, []);
	return (
		<View style={styles.container}>
			{!sound ? (
				<SkeletonLoader></SkeletonLoader>
			) : (
				<View style={styles.container}>
					<Switch
						trackColor={{ false: "#767577", true: "#81b0ff" }}
						thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
						ios_backgroundColor="#3e3e3e"
						onValueChange={setIsActiveInBackground(!isActiveInBackground)}
						value={isActiveInBackground}
					/>
					<View style={styles.card}>
						<View>
							<Image
								source={require("../assets/waves-2.png")}
								style={styles.imageWave}
							/>
						</View>

						<Image
							source={require("../assets/logo-linaje-fm.jpg")}
							style={styles.image}
						/>
						<Text style={styles.title}>{currentTrackData?.artist}</Text>
						<Text style={styles.subtitle}>{currentTrackData?.title}</Text>
						<View style={styles.waveformContainer}></View>
						<View style={styles.controlsContainer}>
							<TouchableOpacity>
								<MaterialIcons name="skip-previous" size={36} color="#8AB4FC" />
							</TouchableOpacity>
							{isPlaying ? (
								<TouchableOpacity
									style={styles.playButton}
									onPress={pauseAudio}
								>
									<MaterialIcons
										name="pause-circle-outline"
										size={36}
										color="#0A62FB"
									/>
								</TouchableOpacity>
							) : (
								<TouchableOpacity style={styles.playButton} onPress={playAudio}>
									<MaterialIcons
										name="play-circle-filled"
										size={36}
										color="#0A62FB"
									/>
								</TouchableOpacity>
							)}
							<TouchableOpacity>
								<MaterialIcons name="skip-next" size={36} color="#8AB4FC" />
							</TouchableOpacity>
						</View>
					</View>
					<Text style={styles.textFooter}>
						Todo lo puedo, en Cristo que me fortalece- Filipenses 4:133
					</Text>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#EBF5FB",
		alignItems: "center",
		justifyContent: "center",
		padding: 10,
	},

	card: {
		borderRadius: 20,
		padding: 10,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		backgroundColor: "#FDFEFE",
	},

	image: {
		width: 160,
		height: 160,
		borderRadius: 60,
		marginBottom: 5,
	},

	imageWave: {
		width: 310,
		height: 170,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#0A62FB",
		marginBottom: 5,
	},
	subtitle: {
		fontSize: 18,
		color: "#0A62FB",
		fontStyle: "italic",
		padding: 10,
	},

	textFooter: {
		fontSize: 10,
		color: "#0A62FB",
		padding: 15,
		fontStyle: "italic",
	},

	waveformContainer: {
		// Style for your waveform component
		width: "100%",
		height: 10,
		backgroundColor: "#0A62FB", // Placeholder color
		marginBottom: 20,
	},
	controlsContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	playButton: {
		marginHorizontal: 30,
		color: "#0A62FB",
	},
});
