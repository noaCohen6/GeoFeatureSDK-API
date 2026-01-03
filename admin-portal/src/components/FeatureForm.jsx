import { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { createFeature, updateFeature } from '../services/api';

const FeatureForm = ({ feature, onClose, onSuccess }) => {
    const isEdit = !!feature;

    const [formData, setFormData] = useState({
        featureName: '',
        defaultStatus: false,
        geoRules: [],
    });

    const [newRule, setNewRule] = useState({
        countryCode: '',
        status: 'enabled',
        value: '',
    });

    useEffect(() => {
        if (feature) {
            setFormData({
                featureName: feature.featureName,
                defaultStatus: feature.defaultStatus,
                geoRules: feature.geoRules || [],
            });
        }
    }, [feature]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isEdit) {
                await updateFeature(feature.id, formData);
            } else {
                await createFeature(formData);
            }
            onSuccess();
            onClose();
        } catch (error) {
            alert('Error saving feature: ' + error.message);
        }
    };

    const addGeoRule = () => {
        if (!newRule.countryCode) {
            alert('Please enter a country code');
            return;
        }

        if (formData.geoRules.some(r => r.countryCode === newRule.countryCode.toUpperCase())) {
            alert('Rule for this country already exists');
            return;
        }

        setFormData({
            ...formData,
            geoRules: [
                ...formData.geoRules,
                {
                    countryCode: newRule.countryCode.toUpperCase(),
                    status: newRule.status,
                    value: newRule.value || null,
                },
            ],
        });

        setNewRule({ countryCode: '', status: 'enabled', value: '' });
    };

    const removeGeoRule = (countryCode) => {
        setFormData({
            ...formData,
            geoRules: formData.geoRules.filter(r => r.countryCode !== countryCode),
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                    <h2 className="text-2xl font-bold">
                        {isEdit ? '✏️ Edit Feature' : '➕ Create New Feature'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Feature Name *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.featureName}
                            onChange={(e) => setFormData({ ...formData, featureName: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g., dark_mode, payment_methods"
                            disabled={isEdit}
                        />
                        {isEdit && (
                            <p className="text-xs text-gray-500 mt-1">Feature name cannot be changed</p>
                        )}
                    </div>

                    <div>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.defaultStatus}
                                onChange={(e) => setFormData({ ...formData, defaultStatus: e.target.checked })}
                                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <div>
                <span className="text-sm font-medium text-gray-700">
                  Enabled by Default
                </span>
                                <p className="text-xs text-gray-500">
                                    This status will be used for countries without specific rules
                                </p>
                            </div>
                        </label>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-3">🌍 Geographic Rules</h3>

                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                <input
                                    type="text"
                                    value={newRule.countryCode}
                                    onChange={(e) => setNewRule({ ...newRule, countryCode: e.target.value })}
                                    className="px-3 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Country (e.g., IL)"
                                    maxLength={2}
                                />
                                <select
                                    value={newRule.status}
                                    onChange={(e) => setNewRule({ ...newRule, status: e.target.value })}
                                    className="px-3 py-2 border border-gray-300 rounded-lg"
                                >
                                    <option value="enabled">✓ Enabled</option>
                                    <option value="disabled">✗ Disabled</option>
                                </select>
                                <input
                                    type="text"
                                    value={newRule.value}
                                    onChange={(e) => setNewRule({ ...newRule, value: e.target.value })}
                                    className="px-3 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Value (optional)"
                                />
                                <button
                                    type="button"
                                    onClick={addGeoRule}
                                    className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                >
                                    <Plus size={16} />
                                    Add
                                </button>
                            </div>
                        </div>

                        {formData.geoRules.length === 0 ? (
                            <p className="text-gray-500 text-sm text-center py-4">
                                No geographic rules yet. Add rules for specific countries above.
                            </p>
                        ) : (
                            <div className="space-y-2">
                                {formData.geoRules.map((rule) => (
                                    <div
                                        key={rule.countryCode}
                                        className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3"
                                    >
                                        <div className="flex items-center gap-4">
                      <span className="font-mono font-semibold text-blue-600">
                        {rule.countryCode}
                      </span>
                                            <span
                                                className={`px-2 py-1 rounded text-xs font-semibold ${
                                                    rule.status === 'enabled'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}
                                            >
                        {rule.status === 'enabled' ? '✓ Enabled' : '✗ Disabled'}
                      </span>
                                            {rule.value && (
                                                <span className="text-sm text-gray-600">
                          Value: <span className="font-mono">{rule.value}</span>
                        </span>
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeGeoRule(rule.countryCode)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            {isEdit ? 'Update Feature' : 'Create Feature'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FeatureForm;