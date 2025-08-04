import { Upload, Play, Pause, Download, FileVideo, Languages, Brain, Heart, Clock, CheckCircle, AlertCircle, Loader, ScrollText, Layers2, BadgeCheck } from 'lucide-react';
import React, { useState, useRef, useCallback } from 'react';

function App() {

  const [currentFile, setCurrentFile] = useState(null);

  const fileInputRef = useRef(null);
  const [results, setResults] = useState(null);
  const [stepTreatment, setStepTreatment] = useState('upload');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [progress, setProgress] = useState(0);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      setCurrentFile(file);
      setResults(null);
      setStepTreatment('preview');
    }
  }, []);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setCurrentFile(file);
      setResults(null);
      setStepTreatment('preview');
    }
  };



  // Animate progress bar
  const animateProgress = async (from, to, duration = 1000) => {
    const steps = 20;
    const stepTime = duration / steps;
    for (let i = 1; i <= steps; i++) {
      setProgress(from + ((to - from) * i) / steps);
      // eslint-disable-next-line no-await-in-loop
      await new Promise((res) => setTimeout(res, stepTime));
    }
  };

  const startProcessing = async () => {
    if (!currentFile) return;
    setStepTreatment('processing');
    setIsProcessing(true);

    setProcessingStep('Téléchargement du fichier');
    await animateProgress(0, 10, 800);
    // Simuler le téléchargement du fichier
    await new Promise((res) => setTimeout(res, 800));

    // Étape 1 : Extraction audio
    setProcessingStep('Extraction audio');
    await animateProgress(10, 30, 1200);
    // Simuler l'extraction audio
    await new Promise((res) => setTimeout(res, 1200));

    // Étape 2 : Transcription
    setProcessingStep('Transcription avec Whisper');
    await animateProgress(30, 50, 1500);
    // Simuler la transcription
    await new Promise((res) => setTimeout(res, 1500));

    // Étape 3 : Traduction
    setProcessingStep("Traduction de l'audio");
    await animateProgress(50, 70, 1500);
    // Simuler la traduction
    await new Promise((res) => setTimeout(res, 1500));

    // Étape 4 : Doublage de la vidéo
    setProcessingStep('Doublage de la vidéo');
    await animateProgress(70, 90, 1500);
    // Simuler le doublage de la vidéo
    await new Promise((res) => setTimeout(res, 1500));

    // Étape 5 : Finalisation
    setProcessingStep('Finalisation');
    await animateProgress(90, 100, 800);
    // Simuler la finalisation
    await new Promise((res) => setTimeout(res, 800));


    setIsProcessing(false);
    // Tu peux ici setResults ou passer à une étape suivante
  };


  return (
    <>

      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">TRANSVIDEO</h1>
                <p className="text-sm text-gray-600">Transcription et traduction automatique</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Chargez votre vidéo
          </h2>
          <p className="text-gray-600">
            Supporté: MP4, AVI, MOV, WebM
          </p>
        </div>

        <div
          className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-400 transition-colors duration-200 cursor-pointer"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Glissez-déposez votre vidéo ici
          </h3>
          <p className="text-gray-500 mb-4">ou cliquez pour parcourir</p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium">
            Sélectionner un fichier
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileSelect}
        />

        {/* After import file */}
        {stepTreatment === 'preview' && currentFile && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-3">
                <FileVideo className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-900">{currentFile.name}</p>
                  <p className="text-sm text-blue-600">
                    Format: {currentFile.type} • Taille: {(currentFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6 mt-6">
              <button
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 px-6 rounded-xl hover:from-green-600 hover:to-blue-700 transition-all duration-200 font-medium text-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={startProcessing}
                disabled={isProcessing}
              >
                <Brain className="w-5 h-5" />
                <span>Démarrer l'analyse NLP</span>
              </button>
            </div>
          </div>
        )}


        {/* Processing step */}
        {stepTreatment === 'processing' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              {progress < 100 && (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Traitement en cours...
                  </h2>
                  <p className="text-gray-600">Analyse de votre fichier vidéo</p>
                </>
              )}
            </div>

            <div className="space-y-6">
              {/* progress bar */}
              <div className="relative">
                <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium text-white">
                    {Math.round(progress)}%
                  </span>
                </div>
              </div>

              {/* Current step */}
              {progress < 100 && (
                <div className="text-center">
                  <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
                    <Loader className="w-4 h-4 text-blue-600 animate-spin" />
                    <span className="text-blue-800 font-medium">{processingStep}</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'Téléchargement', icon: Download, completed: progress > 0 },
                  { name: 'Extraction audio', icon: FileVideo, completed: progress > 16 },
                  { name: 'Transcription', icon: ScrollText, completed: progress > 40 },
                  { name: 'Traduction', icon: Languages, completed: progress > 65 },
                  { name: 'Doublage video', icon: Layers2, completed: progress > 75 },
                  { name: 'Finalisation', icon: CheckCircle, completed: progress >= 100 }
                ].map((step, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 ${step.completed
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200 bg-gray-50'
                      }`}
                  >
                    <div className="flex items-center space-x-3">
                      <step.icon
                        className={`w-5 h-5 ${step.completed ? 'text-green-600' : 'text-gray-400'
                          }`}
                      />
                      <span
                        className={`font-medium ${step.completed ? 'text-green-800' : 'text-gray-600'
                          }`}
                      >
                        {step.name}
                      </span>
                      {step.completed && (
                        <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}





      </div>
    </>
  );
}

export default App;