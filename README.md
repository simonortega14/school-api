# School API – Backend

Este proyecto corresponde al backend de una prueba técnica Full Stack.  
Consiste en una API REST para gestionar alumnos, materias y notas, desarrollada con Java y Spring Boot.  
La API permite crear, consultar, actualizar y eliminar alumnos y materias, así como registrar y consultar notas por alumno.

---

## Tecnologías usadas

- Java 17
- Spring Boot 3.5.x
- Spring Data JPA
- Maven
- MySQL 8 (Docker)

---

## Estructura del proyecto

El proyecto sigue una estructura clásica por capas:

- **model** → Entidades JPA
- **repository** → Acceso a datos
- **service** → Lógica de negocio
- **controller** → Endpoints REST

---

## Base de datos (MySQL con Docker)

La base de datos se ejecuta utilizando Docker.

### Levantar MySQL con Docker
```bash
docker run --name school_mysql \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=school_db \
  -e MYSQL_USER=school_user \
  -e MYSQL_PASSWORD=school_pass \
  -p 3306:3306 \
  -d mysql:8
```

Verificar que el contenedor esté corriendo:
```bash
docker ps
```

---

## Variables de entorno

La aplicación se conecta a la base de datos utilizando variables de entorno.

### Configuración en Windows (PowerShell)
```powershell
$env:DB_URI="jdbc:mysql://localhost:3306/school_db"
$env:DB_USER="school_user"
$env:DB_PASSWORD="school_pass"
$env:DB_DRIVER="com.mysql.cj.jdbc.Driver"
```

---

## Ejecutar la aplicación

Desde la raíz del proyecto, ejecutar:
```bash
mvn spring-boot:run
```

La API quedará disponible en:
```
http://localhost:8080
```

---

## Endpoints principales

### Alumnos

- `POST /api/alumnos`
- `GET /api/alumnos`
- `GET /api/alumnos/{id}`
- `PUT /api/alumnos/{id}`
- `DELETE /api/alumnos/{id}`

### Materias

- `POST /api/materias`
- `GET /api/materias`
- `GET /api/materias/{id}`
- `PUT /api/materias/{id}`
- `DELETE /api/materias/{id}`

### Notas

- `POST /api/notas`
- `GET /api/notas/alumno/{alumnoId}`

---

## Datos de prueba

Se incluyen datos de prueba para facilitar la validación del sistema.  
Los datos se encuentran en formato `.dump` dentro del siguiente directorio:
```
/db/school_db.dump
```

El archivo contiene registros de alumnos, materias y notas ya relacionadas.

---

## Notas finales

- El backend funciona correctamente de forma local
- La base de datos se ejecuta obligatoriamente con Docker
- Las credenciales se manejan mediante variables de entorno
- El proyecto no contiene referencias a la empresa evaluadora
