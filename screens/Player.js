import React from 'react';
import { View, Button } from 'react-native';
import TrackPlayer, { usePlaybackState } from 'react-native-track-player';

TrackPlayer.setupPlayer().then(async () => {
    await TrackPlayer.add({
        id: 'live365-stream',
        url: 'https://live365.com/station/Lineage-FM-a13105', // Replace with your Live365 stream URL
        title: 'Live Stream',
        artist: 'Live365',
    });

    TrackPlayer.play();
});

const MusicPlayer = () => {
    const playbackState = usePlaybackState();

    const play = async () => {
        await TrackPlayer.play();
    };

    const pause = async () => {
        await TrackPlayer.pause();
    };

    const stop = async () => {
        await TrackPlayer.stop();
    };

    return (
        <View>
            <Button title="Play" onPress={play} disabled={playbackState === TrackPlayer.STATE_PLAYING} />
            <Button title="Pause" onPress={pause} disabled={playbackState === TrackPlayer.STATE_PAUSED} />
            <Button title="Stop" onPress={stop} />
        </View>
    );
};

export default MusicPlayer;
