# Datos de Prueba - School API

Este directorio contiene un dump de la base de datos con datos de prueba precargados.

## Contenido del dump

### Alumnos (5 registros)
- Jose Simon Ortega Cotes
- Juan Perez
- Maria Garcia
- Carlos Rodríguez
- Luis Torres

### Materias (5 registros)
- Matemáticas (MAT101) - 4 créditos
- Programación (PRG101) - 5 créditos
- Física (FIS101) - 4 créditos
- Inglés (ING101) - 3 créditos
- Base de Datos (BDD101) - 5 créditos

### Notas (12 registros)
Múltiples notas registradas para diferentes alumnos y materias.

---

## Cómo restaurar los datos

### Opción 1: Con Docker (Recomendado)

Si ya tienes los contenedores corriendo:
```bash
docker exec -i school_mysql mysql -u root -proot school_db < db/school_db.dump
```

### Opción 2: Desde MySQL local

Si tienes MySQL instalado localmente:
```bash
mysql -u school_user -pschool_pass school_db < db/school_db.dump
```

---

## Nota

Los datos fueron generados el 2026-01-15 y están listos para validar todas las funcionalidades de la API:
- CRUD de Alumnos
- CRUD de Materias
- Registro y consulta de Notas