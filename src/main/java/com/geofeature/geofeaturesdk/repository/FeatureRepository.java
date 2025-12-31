package com.geofeature.geofeaturesdk.repository;

import com.geofeature.geofeaturesdk.model.Feature;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FeatureRepository extends MongoRepository<Feature, String> {

    Optional<Feature> findByFeatureName(String featureName);

    boolean existsByFeatureName(String featureName);

    void deleteByFeatureName(String featureName);
}