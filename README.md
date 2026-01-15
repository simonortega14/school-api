# Sistema de Gestión Escolar - Full Stack

Aplicación web Full Stack para gestionar alumnos, materias y notas académicas.

---

## 📋 Tecnologías

### Backend
- Java 17
- Spring Boot 3.5.4
- Spring Data JPA
- Maven
- MySQL 8.4

### Frontend
- React
- TypeScript
- Vite

### Infraestructura
- Docker & Docker Compose
- MySQL (contenedor)

---

## Arquitectura

El proyecto está dividido en tres servicios principales:

1. **MySQL** - Base de datos (puerto 3306)
2. **Backend** - API REST Spring Boot (puerto 8080)
3. **Frontend** - Aplicación React (puerto 80)

Todos los servicios se comunican a través de una red Docker (`school_network`).

---

## Variables de entorno

### Backend
| Variable | Valor | Descripción |
|----------|-------|-------------|
| `DB_URI` | `jdbc:mysql://mysql:3306/school_db` | URL de conexión a MySQL |
| `DB_USER` | `school_user` | Usuario de la base de datos |
| `DB_PASSWORD` | `school_pass` | Contraseña de la base de datos |
| `DB_DRIVER` | `com.mysql.cj.jdbc.Driver` | Driver JDBC de MySQL |

### Frontend
| Variable | Valor | Descripción |
|----------|-------|-------------|
| `VITE_API_URL` | `/api` | URL base del backend |

**Nota**: Estas variables ya están configuradas en el `docker-compose.yml` y no necesitan configuración manual.

---

## Instrucciones de ejecución

### Requisitos previos
- Docker Desktop instalado
- Docker Compose instalado
- Puertos 80, 3306 y 8080 disponibles

### Pasos para ejecutar

1. **Clonar el repositorio**
```bash
   git clone 
   cd 
```

2. **Levantar todos los servicios**
```bash
   docker-compose up --build
```
   
3. **Esperar a que los servicios estén listos**  
   Observar los logs hasta ver:
   - `MySQL: ready for connections`
   - `Started SchoolApiApplication`
   - Frontend accesible

4. **Restaurar datos de prueba**  
   En otra terminal, ejecutar:
```bash
   docker exec -i school_mysql mysql -u school_user -pschool_pass school_db < db/school_db.dump
```

5. **Acceder a la aplicación**
   - **Frontend**: http://localhost

---

## 🔌 Endpoints de la API

### Alumnos
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/alumnos` | Crear alumno |
| GET | `/api/alumnos` | Listar todos los alumnos |
| GET | `/api/alumnos/{id}` | Consultar alumno por ID |
| PUT | `/api/alumnos/{id}` | Actualizar alumno |
| DELETE | `/api/alumnos/{id}` | Eliminar alumno |

### Materias
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/materias` | Crear materia |
| GET | `/api/materias` | Listar todas las materias |
| GET | `/api/materias/{id}` | Consultar materia por ID |
| PUT | `/api/materias/{id}` | Actualizar materia |
| DELETE | `/api/materias/{id}` | Eliminar materia |

### Notas
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/notas` | Registrar nota |
| GET | `/api/notas/alumno/{alumnoId}` | Listar notas por alumno |

---

## Datos de prueba

El archivo `db/school_db.dump` contiene datos iniciales para probar la aplicación:
- Varios alumnos registrados
- Múltiples materias
- Notas asociadas a alumnos y materias

Estos datos se restauran automáticamente siguiendo el paso 4 de las instrucciones.

---

## Detener la aplicación

Para detener todos los servicios:
```bash
docker-compose down
```

Para detener y eliminar volúmenes (base de datos):
```bash
docker-compose down -v
```

---

## Verificación del sistema

### Verificar que los contenedores estén corriendo
```bash
docker ps
```

Deberías ver 3 contenedores activos:
- `school_mysql`
- `school_backend`
- `school_frontend`

### Probar el backend directamente
```bash
curl http://localhost:8080/api/alumnos
```

### Verificar logs
```bash
# Backend
docker logs school_backend

# Frontend
docker logs school_frontend

# MySQL
docker logs school_mysql
```

---

## 🔧 Solución de problemas

### El backend no se conecta a MySQL
- Verificar que MySQL esté completamente iniciado (healthcheck)
- Revisar logs: `docker logs school_mysql`

### Puerto en uso
Si los puertos están ocupados, modificar en `docker-compose.yml`:
```yaml
ports:
  - "NUEVO_PUERTO:PUERTO_CONTENEDOR"
```

### Reconstruir desde cero
```bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```

---

## Notas adicionales

- El proyecto utiliza Docker Compose para orquestar todos los servicios
- La base de datos persiste en un volumen Docker (`mysql_data`)
- El backend espera a que MySQL esté saludable antes de iniciar
- Las credenciales están configuradas solo para desarrollo/pruebas

---

## Autor

José Simón Ortega Cotes - Desarrollado como prueba técnica para posición de Desarrollador Full Stack Junior.
