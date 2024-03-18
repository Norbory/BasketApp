import { View, Button, StyleSheet } from "react-native";
import { useState } from "react";
import { Audio } from 'expo-av';
// import Sender from '../components/general/sender';

export const HomeScreen = () => {
    const [recording, setRecording] = useState<Audio.Recording>();
    const [permissionResponse, requestPermission] = Audio.usePermissions();

    async function startRecording() {
        try {
        if (permissionResponse?.status !== 'granted') {
            await requestPermission();
        }
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setRecording(recording);
        } catch (err) {
        console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        setRecording(undefined);
        await recording?.stopAndUnloadAsync();
        await Audio.setAudioModeAsync(
        {
            allowsRecordingIOS: false,
        }
        );
        const uri = recording?.getURI();
    }

    return (
        <View style={styles.container}>
            <Button
                title={recording ? 'Stop Recording' : 'Start Recording'}
                onPress={recording ? stopRecording : startRecording}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
    },
});