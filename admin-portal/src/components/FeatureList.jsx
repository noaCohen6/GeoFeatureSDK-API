import { useEffect, useState } from 'react';
import { Edit, Trash2, Plus, AlertCircle } from 'lucide-react';
import { getAllFeatures, deleteFeature } from '../services/api';

const FeatureList = ({ onEdit, onAdd }) => {
    const [features, setFeatures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadFeatures();
    }, []);

    const loadFeatures = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getAllFeatures();
            setFeatures(data);
        } catch (err) {
            setError(err.message);
            console.error('Error loading features:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, featureName) => {
        if (!window.confirm(`Are you sure you want to delete "${featureName}"?`)) {
            return;
        }

        try {
            await deleteFeature(id);
            setFeatures(features.filter(f => f.id !== id));
        } catch (err) {
            alert('Error deleting feature: ' + err.message);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-xl text-gray-500">Loading features...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-red-800">
                    <AlertCircle size={20} />
                    <span>Error: {error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">🎯 Features</h1>
                <button
                    onClick={onAdd}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    <Plus size={20} />
                    Add Feature
                </button>
            </div>

            {features.length === 0 ? (
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                    <p className="text-gray-500 text-lg mb-4">No features yet</p>
                    <button
                        onClick={onAdd}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Create Your First Feature
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Feature Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Default Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Geo Rules
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Updated At
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {features.map((feature) => (
                            <tr key={feature.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="font-medium text-gray-900">{feature.featureName}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            feature.defaultStatus
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                        }`}
                    >
                      {feature.defaultStatus ? '✓ Enabled' : '✗ Disabled'}
                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {feature.geoRules?.length || 0} countries
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {feature.updatedAt
                                        ? new Date(feature.updatedAt).toLocaleDateString()
                                        : 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => onEdit(feature)}
                                        className="text-blue-600 hover:text-blue-900 mr-4"
                                        title="Edit"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(feature.id, feature.featureName)}
                                        className="text-red-600 hover:text-red-900"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default FeatureList;