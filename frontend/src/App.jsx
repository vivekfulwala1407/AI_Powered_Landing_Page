import { useState } from 'react';

function App() {
  const [description, setDescription] = useState('');
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!description.trim()) {
      setError('Please enter a description');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || 'Failed to generate content');
      }

      const data = await res.json();
      setContent(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field, value) => {
    setContent(prev => ({ ...prev, [field]: value }));
  };

  const updateFeature = (index, value) => {
    setContent(prev => ({
      ...prev,
      features: prev.features.map((f, i) => i === index ? value : f)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12 text-gray-800">
          AI Landing Page Builder
        </h1>

        {/* Input Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-10 mb-16">
          <label className="block text-xl font-semibold text-gray-700 mb-6">
            Describe your product or business
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="AI-based fitness app for busy professionals"
            className="w-full h-48 px-6 py-5 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 resize-none text-lg text-gray-800"
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-10 px-12 py-5 bg-blue-600 text-white text-xl font-bold rounded-2xl hover:bg-blue-700 disabled:bg-gray-400 transition shadow-lg"
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
          {error && <p className="mt-6 text-red-600 text-lg font-medium">{error}</p>}
        </div>

        {/* Generated Landing Page Preview */}
        {content && (
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-40 px-10 text-center">
              <EditableText
                tag="h1"
                text={content.heroTitle}
                onUpdate={(val) => updateField('heroTitle', val)}
                className="text-5xl md:text-7xl font-bold mb-10 leading-tight"
              />
              <EditableText
                tag="p"
                text={content.heroSubtitle}
                onUpdate={(val) => updateField('heroSubtitle', val)}
                className="text-2xl md:text-3xl max-w-4xl mx-auto opacity-90 leading-relaxed"
              />
            </div>

            {/* Features Section */}
            <div className="py-32 px-10 bg-gray-50">
              <h2 className="text-5xl font-bold text-center mb-20 text-gray-800">
                Key Features
              </h2>
              <ul className="max-w-4xl mx-auto space-y-12">
                {content.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-8">
                    <span className="text-4xl text-blue-600 mt-1">●</span>
                    <EditableText
                      tag="span"
                      text={feature}
                      onUpdate={(val) => updateFeature(index, val)}
                      className="text-2xl text-gray-700 leading-relaxed flex-1"
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Section */}
            <div className="py-28 px-10 text-center bg-white">
              <EditableText
                tag="button"
                text={content.ctaText}
                onUpdate={(val) => updateField('ctaText', val)}
                className="px-20 py-7 bg-blue-600 text-white text-3xl font-bold rounded-2xl hover:bg-blue-700 transition shadow-2xl cursor-text"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable editable text component
function EditableText({ tag: Tag = 'div', text, onUpdate, className = '' }) {
  return (
    <Tag
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => {
        const newText = e.currentTarget.innerText.trim();
        if (newText !== text) onUpdate(newText || text);
      }}
      dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br>') }}
      className={`outline-none ${className}`}
    />
  );
}

export default App;