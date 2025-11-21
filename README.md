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

### 2. Instalación
```bash
git clone <URL_DEL_REPO>
cd <NOMBRE_DEL_PROYECTO>
npm install
```
### 3. Configuración de la base de datos
Crear la base de datos:

```bash
sql
CREATE DATABASE travelplanner;
Configurar variables en .env:
```

```bash
env
Copiar código
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_password
DB_DATABASE=travelplanner
RESTCOUNTRIES_URL=https://restcountries.com/v3.1
```
### 4. Ejecutar la API
```bash
npm run start:dev
```
### 5.Descripción de la API
#### 1. Módulos
* Countries:
  -Obtiene información de países.
  -Integra RestCountries.
  -Implementa caché local.

*TravelPlans:
  -Crea y gestiona planes de viaje.
  -Cada plan pertenece a un país.

### 6. Documentación de Endpoints
#### Countries:
-GET /countries -> Retorna todos los países almacenados.

-GET /countries/:code -> Busca un país por su código ISO. Si no está en la base de datos, se consulta en RestCountries y se guarda.

#### Ejemplo: 

Crea un plan de viaje.
``` bash
curl http://localhost:3000/countries/CO
TravelPlans
POST /travel-plans
```
Devuelve todos los planes registrados.
``` bash
curl -X POST http://localhost:3000/travel-plans \
  -H "Content-Type: application/json" \
  -d '{
    "countryCode": "CO",
    "title": "Vacaciones en Colombia",
    "description": "Visita a Medellín y Cartagena",
    "startDate": "2025-01-10",
    "endDate": "2025-01-20"
  }'
GET /travel-plans
```
Retorna el detalle de un plan.
``` bash
GET /travel-plans/:id
```


### 7. Explicación del Provider Externo (RestCountries)
El flujo del provider es:
  1. El usuario consulta un país por código.
  2. Se revisa si existe en la base de datos.
  3. Si no existe, se hace la petición:
   ``` bash
  GET https://restcountries.com/v3.1/alpha/{code}
  ```
  4. Se mapea la respuesta.
  5. Se almacena en la base de datos como caché local.

### 8. Pruebas Básicas Sugeridas
#### 1. Consultar un país no cacheado
``` bash
GET /countries/JP
``` 
Esperado: se consulta en RestCountries y se guarda en la base de datos.

#### 2. Consultar un país cacheado
``` bash
GET /countries/JP
``` 
Esperado: se retorna desde la base de datos sin hacer solicitud externa.
