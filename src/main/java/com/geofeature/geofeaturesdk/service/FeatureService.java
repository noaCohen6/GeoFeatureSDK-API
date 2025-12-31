package com.geofeature.geofeaturesdk.service;

import com.geofeature.geofeaturesdk.boundaries.FeatureBoundary;
import com.geofeature.geofeaturesdk.boundaries.FeaturePostBoundary;
import com.geofeature.geofeaturesdk.boundaries.FeatureQueryResponse;

import java.util.List;
import java.util.Optional;

public interface FeatureService {

    FeatureBoundary createFeature(FeaturePostBoundary boundary);

    List<FeatureBoundary> getAllFeatures();

    Optional<FeatureBoundary> getFeatureById(String id);

    Optional<FeatureBoundary> getFeatureByName(String featureName);

    FeatureQueryResponse queryFeature(String featureName, String countryCode);

    FeatureBoundary updateFeature(String id, FeaturePostBoundary boundary);

    void deleteFeature(String id);

    void deleteAll();
}