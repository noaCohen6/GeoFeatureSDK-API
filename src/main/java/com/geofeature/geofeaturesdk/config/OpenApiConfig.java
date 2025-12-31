package com.geofeature.geofeaturesdk.config;


import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI geoFeatureOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("GeoFeature SDK API")
                        .description("Geographic Feature Toggle API - Control features based on user location")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Your Name")
                                .email("your.email@example.com")));
    }
}