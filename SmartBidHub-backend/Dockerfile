# Stage 1: Build the JAR
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
# Build only the backend, skipping tests for speed
RUN mvn clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
# Copy only the built JAR from the first stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port defined in your properties
EXPOSE 8080

# The variables will be injected by the cloud platform (Render/Docker)
ENTRYPOINT ["java", "-jar", "app.jar"]