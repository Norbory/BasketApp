import { 
    StyleSheet, 
    View,
    Button
} from 'react-native';
import Sender from './src/components/general/sender';
import { useState } from 'react';
import { Audio } from 'expo-av';

export default function App() {
  const [recording, setRecording] = useState<Audio.Recording>();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  
  async function startRecording() {
    try {
      if (permissionResponse?.status !== 'granted') {
        console.log('Requesting permission..');
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording?.stopAndUnloadAsync();
    await Audio.setAudioModeAsync(
      {
        allowsRecordingIOS: false,
      }
    );
    const uri = recording?.getURI();
    console.log('Recording stopped and stored at', uri);
  }

  return (
    <View style={styles.container}>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
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
    button: {
        borderRadius: 10,
        width: 200, // Ajusta el ancho del Pressable según sea necesario
        height: 50, // Ajusta la altura del Pressable según sea necesario
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007bff', // Cambia el color de fondo del Pressable según sea necesario
    },
    buttonText: {
        color: '#fff', // Cambia el color del texto del Pressable según sea necesario
        fontSize: 16, // Ajusta el tamaño de fuente del texto del Pressable según sea necesario
        fontWeight: 'bold', // Cambia el peso del texto del Pressable según sea necesario
    },
    text: {
        marginTop: 20, // Añade un espacio entre el Pressable y el texto
        fontSize: 18, // Ajusta el tamaño de fuente del texto según sea necesario
        textAlign: 'center', // Alinea el texto al centro
    },
});
