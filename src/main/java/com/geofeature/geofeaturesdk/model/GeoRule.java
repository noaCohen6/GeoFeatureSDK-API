package com.geofeature.geofeaturesdk.model;

public class GeoRule {
    private String countryCode;
    private String status;
    private String value;

    public GeoRule() {
    }

    public GeoRule(String countryCode, String status, String value) {
        this.countryCode = countryCode;
        this.status = status;
        this.value = value;
    }

    // Getters and Setters
    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "GeoRule{" +
                "countryCode='" + countryCode + '\'' +
                ", status='" + status + '\'' +
                ", value='" + value + '\'' +
                '}';
    }
}