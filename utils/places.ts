import { externalApis } from "@/settings/extenal";
import { GeoPoint } from "@react-native-firebase/firestore";

type Lugar = {
    displayName: { text: string };
    formattedAddress: string;
    nationalPhoneNumber: string;
    regularOpeningHours: {
        weekdayDescriptions: string[];
    };
}


//['corporate_office', 'hospital', 'school', 'university', 'casino', 'government_office']
//['grocery_store', 'market']
export const getLugaresCerca = async (position: GeoPoint, includedTypes: string[]): Promise<Lugar[]> => {
    const { latitude, longitude } = position;
    console.log(latitude, longitude);

    const posicion = {
        lat: latitude,
        lng: longitude,
    };

    const body = {
        includedTypes: includedTypes,
        maxResultCount: 10,
        rankPreference: "DISTANCE",
        languageCode: 'es',
        locationRestriction: {
          circle: {
            center: {
              latitude: posicion.lat,
              longitude: posicion.lng,
            },
            radius: 150.0,
          },
        },
      };

      const headers = {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': externalApis.mapsApiKey,
        'X-Goog-FieldMask':
          'places.displayName',
      };

    try {
        const response = await fetch("https://places.googleapis.com/v1/places:searchNearby", {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        });

        if (response.status === 200) {
            const data = await response.json();
            if (data.places.length === 0) return [];

            return data.places as Lugar[];
        }
    } catch (error) {
        console.error('Error al obtener lugares:', error);
    }

    return [];
};