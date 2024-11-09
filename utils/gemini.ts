import { externalApis } from "@/settings/extenal";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(externalApis.geminiApiKey);

// The Gemini 1.5 models are versatile and work with most use cases
export const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });


const obtenerMensajesModelo = async () => {
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hola. Mi situación de hoy fue: <Colocar parametrs>" }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

  const msg = "How many paws are in my house?";

  const result = await chat.sendMessage(msg);
  const response = await result.response;
  return response.text();
}


export const obtenerContextoDelModelo = async (resumenMonitoreo: string, interesCercanos: string[], competencia: string[], inflacion: string, tipoCambio: string): Promise<string> => {
  const prompt = `Eres un analista en supervivencia de mypes en el contexto peruano,
    que describe la viabilidad de un emprendimiento en base al sector, ubicación y la satisfacción de
    de los emprendedores de la zona. En este caso, para sector abarrotes, cuál incluye bodegas, minimarkets, etc. 
    De ti depende si alguien pierde sus ahorros de su vida. 
    Realiza un FODA sincero en menos de 200 palabras, teniendo en cuenta los siguientes datos: 
    ${resumenMonitoreo}. Además, hay ${interesCercanos.length} lugares beneficiosos para el las tiendas de abarrotes, pero también ${competencia.length} emprendimientos 
    similares en un radio de 150 metros. Finalmente, indica si existe la posibilidad de que la variación de la inflación en alimentos 
    afectó a las mypes del sector en los 6 meses anteriores del mes ${new Date().getMonth() + 1 - 2} de la siguiente forma ${inflacion}. Igualmente,
    comenta sobre el efecto de la variación del tipo de cambio nominal de venta bancario, siendo ${tipoCambio} `;

    console.log(prompt);
  const result = await model.generateContent(prompt);

  return result.response.text();
}

export function quitarEstiloMarkdown(texto: string): string {
  // Eliminar enlaces en formato [texto](enlace)
  texto = texto.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');

  // Eliminar negritas con ** o __
  texto = texto.replace(/\*\*(.*?)\*\*/g, '$1');
  texto = texto.replace(/__(.*?)__/g, '$1');

  // Eliminar cursivas con * o _
  texto = texto.replace(/\*(.*?)\*/g, '$1');
  texto = texto.replace(/_(.*?)_/g, '$1');

  // Eliminar títulos (encabezados) con #
  texto = texto.replace(/^#{1,6}\s*(.*)/gm, '$1');

  // Eliminar listas (bullets) con - o *
  texto = texto.replace(/^[\*\-]\s+(.*)/gm, '$1');

  // Eliminar listas numeradas
  texto = texto.replace(/^\d+\.\s+(.*)/gm, '$1');

  // Eliminar bloques de código en línea con `
  texto = texto.replace(/`([^`]+)`/g, '$1');

  // Eliminar bloques de código con ```
  texto = texto.replace(/```[\s\S]*?```/g, '');

  // Eliminar imágenes ![texto](url)
  texto = texto.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '$1');

  return texto.trim();
}