# ⚡ QUICK START GUIDE - Los Hermanos Inventario

## 🚀 En 5 Minutos

### 1. Instalar Dependencias (1 min)
```bash
npm install
```

### 2. Configurar Variables de Ambiente (1 min)
Crear archivo `.env` en raíz:
```env
DB_USERNAME=postgres
DB_PASSWORD=password123
DB_NAME=los_hermanos
DB_HOST=localhost
DB_PORT=5432
NODE_ENV=development
PORT=3000
```

### 3. Ejecutar Migraciones (1 min)
```bash
npm run migrate
# O manualmente si lo prefieres
```

### 4. Iniciar Servidor (1 min)
```bash
npm run dev
# El servidor estará en http://localhost:3000
```

### 5. Probar Endpoint (1 min)
```bash
# Terminal 1: Servidor corriendo
# Terminal 2: Test

curl -X GET http://localhost:3000/taxes
```

---

## 📍 Endpoints Principales

### Impuestos (Taxes)
```bash
# Listar todos
GET /taxes

# Obtener uno
GET /taxes/:id

# Crear
POST /taxes
Body: { "name": "IVA", "percentage": 16, "description": "..." }

# Actualizar
PUT /taxes/:id
Body: { "percentage": 18 }

# Eliminar
DELETE /taxes/:id

# Calcular precio
POST /taxes/calculate
Body: { "basePrice": 100, "taxes": [{ "name": "IVA", "percentage": 16 }] }
```

### Inventario
```bash
# Restar stock
POST /inventory/subtract-stock
Body: { "articuloId": 1, "quantity": 5 }
```

---

## 🎯 Flujos Típicos

### Escenario 1: Crear Impuesto Nuevo
```bash
# 1. Crear impuesto
curl -X POST http://localhost:3000/taxes \
  -H "Content-Type: application/json" \
  -d '{
    "name": "ISR",
    "percentage": 10,
    "description": "Impuesto Sobre la Renta"
  }'

# 2. Verificar
curl http://localhost:3000/taxes
```

### Escenario 2: Vender Artículo con Impuestos
```bash
# 1. Restar stock
curl -X POST http://localhost:3000/inventory/subtract-stock \
  -H "Content-Type: application/json" \
  -d '{
    "articuloId": 1,
    "quantity": 5
  }'

# Respuesta incluye:
# - precioFinal (con impuestos)
# - impuestos (desglose)
# - Registra en ProductoHistorial
```

### Escenario 3: Calcular Precio Final
```bash
# Calcula qué pagará el cliente
curl -X POST http://localhost:3000/taxes/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "basePrice": 1000,
    "taxes": [
      { "name": "IVA", "percentage": 16 },
      { "name": "ISR", "percentage": 10 }
    ]
  }'

# Retorna: finalPrice = 1000 * 1.2656 = 1265.60
```

---

## 🔍 Ver Logs

### En Desarrollo
```bash
npm run dev
# Verás logs coloreados:
# [DEBUG] 
# [INFO]  (verde)
# [WARN]  (amarillo)
# [ERROR] (rojo)
```

### Estructura de Log
```
[2025-11-26T14:30:45.123Z] [INFO] Processing stock subtraction
  { articuloId: 1, quantity: 5 }
```

---

## 🛠️ Troubleshooting

### Error: "Cannot resolve express"
```bash
# Solución: Instalar dependencias
npm install
```

### Error: "Database connection failed"
```bash
# Verificar:
# 1. PostgreSQL está corriendo
# 2. Variables .env son correctas
# 3. Base de datos existe: los_hermanos
```

### Error: "Missing migrations"
```bash
# Ejecutar:
npm run migrate

# O verificar archivo de configuración
# en src/core/database/config.ts
```

---

## 📊 Base de Datos

