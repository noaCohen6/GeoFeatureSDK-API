package com.geofeature.geofeaturesdk.boundaries;

import com.geofeature.geofeaturesdk.model.GeoRule;

import java.util.ArrayList;
import java.util.List;

public class FeaturePostBoundary {
    private String featureName;
    private boolean defaultStatus;
    private List<GeoRule> geoRules = new ArrayList<>();

    public FeaturePostBoundary() {
    }

    // Getters and Setters
    public String getFeatureName() {
        return featureName;
    }

    public void setFeatureName(String featureName) {
        this.featureName = featureName;
    }

    public boolean isDefaultStatus() {
        return defaultStatus;
    }

    public void setDefaultStatus(boolean defaultStatus) {
        this.defaultStatus = defaultStatus;
    }

    public List<GeoRule> getGeoRules() {
        return geoRules;
    }

    public void setGeoRules(List<GeoRule> geoRules) {
        this.geoRules = geoRules;
    }

    @Override
    public String toString() {
        return "FeaturePostBoundary{" +
                "featureName='" + featureName + '\'' +
                ", defaultStatus=" + defaultStatus +
                ", geoRules=" + geoRules +
                '}';
    }
}