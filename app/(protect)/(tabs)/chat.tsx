import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View, FlatList } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Appbar, Button, Card, Text, TextInput } from 'react-native-paper';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

export default function TabTwoScreen() {
  const [message, setMessage] = useState<string>(''); // El mensaje que se escribe
  const [messages, setMessages] = useState<Message[]>([]); // Array de mensajes
  const [isWaitingForResponse, setIsWaitingForResponse] = useState<boolean>(false); // Indicador de espera
  const flatListRef = useRef<FlatList>(null); // Referencia para el FlatList

  const sendMessage = () => {
    if (message.trim() && !isWaitingForResponse) {
      // Crear el mensaje del usuario
      const userMessage: Message = { id: messages.length, text: message, isUser: true };
      
      // Actualizamos el estado con el mensaje del usuario
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      
      // Limpiar el campo de entrada
      setMessage('');

      // Establecer que estamos esperando una respuesta
      setIsWaitingForResponse(true);

      // Simular una respuesta del bot después de 2 segundos
      setTimeout(() => {
        const botMessage: Message = { id: messages.length + 1, text: 'Respuesta automática', isUser: false };
        
        // Añadir el mensaje del bot al array
        setMessages((prevMessages) => [...prevMessages, botMessage]);

        // Finalizar la espera
        setIsWaitingForResponse(false);
      }, 2000);
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
      <Text style={{ color: 'white' }}>{item.text}</Text>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Chat" />
      </Appbar.Header>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesContainer}
        inverted={false} // Aseguramos que el orden de los mensajes es de arriba a abajo
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
  // return (
    
  //   // <ParallaxScrollView
  //   //   headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
  //   //   headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
  //   //   <ThemedView style={styles.titleContainer}>
  //   //     <ThemedText type="title">Explore</ThemedText>
  //   //   </ThemedView>
  //   //   <ThemedText>This app includes example code to help you get started.</ThemedText>
  //   //   <Collapsible title="File-based routing">
  //   //     <ThemedText>
  //   //       This app has two screens:{' '}
  //   //       <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
  //   //       <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
  //   //     </ThemedText>
  //   //     <ThemedText>
  //   //       The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
  //   //       sets up the tab navigator.
  //   //     </ThemedText>
  //   //     <ExternalLink href="https://docs.expo.dev/router/introduction">
  //   //       <ThemedText type="link">Learn more</ThemedText>
  //   //     </ExternalLink>
  //   //   </Collapsible>
  //   //   <Collapsible title="Android, iOS, and web support">
  //   //     <ThemedText>
  //   //       You can open this project on Android, iOS, and the web. To open the web version, press{' '}
  //   //       <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.
  //   //     </ThemedText>
  //   //   </Collapsible>
  //   //   <Collapsible title="Images">
  //   //     <ThemedText>
  //   //       For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{' '}
  //   //       <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for
  //   //       different screen densities
  //   //     </ThemedText>
  //   //     <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
  //   //     <ExternalLink href="https://reactnative.dev/docs/images">
  //   //       <ThemedText type="link">Learn more</ThemedText>
  //   //     </ExternalLink>
  //   //   </Collapsible>
  //   //   <Collapsible title="Custom fonts">
  //   //     <ThemedText>
  //   //       Open <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText> to see how to load{' '}
  //   //       <ThemedText style={{ fontFamily: 'SpaceMono' }}>
  //   //         custom fonts such as this one.
  //   //       </ThemedText>
  //   //     </ThemedText>
  //   //     <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
  //   //       <ThemedText type="link">Learn more</ThemedText>
  //   //     </ExternalLink>
  //   //   </Collapsible>
  //   //   <Collapsible title="Light and dark mode components">
  //   //     <ThemedText>
  //   //       This template has light and dark mode support. The{' '}
  //   //       <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect
  //   //       what the user's current color scheme is, and so you can adjust UI colors accordingly.
  //   //     </ThemedText>
  //   //     <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
  //   //       <ThemedText type="link">Learn more</ThemedText>
  //   //     </ExternalLink>
  //   //   </Collapsible>
  //   //   <Collapsible title="Animations">
  //   //     <ThemedText>
  //   //       This template includes an example of an animated component. The{' '}
  //   //       <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> component uses
  //   //       the powerful <ThemedText type="defaultSemiBold">react-native-reanimated</ThemedText> library
  //   //       to create a waving hand animation.
  //   //     </ThemedText>
  //   //     {Platform.select({
  //   //       ios: (
  //   //         <ThemedText>
  //   //           The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
  //   //           component provides a parallax effect for the header image.
  //   //         </ThemedText>
  //   //       ),
  //   //     })}
  //   //   </Collapsible>
  //   // </ParallaxScrollView>
  // );
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
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  userMessage: {
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
