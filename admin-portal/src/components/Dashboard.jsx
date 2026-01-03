import { useEffect, useState } from 'react';
import { BarChart3, Globe, ToggleLeft, ToggleRight } from 'lucide-react';
import { getAllFeatures } from '../services/api';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalFeatures: 0,
        enabledByDefault: 0,
        disabledByDefault: 0,
        totalGeoRules: 0,
        countries: new Set(),
    });

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const features = await getAllFeatures();

            const countries = new Set();
            let totalRules = 0;

            features.forEach(feature => {
                totalRules += feature.geoRules?.length || 0;
                feature.geoRules?.forEach(rule => countries.add(rule.countryCode));
            });

            setStats({
                totalFeatures: features.length,
                enabledByDefault: features.filter(f => f.defaultStatus).length,
                disabledByDefault: features.filter(f => !f.defaultStatus).length,
                totalGeoRules: totalRules,
                countries: countries,
            });
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    };

    const StatCard = ({ icon: Icon, title, value, color }) => (
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderColor: color }}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-500 text-sm font-medium">{title}</p>
                    <p className="text-3xl font-bold mt-2">{value}</p>
                </div>
                <Icon size={40} style={{ color }} className="opacity-80" />
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">📊 Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={BarChart3}
                    title="Total Features"
                    value={stats.totalFeatures}
                    color="#3b82f6"
                />
                <StatCard
                    icon={ToggleRight}
                    title="Enabled by Default"
                    value={stats.enabledByDefault}
                    color="#10b981"
                />
                <StatCard
                    icon={ToggleLeft}
                    title="Disabled by Default"
                    value={stats.disabledByDefault}
                    color="#ef4444"
                />
                <StatCard
                    icon={Globe}
                    title="Countries Configured"
                    value={stats.countries.size}
                    color="#8b5cf6"
                />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">🌍 Configured Countries</h2>
                {stats.countries.size === 0 ? (
                    <p className="text-gray-500">No countries configured yet</p>
                ) : (
                    <div className="flex flex-wrap gap-2">
                        {Array.from(stats.countries).sort().map(country => (
                            <span
                                key={country}
                                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                            >
                {country}
              </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">ℹ️ About GeoFeature SDK</h2>
                <p className="text-gray-600 leading-relaxed">
                    GeoFeature SDK allows you to control application features based on user location.
                    Configure default behaviors and create country-specific rules to enable/disable
                    features or set custom values per region.
                </p>
            </div>
        </div>
    );
};

export default Dashboard;