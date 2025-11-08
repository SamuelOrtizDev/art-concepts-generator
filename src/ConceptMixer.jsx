import React, { useState } from 'react';
import { Shuffle, Plus, X, Lightbulb } from 'lucide-react';

const ConceptMixer = () => {
    const [selectedConcepts, setSelectedConcepts] = useState([]);
    const [spinning, setSpinning] = useState(false);
    const [finalConcept, setFinalConcept] = useState('');

    const categories = {
        animales: ['Camaleón', 'Búho', 'Medusa', 'Pulpo', 'Zorro', 'Colibrí', 'Dragón', 'Lobo', 'Mariposa', 'Gato'],
        objetos: ['Guitarra', 'Reloj', 'Llave', 'Brújula', 'Libro', 'Espada', 'Linterna', 'Telescopio', 'Máscara', 'Corona'],
        naturaleza: ['Luna', 'Volcán', 'Bosque', 'Océano', 'Cristal', 'Flor de loto', 'Aurora', 'Montaña', 'Cascada', 'Desierto'],
        conceptos: ['Tiempo', 'Sueños', 'Música', 'Magia', 'Misterio', 'Libertad', 'Nostalgia', 'Caos', 'Armonía', 'Transformación'],
        estilos: ['Steampunk', 'Cyberpunk', 'Fantasía', 'Surrealista', 'Minimalista', 'Barroco', 'Espacial', 'Tribal', 'Victoriano', 'Futurista']
    };

    const allWords = Object.values(categories).flat();

    const spinWheel = () => {
        if (spinning) return;

        setSpinning(true);
        let counter = 0;
        const maxSpins = 20;

        const interval = setInterval(() => {
            const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
            setFinalConcept(randomWord);
            counter++;

            if (counter >= maxSpins) {
                clearInterval(interval);
                setSpinning(false);
                if (!selectedConcepts.includes(randomWord)) {
                    setSelectedConcepts([...selectedConcepts, randomWord]);
                }
            }
        }, 100);
    };

    const addRandomFromCategory = (category) => {
        const words = categories[category];
        const randomWord = words[Math.floor(Math.random() * words.length)];
        if (!selectedConcepts.includes(randomWord)) {
            setSelectedConcepts([...selectedConcepts, randomWord]);
        }
    };

    const removeConcept = (concept) => {
        setSelectedConcepts(selectedConcepts.filter(c => c !== concept));
    };

    const reset = () => {
        setSelectedConcepts([]);
        setFinalConcept('');
    };

    const generatePrompt = () => {
        if (selectedConcepts.length === 0) return '';
        return `Ilustración que combina: ${selectedConcepts.join(', ')}`;
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">🎨 Generador de Conceptos</h1>
                    <p className="text-purple-200">Combina conceptos aleatorios para tu próxima ilustración</p>
                </div>

                {/* Ruleta Principal */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-6 border border-white/20">
                    <div className="text-center mb-6">
                        <div className="h-32 flex items-center justify-center">
                            <span className={`text-5xl font-bold text-yellow-300 transition-all duration-300 ${spinning ? 'scale-110' : 'scale-100'}`}>
                                {finalConcept || '🎲'}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={spinWheel}
                        disabled={spinning}
                        className="w-full bg-linear-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                        <Shuffle size={24} />
                        {spinning ? 'Girando...' : 'Girar Ruleta'}
                    </button>
                </div>

                {/* Categorías */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Plus size={20} />
                        O elige por categoría:
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {Object.keys(categories).map(category => (
                            <button
                                key={category}
                                onClick={() => addRandomFromCategory(category)}
                                className="bg-blue-500/20 hover:bg-blue-500/40 text-white py-3 px-4 rounded-lg transition-all capitalize border border-blue-300/30"
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Conceptos Seleccionados */}
                {selectedConcepts.length > 0 && (
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <Lightbulb size={20} className="text-yellow-300" />
                                Tus Conceptos ({selectedConcepts.length})
                            </h3>
                            <button
                                onClick={reset}
                                className="text-red-300 hover:text-red-200 text-sm underline"
                            >
                                Limpiar todo
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-3 mb-6">
                            {selectedConcepts.map((concept, index) => (
                                <div
                                    key={index}
                                    className="bg-linear-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full flex items-center gap-2 font-medium shadow-lg"
                                >
                                    {concept}
                                    <button
                                        onClick={() => removeConcept(concept)}
                                        className="hover:bg-white/20 rounded-full p-1 transition-all"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {selectedConcepts.length > 1 && (
                            <div className="bg-yellow-500/20 border border-yellow-300/30 rounded-xl p-4">
                                <p className="text-yellow-100 font-medium mb-2">💡 Tu Prompt de Ilustración:</p>
                                <p className="text-white text-lg">{generatePrompt()}</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Tips */}
                <div className="mt-6 bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
                    <p className="text-purple-200 text-sm">
                        <strong className="text-white">Tip:</strong> Combina 2-4 conceptos diferentes para crear ilustraciones únicas e interesantes. ¡No tengas miedo de mezclar categorías!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ConceptMixer;