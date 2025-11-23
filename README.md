# Preparcial 2

Este proyecto implementa una API REST construida con NestJS, conectada a una base de datos relacional mediante TypeORM. La API administra información de países y planes de viaje, integrándose además con el proveedor externo RestCountries para obtener datos actualizados de países.

---

## Cómo ejecutar el proyecto

### 1. Requisitos
- Node.js >= 18  
- PostgreSQL >= 14  
- Nest CLI instalado globalmente  

```bash
npm i -g @nestjs/cli
```
### 2. Ejecutar la API
```bash
cd parcial-nestjs
```
```bash
npm run start:dev
```
La API estará disponible en:
```bash
http://localhost:3000
```
### 3.Descripción de la API
#### 1. Módulos
* Countries:
  - Maneja información de países.
  - Usa caché local en la base de datos.
  - Consume la API oficial RestCountries
  - Implementa borrado protegido mediante Guard.
  - Expone CRUD parcial (GET, GET by ID, DELETE protegido).

* TravelPlans:
  - Crea y gestiona planes de viaje.
  - Cada plan pertenece a un país.

### 4. Documentación de Endpoints
#### Countries:
- GET /countries -> Retorna todos los países almacenados.
``` bash
curl http://localhost:3000/countries/COL
```
- GET /countries/:code -> Busca un país por su código ISO. Si no está en la base de datos, se consulta en RestCountries y se guarda.
- DELETE /countries/:code -> Borrado protegido. Requiere header x-auth-token: secret123; si el país no existe devuelve 404, si tiene TravelPlans asociados devuelve 409 Conflict y solo se elimina si cumple todas las condiciones.

#### Travel plans
- POST /travel-plans -> Crea un plan de viaje nuevo. Valida que exista el país (si no existe: se descarga primero desde RestCountries).
``` bash
curl -X POST http://localhost:3000/travel-plans \
  -H "Content-Type: application/json" \
  -d '{
    "countryCode": "COL",
    "title": "Viaje a Bogotá",
    "startDate": "2025-01-10",
    "endDate": "2025-01-15",
    "notes": "Plan corto"
  }'
```
- GET /travel-plans -> Lista todos los planes.
- GET /travel-plans/:id -> Retorna un plan específico.

### 5. Explicación del Provider Externo (RestCountries)
El flujo del provider es:
  1. El usuario consulta un país por código.
  2. Se revisa si existe en la base de datos.
  3. Si no existe, se hace la petición:
   ``` bash
  GET https://restcountries.com/v3.1/alpha/{code}
  ```
  4. Se mapea la respuesta.
  5. Se almacena en la base de datos como caché local.

### 6. Middleware de Logging (Parcial)
Se aplica a:
- /countries
- /travel-plans

Registra:
- Método HTTP
- Ruta
- Código de respuesta
- Tiempo total de la petición

Ejemplo de consola:
``` bash
[LOG] GET /countries - 200 - 12ms
```
### 7. Seed del sistema
Ejecuta:
``` bash
npm run seed
```
Esto descarga países: COL, USA, FRA, JPN e inserta planes de viaje de ejemplo

### 7. Pruebas Básicas Sugeridas
#### 1. Consultar un país no cacheado
``` bash
GET /countries/ISL
``` 
Esperado: se consulta en RestCountries y se guarda en la base de datos.

#### 2. Consultar un país cacheado
``` bash
GET /countries/ISL
``` 
Esperado: Retorna desde SQLite sin llamar al API externo.
#### 3. Borrado protegido
``` bash
curl -X DELETE http://localhost:3000/countries/COL \
  -H "x-auth-token: secret123"
```
#### 4. Middleware visible
Consultar cualquier endpoint:
→ Imprime logs en consola.
