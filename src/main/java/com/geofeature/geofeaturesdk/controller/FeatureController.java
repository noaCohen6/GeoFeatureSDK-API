package com.geofeature.geofeaturesdk.controller;

import com.geofeature.geofeaturesdk.boundaries.FeatureBoundary;
import com.geofeature.geofeaturesdk.boundaries.FeaturePostBoundary;
import com.geofeature.geofeaturesdk.boundaries.FeatureQueryRequest;
import com.geofeature.geofeaturesdk.boundaries.FeatureQueryResponse;
import com.geofeature.geofeaturesdk.service.FeatureService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class FeatureController {

    private final FeatureService featureService;

    public FeatureController(FeatureService featureService) {
        this.featureService = featureService;
    }

    // POST /api/v1/features - Create a new feature
    @PostMapping("/features")
    public ResponseEntity<FeatureBoundary> createFeature(@RequestBody FeaturePostBoundary boundary) {
        System.err.println("************* Creating feature: " + boundary);
        FeatureBoundary created = featureService.createFeature(boundary);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // GET /api/v1/features - Get all features
    @GetMapping("/features")
    public ResponseEntity<List<FeatureBoundary>> getAllFeatures() {
        System.err.println("************* Getting all features");
        List<FeatureBoundary> features = featureService.getAllFeatures();
        return ResponseEntity.ok(features);
    }

    // GET /api/v1/features/{id} - Get feature by ID
    @GetMapping("/features/{id}")
    public ResponseEntity<FeatureBoundary> getFeatureById(@PathVariable String id) {
        System.err.println("************* Getting feature by id: " + id);
        return featureService.getFeatureById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // GET /api/v1/features/by-name/{featureName} - Get feature by name
    @GetMapping("/features/by-name/{featureName}")
    public ResponseEntity<FeatureBoundary> getFeatureByName(@PathVariable String featureName) {
        System.err.println("************* Getting feature by name: " + featureName);
        return featureService.getFeatureByName(featureName)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/v1/features/query - Query feature with country code
    @PostMapping("/features/query")
    public ResponseEntity<FeatureQueryResponse> queryFeature(@RequestBody FeatureQueryRequest request) {
        System.err.println("************* Querying feature: " + request);
        FeatureQueryResponse response = featureService.queryFeature(
                request.getFeatureName(),
                request.getCountryCode()
        );
        return ResponseEntity.ok(response);
    }

    // PUT /api/v1/features/{id} - Update feature
    @PutMapping("/features/{id}")
    public ResponseEntity<FeatureBoundary> updateFeature(
            @PathVariable String id,
            @RequestBody FeaturePostBoundary boundary) {
        System.err.println("************* Updating feature: " + id);
        FeatureBoundary updated = featureService.updateFeature(id, boundary);
        return ResponseEntity.ok(updated);
    }

    // DELETE /api/v1/features/{id} - Delete feature
    @DeleteMapping("/features/{id}")
    public ResponseEntity<Void> deleteFeature(@PathVariable String id) {
        System.err.println("************* Deleting feature: " + id);
        featureService.deleteFeature(id);
        return ResponseEntity.noContent().build();
    }

    // DELETE /api/v1/features - Delete all features
    @DeleteMapping("/features")
    public ResponseEntity<String> deleteAllFeatures() {
        System.err.println("************* Deleting all features");
        featureService.deleteAll();
        return ResponseEntity.ok("All features deleted");
    }
}