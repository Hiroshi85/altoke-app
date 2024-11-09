import { StyleSheet, Image, Platform, View, FlatList } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Appbar, Button, Card, Text, TextInput } from 'react-native-paper';
import { model, quitarEstiloMarkdown } from '@/utils/gemini';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

export default function TabTwoScreen() {
  const [message, setMessage] = useState<string>(''); // El mensaje que se escribe
  const [messages, setMessages] = useState<Message[]>([]); // Array de mensajes
  const [isWaitingForResponse, setIsWaitingForResponse] = useState<boolean>(true); // Indicador de espera
  const flatListRef = useRef<FlatList>(null); // Referencia para el FlatList
  const [chat, setChat] = useState<any>(null); // Referencia al chat de Gemini

  // Datos cuantitativos (ejemplo de ventas y objetivos)
  const ventasHoy = 100;
  const objetivoMañana = 120;
  const ventasSemana = 500;

  // Inicializar el chat y obtener las recomendaciones iniciales
  useEffect(() => {
    const initializeChat = async () => {
      try {
        // Inicializar el chat de Gemini con datos iniciales y obtener la respuesta
        const initialChat = model.startChat({
          history: [
            {
              role: "user",
              parts: [
                {
                  text: `Datos de ventas:
                    Ventas de hoy: ${ventasHoy} productos
                    Objetivo de ventas para mañana: ${objetivoMañana} productos
                    Ventas acumuladas esta semana: ${ventasSemana} productos.
                    ¿Cuáles son tus recomendaciones para el día siguiente?. ¿Qué tendencias hay?`,
                },
              ],
            },
          ],
        });

        // Enviar el mensaje y recibir la recomendación inicial
        const result = await initialChat.sendMessage("");
        const response = result.response;
        const recommendation = quitarEstiloMarkdown(response.text());

        // Añadir la respuesta del modelo como el primer mensaje
        const botMessage: Message = { id: 1, text: recommendation, isUser: false };
        setMessages([botMessage]);
        setIsWaitingForResponse(false); // Ahora el usuario puede interactuar
        setChat(initialChat); // Guardar el chat para futuras interacciones
      } catch (error) {
        console.error("Error al iniciar el chat:", error);
        setIsWaitingForResponse(false);
      }
    };

    if(!chat) initializeChat();
  }, []);

  const sendMessage = async () => {
    if (message.trim() && chat && !isWaitingForResponse) {
      // Crear el mensaje del usuario
      const userMessage: Message = { id: messages.length + 1, text: message, isUser: true };

      // Actualizamos el estado con el mensaje del usuario
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      // Limpiar el campo de entrada
      setMessage('');

      // Establecer que estamos esperando una respuesta
      setIsWaitingForResponse(true);

      // Enviar el mensaje del usuario y recibir la respuesta del modelo
      try {
        const result = await chat.sendMessage(message); // Enviar el mensaje de consulta
        const response = await result.response; // Obtener la respuesta del modelo
        const modelResponse = response.text(); // Respuesta de Gemini

        // Añadir la respuesta del modelo al chat
        const botMessage: Message = { id: messages.length + 2, text: modelResponse, isUser: false };
        setMessages((prevMessages) => [...prevMessages, botMessage]);

        // Finalizar la espera
        setIsWaitingForResponse(false);
      } catch (error) {
        console.error("Error al enviar el mensaje:", error);
        setIsWaitingForResponse(false);
      }
    }
  };

  // Scroll al final cada vez que los mensajes cambian
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const renderMessage = ({ item }: { item: Message }) => (
    <Card
      style={[styles.messageCard, item.isUser ? styles.userMessage : styles.botMessage]}
    >
      <Text >{item.text}</Text>
      
      
    </Card>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Chat de Recomendaciones" />
      </Appbar.Header>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesContainer}
        inverted={false} // Mensajes de arriba a abajo
      />

      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          placeholder="Escribe un mensaje"
          value={message}
          onChangeText={(text) => setMessage(text)}
          style={styles.input}
          editable={!isWaitingForResponse} // Deshabilitar cuando se espera respuesta
        />
        <Button
          mode="contained"
          onPress={sendMessage}
          style={styles.sendButton}
          disabled={isWaitingForResponse || message.trim() === ''} // Deshabilitar si estamos esperando o el campo está vacío
        >
          Enviar
        </Button>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  messagesContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    paddingBottom: 80, // Un pequeño margen en la parte inferior para el input
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
  sendButton: {
    justifyContent: 'center',
  },
  messageCard: {
    maxWidth: '80%', // Limita el ancho del globo de mensaje
    padding: 10,
    borderRadius: 10,
  },
  userMessage: {
    color: 'white',
    alignSelf: 'flex-end',
    backgroundColor: '#6200ee',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#03dac5',
  },
});

// const styles = StyleSheet.create({
//   headerImage: {
//     color: '#808080',
//     bottom: -90,
//     left: -35,
//     position: 'absolute',
//   },
//   titleContainer: {
//     flexDirection: 'row',
//     gap: 8,
//   },
// });
