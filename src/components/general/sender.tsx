import { 
    StyleSheet, 
    View,
    Button
} from 'react-native';
import { useState } from 'react';
import axios from 'axios';

export default function Sender(audio:string){

    const [texto, setTexto] = useState<string>("");

    async function enviarAudio() {
        try{
            const res = await axios.post('')
        } catch(error) {

        }
    }

    return(
        <View>
            <Button 
                title='Enviar audio'
                onPress={()=>enviarAudio()}
            />
        </View>
    );
}

const styles = StyleSheet.create({

});