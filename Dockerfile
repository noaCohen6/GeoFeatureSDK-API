# ===== Stage 1: Build the application =====
FROM gradle:8.5-jdk17 AS build

# Set working directory
WORKDIR /app

# Copy Gradle files
COPY build.gradle settings.gradle gradlew ./
COPY gradle ./gradle

# Download dependencies (cached layer)
RUN gradle dependencies --no-daemon || return 0

# Copy source code
COPY src ./src

# Build the application (skip tests for faster build)
RUN gradle bootJar --no-daemon -x test

# ===== Stage 2: Run the application =====
FROM eclipse-temurin:17-jre-alpine

# Set working directory
WORKDIR /app

# Copy the JAR file from build stage
COPY --from=build /app/build/libs/*.jar app.jar

# Expose port 8080
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]