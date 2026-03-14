# Multi-stage Dockerfile for Spring Boot (Maven Wrapper)
# Builds the app with ./mvnw package and then runs the generated jar.

# --- Build stage -------------------------------------------------------------
FROM maven:3.9.5-eclipse-temurin-17 AS build
WORKDIR /app

# Copy Maven wrapper and pom first to leverage Docker cache
COPY mvnw mvnw
COPY .mvn .mvn
COPY pom.xml pom.xml

# Copy source code
COPY src src

# Build the application (skip tests for faster builds; remove -DskipTests if you want tests run)
RUN chmod +x mvnw && ./mvnw package -DskipTests


# --- Run stage ---------------------------------------------------------------
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy the jar produced by the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port the Spring Boot app runs on
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
