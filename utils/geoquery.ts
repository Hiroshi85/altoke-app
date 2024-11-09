import firestore, { GeoPoint } from '@react-native-firebase/firestore';

export function getQueryInsideRadius(collection: string, geoParam: string, centerLng: number, centerLat: number, radiusKm = 0.5){
    const degreesPerKilometer = 0.00898311; //Por fórmula de Haversine
    const deltaLongitude = radiusKm * degreesPerKilometer;
    const deltaLatitude = radiusKm * degreesPerKilometer;

    const minLongitude = centerLng - deltaLongitude;
    const maxLongitude = centerLng + deltaLongitude;
    const minLatitude = centerLat - deltaLatitude;
    const maxLatitude = centerLat + deltaLatitude;

    return firestore().collection(collection) 
        .where(geoParam, ">", new GeoPoint(minLatitude, minLongitude))
        .where(geoParam, "<", new GeoPoint(maxLatitude, maxLongitude));
        // .where("coordenadas.lat", "<", maxLatitude);
}