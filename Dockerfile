# ===== Stage 1: Build the application =====
FROM gradle:8.14-jdk21 AS build

# Set working directory
WORKDIR /app

# Copy only necessary files
COPY build.gradle settings.gradle ./
COPY src ./src

# Build the application (Gradle will download dependencies)
RUN gradle bootJar --no-daemon -x test

# ===== Stage 2: Run the application =====
FROM eclipse-temurin:21-jre-alpine

# Set working directory
WORKDIR /app

# Copy the JAR file from build stage
COPY --from=build /app/build/libs/*.jar app.jar

# Expose port 8080
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]