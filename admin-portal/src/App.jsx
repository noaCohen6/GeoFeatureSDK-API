import { useState } from 'react';
import { LayoutDashboard, List } from 'lucide-react';
import Dashboard from './components/Dashboard';
import FeatureList from './components/FeatureList';
import FeatureForm from './components/FeatureForm';

function App() {
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [showForm, setShowForm] = useState(false);
    const [editingFeature, setEditingFeature] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleEdit = (feature) => {
        setEditingFeature(feature);
        setShowForm(true);
    };

    const handleAdd = () => {
        setEditingFeature(null);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingFeature(null);
    };

    const handleSuccess = () => {
        setRefreshKey(prev => prev + 1);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white text-xl font-bold">🌍</span>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">GeoFeature Admin</h1>
                                <p className="text-sm text-gray-500">Manage geographic feature toggles</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <nav className="bg-white border-b">
                <div className="container mx-auto px-6">
                    <div className="flex gap-1">
                        <button
                            onClick={() => setCurrentPage('dashboard')}
                            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition ${
                                currentPage === 'dashboard'
                                    ? 'border-blue-600 text-blue-600 font-semibold'
                                    : 'border-transparent text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            <LayoutDashboard size={18} />
                            Dashboard
                        </button>
                        <button
                            onClick={() => setCurrentPage('features')}
                            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition ${
                                currentPage === 'features'
                                    ? 'border-blue-600 text-blue-600 font-semibold'
                                    : 'border-transparent text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            <List size={18} />
                            Features
                        </button>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto px-6 py-8">
                {currentPage === 'dashboard' && <Dashboard key={refreshKey} />}
                {currentPage === 'features' && (
                    <FeatureList
                        key={refreshKey}
                        onEdit={handleEdit}
                        onAdd={handleAdd}
                    />
                )}
            </main>

            {showForm && (
                <FeatureForm
                    feature={editingFeature}
                    onClose={handleCloseForm}
                    onSuccess={handleSuccess}
                />
            )}

            <footer className="bg-white border-t mt-12">
                <div className="container mx-auto px-6 py-4 text-center text-gray-500 text-sm">
                    <p>GeoFeature SDK Admin Portal • Built with React & Vite</p>
                </div>
            </footer>
        </div>
    );
}

export default App;