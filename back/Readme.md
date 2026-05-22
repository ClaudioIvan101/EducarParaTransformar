# Project Configuration

## 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-directory>
```

---

## 2. Configure the Database

Create a database for the project and update the connection settings in:

- `src/main/resources/application.properties`
- or `src/main/resources/application.yml`

### Example Configuration

```properties
spring.datasource.url=jdbc:mysql://<host>:<port>/<database_name>
spring.datasource.username=<db_username>
spring.datasource.password=<db_password>

spring.jpa.hibernate.ddl-auto=update
```

---

## 3. Install Dependencies

Run the following command to download and install all project dependencies:

```bash
mvn clean install
```

---

## 4. Run the Application

Start the application using Maven:

```bash
mvn spring-boot:run
```

Alternatively, you can run the main method from the `ApiTfiApplication` class directly from your IDE.

---

# API Endpoints

## Base URL

```text
http://localhost:8080
```

---

## User Endpoints

### Create User

**Endpoint**

```http
POST /users
```

### Request Body

```json
{
  "email": "example@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "password": "password123"
}
```

---

### Get User by ID

**Endpoint**

```http
GET /users/{userId}
```

---

# Testing

Run the automated tests with:

```bash
mvn test
```

---

# Deployment

## Package the Application

```bash
mvn clean package
```

## Run the Generated JAR

```bash
java -jar target/<project-name>.jar
```

---

# Additional Notes

- Ensure the `application.properties` or `application.yml` file is properly configured for the target environment.
- Avoid storing sensitive credentials directly in configuration files.
- Use environment variables or a configuration server for production environments.