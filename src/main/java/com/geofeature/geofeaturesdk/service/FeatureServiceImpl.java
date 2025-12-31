package com.geofeature.geofeaturesdk.service;

import com.geofeature.geofeaturesdk.boundaries.FeatureBoundary;
import com.geofeature.geofeaturesdk.boundaries.FeaturePostBoundary;
import com.geofeature.geofeaturesdk.boundaries.FeatureQueryResponse;
import com.geofeature.geofeaturesdk.model.Feature;
import com.geofeature.geofeaturesdk.model.GeoRule;
import com.geofeature.geofeaturesdk.repository.FeatureRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class FeatureServiceImpl implements FeatureService {

    private final FeatureRepository featureRepository;
    private final FeatureConverter featureConverter;

    public FeatureServiceImpl(FeatureRepository featureRepository, FeatureConverter featureConverter) {
        this.featureRepository = featureRepository;
        this.featureConverter = featureConverter;
    }

    @Override
    @Transactional(readOnly = false)
    public FeatureBoundary createFeature(FeaturePostBoundary postBoundary) {
        // Check if feature already exists
        if (featureRepository.existsByFeatureName(postBoundary.getFeatureName())) {
            throw new RuntimeException("Feature with name '" + postBoundary.getFeatureName() + "' already exists");
        }

        FeatureBoundary boundary = featureConverter.convertPostBoundaryToBoundary(postBoundary);
        boundary.setId(UUID.randomUUID().toString());

        Feature entity = featureConverter.convertBoundaryToEntity(boundary);
        entity.setCreatedAt(LocalDateTime.now());
        entity.setUpdatedAt(LocalDateTime.now());

        entity = featureRepository.save(entity);

        return featureConverter.convertEntityToBoundary(entity);
    }

    @Override
    @Transactional(readOnly = true)
    public List<FeatureBoundary> getAllFeatures() {
        return featureRepository.findAll()
                .stream()
                .map(featureConverter::convertEntityToBoundary)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<FeatureBoundary> getFeatureById(String id) {
        return featureRepository.findById(id)
                .map(featureConverter::convertEntityToBoundary);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<FeatureBoundary> getFeatureByName(String featureName) {
        return featureRepository.findByFeatureName(featureName)
                .map(featureConverter::convertEntityToBoundary);
    }

    @Override
    @Transactional(readOnly = true)
    public FeatureQueryResponse queryFeature(String featureName, String countryCode) {
        Optional<Feature> featureOpt = featureRepository.findByFeatureName(featureName);

        if (featureOpt.isEmpty()) {
            throw new FeatureNotFoundException("Feature '" + featureName + "' not found");
        }

        Feature feature = featureOpt.get();

        // Check if there's a geo rule for this country
        Optional<GeoRule> geoRuleOpt = feature.getGeoRules().stream()
                .filter(rule -> rule.getCountryCode().equalsIgnoreCase(countryCode))
                .findFirst();

        if (geoRuleOpt.isPresent()) {
            GeoRule rule = geoRuleOpt.get();
            boolean enabled = "enabled".equalsIgnoreCase(rule.getStatus());
            return new FeatureQueryResponse(enabled, rule.getValue());
        }

        // Return default status if no geo rule found
        return new FeatureQueryResponse(feature.isDefaultStatus(), null);
    }

    @Override
    @Transactional(readOnly = false)
    public FeatureBoundary updateFeature(String id, FeaturePostBoundary postBoundary) {
        Feature existingFeature = featureRepository.findById(id)
                .orElseThrow(() -> new FeatureNotFoundException("Feature with id '" + id + "' not found"));

        // Update fields
        existingFeature.setFeatureName(postBoundary.getFeatureName());
        existingFeature.setDefaultStatus(postBoundary.isDefaultStatus());
        existingFeature.setGeoRules(postBoundary.getGeoRules());
        existingFeature.setUpdatedAt(LocalDateTime.now());

        existingFeature = featureRepository.save(existingFeature);

        return featureConverter.convertEntityToBoundary(existingFeature);
    }

    @Override
    @Transactional(readOnly = false)
    public void deleteFeature(String id) {
        if (!featureRepository.existsById(id)) {
            throw new FeatureNotFoundException("Feature with id '" + id + "' not found");
        }
        featureRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = false)
    public void deleteAll() {
        featureRepository.deleteAll();
    }
}