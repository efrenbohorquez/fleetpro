
import { GoogleGenAI } from "@google/genai";

// Vite usa import.meta.env para variables de entorno
const API_KEY = (import.meta as any).env?.VITE_API_KEY || '';

if (!API_KEY) {
  console.warn("Gemini API key is not set. Analytics features will be limited.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

export const getAnalyticsInsights = async (data: object): Promise<string> => {
  // Si no hay API key, retornar mensaje informativo
  if (!ai) {
    return "⚠️ Análisis con IA no disponible. Configure VITE_API_KEY para habilitar esta función.";
  }

  const prompt = `
    Eres un analista experto en gestión de flotas. Analiza los siguientes datos de una flota en formato JSON y proporciona un resumen ejecutivo con insights clave.
    
    El análisis debe incluir:
    1.  **Estado General de la Flota:** Resumen de vehículos disponibles, en uso y en mantenimiento.
    2.  **Eficiencia Operativa:** Identifica patrones en las solicitudes de transporte (ej. departamentos con más solicitudes, destinos comunes).
    3.  **Riesgos Potenciales:** Señala posibles problemas (ej. vehículos con mantenimiento próximo, conductores sobrecargados, etc.).
    4.  **Recomendaciones:** Ofrece 2-3 sugerencias concretas para mejorar la gestión de la flota basadas en los datos.

    Formatea la respuesta en un español claro y profesional. Utiliza viñetas para los puntos clave.

    Datos:
    ${JSON.stringify(data, null, 2)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching insights from Gemini API:", error);
    return "Error al generar el análisis. Por favor, inténtelo de nuevo más tarde.";
  }
};
