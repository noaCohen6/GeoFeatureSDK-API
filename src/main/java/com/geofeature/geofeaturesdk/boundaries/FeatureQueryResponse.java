package com.geofeature.geofeaturesdk.boundaries;


public class FeatureQueryResponse {
    private boolean enabled;
    private String value;

    public FeatureQueryResponse() {
    }

    public FeatureQueryResponse(boolean enabled, String value) {
        this.enabled = enabled;
        this.value = value;
    }

    // Getters and Setters
    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "FeatureQueryResponse{" +
                "enabled=" + enabled +
                ", value='" + value + '\'' +
                '}';
    }
}