### Tablas Principales
```
Tax
├─ id (PK)
├─ name (UNIQUE)
├─ percentage
├─ description
└─ timestamps

ProductoHistorial
├─ id (PK)
├─ articuloId (FK)
├─ stockAnterior, stockNuevo
├─ cantidadVendida
├─ precioUnitario
├─ precioTotalSinImpuesto
├─ impuestos (JSON)
├─ precioFinal
├─ razonMovimiento
└─ createdAt

Articulo (existente)
├─ id (PK)
├─ nombre
├─ descripcion
├─ precio
├─ stock
├─ categoriaId (FK)
├─ marcaId (FK)
└─ timestamps
```

---

## 🚨 Error Codes

| Code | HTTP | Significado |
|------|------|---|
| ARTICULO_NOT_FOUND | 404 | Artículo no existe |
| INSUFFICIENT_STOCK | 400 | No hay suficiente stock |
| INVALID_QUANTITY | 400 | Cantidad no válida |
| TAX_NOT_FOUND | 404 | Impuesto no existe |
| DUPLICATE_TAX_NAME | 409 | Impuesto duplicado |
| INVALID_TAX_PERCENTAGE | 400 | Porcentaje no válido |
| INTERNAL_ERROR | 500 | Error del servidor |

---

## 📝 Ejemplos de Respuestas

### Éxito al Restar Stock
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nombre": "Laptop Dell XPS",
    "precioFinal": 11600,
    "stockRestante": 45,
    "impuestos": { "IVA": 16, "ISR": 10 }
  },
  "precioFinal": 11600,
  "impuestos": {
    "taxes": [
      { "name": "IVA", "percentage": 16, "enabled": true },
      { "name": "ISR", "percentage": 10, "enabled": true }
    ],
    "totalPercentage": 26,
    "taxMultiplier": 1.26
  }
}
```

### Error
```json
{
  "success": false,
  "error": "Stock insuficiente para artículo 1. Solicitado: 10, Disponible: 5",
  "code": "INSUFFICIENT_STOCK"
}
```

---

## 🧪 Test Manual con Postman/Insomnia

### Colección Importar
1. Abrir Postman
2. Click "Import"
3. Pegar URL o archivo
4. Guardar como colección

### Requests
```
# Pre-request Script (opcional)
const baseUrl = "http://localhost:3000";

# Request 1: Get All Taxes
GET {{baseUrl}}/taxes

# Request 2: Create Tax
POST {{baseUrl}}/taxes
{
  "name": "IVA",
  "percentage": 16,
  "description": "Impuesto al Valor Agregado"
}

# Request 3: Calculate Price
POST {{baseUrl}}/taxes/calculate
{
  "basePrice": 100,
  "taxes": [
    { "name": "IVA", "percentage": 16 }
  ]
}

# Request 4: Subtract Stock
POST {{baseUrl}}/inventory/subtract-stock
{
  "articuloId": 1,
  "quantity": 5
}
```

---

## 🎓 Estructura de Código

```
Entrada: app.ts
  ↓
Middleware → logging.ts + error-handler.ts
  ↓
Routes → /taxes y /inventory
  ↓
Controllers → Validación + logging
  ↓
Services → Lógica de negocio
  ↓
Builders → Cálculos y construcción
  ↓
Database → Models + Migrations
```

---

## 📚 Documentación Completa

Para documentación más detallada:
- `IMPLEMENTATION_SUMMARY.md` - Implementación completa
- `FILES_USAGE.md` - Uso de archivos
- `VISUAL_SUMMARY.md` - Diagramas
- `CHECKLIST_FINAL.md` - Verificación de requisitos

---

## ✅ Checklist de Verificación

- [ ] npm install completado
- [ ] .env configurado
- [ ] PostgreSQL corriendo
- [ ] Migraciones ejecutadas
- [ ] Servidor inicia sin errores
- [ ] GET /taxes retorna array
- [ ] POST /taxes crea impuesto
- [ ] POST /taxes/calculate calcula precio
- [ ] POST /inventory/subtract-stock funciona

---

## 🤝 Soporte

Si tienes problemas:
1. Verifica logs con `npm run dev`
2. Confirma variables en `.env`
3. Revisa base de datos con pgAdmin
4. Consulta documentación en markdown files

---

**¡Listo para empezar!** 🚀

Ejecuta: `npm install && npm run dev`
