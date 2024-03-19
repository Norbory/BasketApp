import { 
  View, 
  Button  
} from 'react-native';
import * as Notifications from 'expo-notifications';
import { useSocket } from '../../context/SocketContext';
import { useEffect } from 'react';

export default function NotificationsHomeScreen() {

  const socket = useSocket();
  
  // Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
  async function sendPushNotification(message: string) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: message??'Notificación',
        body: 'Los Celtics vs. Los Lakers. ¡No te lo pierdas!',
        data: { data: 'Miralo aqui', url: 'https://www.nba.com/games' },
      },
      trigger: { seconds: 5 },
    });
  }

  useEffect(() => {
    if (socket == null) return;
  
    const handleNotification = (data: { message: string }) => {
      console.log('Evento server:notification recibido', data.message); // Esto se imprimirá cuando se reciba el evento
      if (data.message === "Alguien esta intentando contactarte") {
        const message = data.message;
        sendPushNotification(message);
      }
    };
  
    socket.on('server:notification', handleNotification);
  
    return () => {
      socket.off('server:notification', handleNotification);
    };
  }, [socket]);

  async function messageSent() {
    console.log('Mensaje enviado');
    if (socket) {
      socket.emit('client:notification', { socketId: socket.id }, (confirmation: any) => {
        console.log(confirmation);
      });
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
      <Button
        title="Notificame"
        onPress={async () => {await messageSent();}}
      />
    </View>
  );
}
