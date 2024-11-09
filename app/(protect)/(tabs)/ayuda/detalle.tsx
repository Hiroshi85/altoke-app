import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { WebView } from 'react-native-webview';

// Define la interfaz de parámetros para recibir el detalle de capacitación
interface Training {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  resources: string[];
}

type TrainingDetailRouteProp = RouteProp<{ TrainingDetail: { training: Training } }, 'TrainingDetail'>;

const TrainingDetailScreen: React.FC = () => {
  const route = useRoute<TrainingDetailRouteProp>();
  const { training } = route.params;

  // Extraer el ID del video de YouTube de la URL
  const getYoutubeVideoId = (url: string) => {
    const id = url.split("?v=")[1];
    return id;
  };

  const videoId = getYoutubeVideoId(training.videoUrl);
  const videoUrl = `https://www.youtube.com/embed/${videoId}`;
  console.log(videoUrl);
  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <Title>{training.title}</Title>
          <Paragraph>{training.description}</Paragraph>
        </Card.Content>

        {/* Embebido del video en WebView */}
        {videoId && (
          <WebView
            source={{ uri: videoUrl }}
            style={styles.video}
            allowsInlineMediaPlayback
            mixedContentMode='always'
            mediaPlaybackRequiresUserAction
            androidLayerType={'hardware'}
          />
        )}

        <Card.Actions>
          {training.resources.map((link, index) => (
            <Button key={index} onPress={() => Linking.openURL(link)}>
              Recurso {index + 1}
            </Button>
          ))}
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  video: {
    height: 200,
    marginVertical: 10,
  },
});

export default TrainingDetailScreen;
