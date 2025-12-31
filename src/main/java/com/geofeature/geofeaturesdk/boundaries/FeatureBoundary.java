package com.geofeature.geofeaturesdk.boundaries;


import com.geofeature.geofeaturesdk.model.GeoRule;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class FeatureBoundary {
    private String id;
    private String featureName;
    private boolean defaultStatus;
    private List<GeoRule> geoRules = new ArrayList<>();
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public FeatureBoundary() {
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public String toString() {
        return "FeatureBoundary{" +
                "id='" + id + '\'' +
                ", featureName='" + featureName + '\'' +
                ", defaultStatus=" + defaultStatus +
                ", geoRules=" + geoRules +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
