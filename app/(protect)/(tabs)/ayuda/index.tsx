import React from 'react';
import { View, FlatList } from 'react-native';
import { Card, Title, Paragraph, IconButton } from 'react-native-paper';
import { NavigationProp, useNavigation } from '@react-navigation/native';

// Define la interfaz de cada capacitación
interface Training {
    id: string;
    title: string;
    description: string;
    videoUrl?: string;
    resources?: string[];
    icon: string;
}

// Datos de ejemplo
export const trainings: Training[] = [
  {
    id: '1',
    title: 'Supervivencia para Mypes',
    description: 'Capacitación en técnicas para supervivencia de empresas emergentes.',
    videoUrl: "https://www.youtube.com/watch?v=HvwUL4WY5r8",
    resources: ["https://www.gob.pe/institucion/produce/tema/hacer-un-negocio", "https://www.gob.pe/72601-conocer-los-servicios-y-herramientas-digitales-para-el-crecimiento-empresarial"],
    icon: 'compass-outline'
  },
  {
    id: '2',
    title: 'Crecimiento Sostenible',
    description: 'Estrategias para un crecimiento empresarial sólido y constante.',
    videoUrl: "https://www.youtube.com/watch?v=HvwUL4WY5r8",
    resources: ["https://www.gob.pe/institucion/produce/tema/hacer-un-negocio", "https://www.gob.pe/72601-conocer-los-servicios-y-herramientas-digitales-para-el-crecimiento-empresarial"],
    icon: 'chart-line'
  },
  {
    id: '3',
    title: 'Formalización Empresarial',
    description: 'Guía paso a paso para la formalización de Mypes.',
    videoUrl: "https://www.youtube.com/watch?v=HvwUL4WY5r8",
    resources: ["https://www.gob.pe/institucion/produce/tema/hacer-un-negocio", "https://www.gob.pe/72601-conocer-los-servicios-y-herramientas-digitales-para-el-crecimiento-empresarial"],
    icon: 'file-document-outline'
  },
  {
    id: '4',
    title: 'Marketing Digital para Mypes',
    description: 'Aprende estrategias de marketing digital que ayudan a las Mypes a destacarse en el mercado.',
    videoUrl: "https://www.youtube.com/watch?v=HvwUL4WY5r8",
    resources: ["https://www.gob.pe/institucion/produce/tema/hacer-un-negocio", "https://www.gob.pe/72601-conocer-los-servicios-y-herramientas-digitales-para-el-crecimiento-empresarial"],
    icon: 'bullhorn-outline'
  },
  {
    id: '5',
    title: 'Gestión Financiera Básica',
    description: 'Conceptos y prácticas de gestión financiera para mantener una Mype saludable.',
    videoUrl: "https://www.youtube.com/watch?v=HvwUL4WY5r8",
    resources: ["https://www.gob.pe/institucion/produce/tema/hacer-un-negocio", "https://www.gob.pe/72601-conocer-los-servicios-y-herramientas-digitales-para-el-crecimiento-empresarial"],
    icon: 'cash-outline'
  },
  {
    id: '6',
    title: 'Atención al Cliente Eficaz',
    description: 'Técnicas de servicio al cliente para mejorar la satisfacción y fidelidad de los clientes.',
    videoUrl: "https://www.youtube.com/watch?v=HvwUL4WY5r8",
    resources: ["https://www.gob.pe/institucion/produce/tema/hacer-un-negocio", "https://www.gob.pe/72601-conocer-los-servicios-y-herramientas-digitales-para-el-crecimiento-empresarial"],
    icon: 'people-outline'
  },
  {
    id: '7',
    title: 'Innovación en Productos y Servicios',
    description: 'Ideas y estrategias para innovar en productos y servicios y ganar ventaja competitiva.',
    videoUrl: "https://www.youtube.com/watch?v=HvwUL4WY5r8",
    resources: ["https://www.gob.pe/institucion/produce/tema/hacer-un-negocio", "https://www.gob.pe/72601-conocer-los-servicios-y-herramientas-digitales-para-el-crecimiento-empresarial"],
    icon: 'lightbulb-outline'
  },
  {
    id: '8',
    title: 'Gestión de Equipos de Trabajo',
    description: 'Capacitación en liderazgo y gestión de equipos para mejorar la productividad.',
    videoUrl: "https://www.youtube.com/watch?v=HvwUL4WY5r8",
    resources: ["https://www.gob.pe/institucion/produce/tema/hacer-un-negocio", "https://www.gob.pe/72601-conocer-los-servicios-y-herramientas-digitales-para-el-crecimiento-empresarial"],
    icon: 'people-group-outline'
  },
  {
    id: '9',
    title: 'Comercio Electrónico para Mypes',
    description: 'Guía para implementar el comercio electrónico en las operaciones de una Mype.',
    videoUrl: "https://www.youtube.com/watch?v=HvwUL4WY5r8",
    resources: ["https://www.gob.pe/institucion/produce/tema/hacer-un-negocio", "https://www.gob.pe/72601-conocer-los-servicios-y-herramientas-digitales-para-el-crecimiento-empresarial"],
    icon: 'cart-outline'
  },
  {
    id: '10',
    title: 'Exportación para Mypes',
    description: 'Capacitación en los fundamentos y trámites necesarios para exportar productos como Mype.',
    videoUrl: "https://www.youtube.com/watch?v=HvwUL4WY5r8",
    resources: ["https://www.gob.pe/institucion/produce/tema/hacer-un-negocio", "https://www.gob.pe/72601-conocer-los-servicios-y-herramientas-digitales-para-el-crecimiento-empresarial"],
    icon: 'airplane-outline'
  }  
];

const TrainingListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  // Función para navegar a la pantalla de detalle
  const goToDetailScreen = (training: Training) => {
    navigation.navigate('TrainingDetail', { training });
  };

  return (
    
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={trainings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            style={{ marginBottom: 10 }}
            onPress={() => goToDetailScreen(item)}
          >
            <Card.Title
              title={item.title}
              subtitle={item.description}
              left={(props) => <IconButton {...props} icon={item.icon} />}
            />
          </Card>
        )}
      />
    </View>
  );
};

export default TrainingListScreen;
