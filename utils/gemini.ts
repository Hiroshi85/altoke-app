import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyAG6_8J-fSjyBGXsf6GZXI0mlvRescXg48");

// The Gemini 1.5 models are versatile and work with most use cases
export const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro"});


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