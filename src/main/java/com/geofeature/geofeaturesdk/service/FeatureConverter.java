package com.geofeature.geofeaturesdk.service;

import com.geofeature.geofeaturesdk.boundaries.FeatureBoundary;
import com.geofeature.geofeaturesdk.boundaries.FeaturePostBoundary;
import com.geofeature.geofeaturesdk.model.Feature;
import org.springframework.stereotype.Component;

@Component
public class FeatureConverter {

    public FeatureBoundary convertPostBoundaryToBoundary(FeaturePostBoundary postBoundary) {
        FeatureBoundary boundary = new FeatureBoundary();
        boundary.setFeatureName(postBoundary.getFeatureName());
        boundary.setDefaultStatus(postBoundary.isDefaultStatus());
        boundary.setGeoRules(postBoundary.getGeoRules());
        return boundary;
    }

    public FeatureBoundary convertEntityToBoundary(Feature entity) {
        FeatureBoundary boundary = new FeatureBoundary();
        boundary.setId(entity.getId());
        boundary.setFeatureName(entity.getFeatureName());
        boundary.setDefaultStatus(entity.isDefaultStatus());
        boundary.setGeoRules(entity.getGeoRules());
        boundary.setCreatedAt(entity.getCreatedAt());
        boundary.setUpdatedAt(entity.getUpdatedAt());
        return boundary;
    }

    public Feature convertBoundaryToEntity(FeatureBoundary boundary) {
        Feature entity = new Feature();
        entity.setId(boundary.getId());
        entity.setFeatureName(boundary.getFeatureName());
        entity.setDefaultStatus(boundary.isDefaultStatus());
        entity.setGeoRules(boundary.getGeoRules());
        entity.setCreatedAt(boundary.getCreatedAt());
        entity.setUpdatedAt(boundary.getUpdatedAt());
        return entity;
    }
}