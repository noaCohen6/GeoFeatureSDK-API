package com.geofeature.geofeaturesdk.boundaries;


public class FeatureQueryRequest {
    private String featureName;
    private String countryCode;

    public FeatureQueryRequest() {
    }

    // Getters and Setters
    public String getFeatureName() {
        return featureName;
    }

    public void setFeatureName(String featureName) {
        this.featureName = featureName;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    @Override
    public String toString() {
        return "FeatureQueryRequest{" +
                "featureName='" + featureName + '\'' +
                ", countryCode='" + countryCode + '\'' +
                '}';
    }
}
