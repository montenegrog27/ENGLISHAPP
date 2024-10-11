import { useState } from "react";
import questionsData from "./questions.json"; // Importamos el JSON con las preguntas y oraciones

export default function App() {
  const [currentItem, setCurrentItem] = useState(""); // La pregunta/oración actual en español
  const [translation, setTranslation] = useState(""); // La traducción al inglés
  const [showTranslation, setShowTranslation] = useState(false); // Controla si se muestra la traducción
  const [category, setCategory] = useState(""); // Almacena la categoría actual (pregunta, afirmación, negación)

  // Función para obtener un elemento aleatorio de un array
  const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // Función para elegir una categoría y una oración/pregunta aleatoria
  const handleRandomItem = () => {
    const categories = ["questions", "affirmatives", "negatives"];
    const randomCategory = getRandomItem(categories); // Seleccionamos una categoría al azar
    const items = questionsData.basic[randomCategory]; // Obtenemos las oraciones de la categoría elegida
    const randomItem = getRandomItem(items); // Seleccionamos un ítem al azar

    setCategory(randomCategory); // Guardamos la categoría seleccionada
    setCurrentItem(randomItem.es); // Mostramos la oración en español
    setTranslation(""); // Limpiamos la traducción
    setShowTranslation(false); // Ocultamos la traducción
  };

  // Función para mostrar la traducción en inglés
  const handleShowTranslation = () => {
    setShowTranslation(true); // Mostramos la traducción
    setTranslation(
      questionsData.basic[category].find((item) => item.es === currentItem).en
    ); // Buscamos y mostramos la traducción
  };

  // Función para reiniciar el estado y buscar una nueva oración
  const handleResetAndFetch = () => {
    handleRandomItem(); // Buscar una nueva oración
    setShowTranslation(false); // Ocultar la traducción
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-white">
      <h1 className="text-5xl font-extrabold mb-6 text-center tracking-wide">
        Aprende inglés
      </h1>
      <h2 className="text-lg text-gray-400 mb-4 text-center">
        Haz clic para aprender nuevas frases
      </h2>

      {/* Mostrar la pregunta o frase */}
      <div className="bg-gray-700 rounded-xl shadow-xl p-8 mb-6 w-full max-w-lg text-center transition-transform transform hover:scale-105 duration-300 ease-in-out">
        {currentItem ? (
          <p className="text-3xl font-semibold text-blue-400">{currentItem}</p>
        ) : (
          <p className="text-lg text-gray-300">
            ¡Haz clic en "Buscar" para empezar!
          </p>
        )}
      </div>

      {/* Botón de acción */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <button
          className={`bg-${currentItem ? "gray-500" : "blue-600"} hover:bg-${
            currentItem ? "gray-400" : "blue-500"
          } text-white font-semibold px-8 py-4 rounded-lg shadow-md transition duration-200 transform hover:scale-105`}
          onClick={() => {
            if (!currentItem) {
              handleRandomItem(); // Buscar una nueva oración
            } else if (!showTranslation) {
              handleShowTranslation(); // Mostrar traducción
            } else {
              handleResetAndFetch(); // Reiniciar
            }
          }}
        >
          {currentItem ? (showTranslation ? "Reiniciar" : "Ver") : "Buscar"}
        </button>
      </div>

      {/* Mostrar la traducción */}
      {showTranslation && (
        <div className="mt-6 w-full max-w-lg text-center">
          <p className="text-xl font-medium text-gray-100">{translation}</p>
        </div>
      )}

      {/* Footer con créditos */}
      <footer className="mt-6 text-gray-400 text-sm text-center">
        <p>© 2024 Aprende inglés. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
