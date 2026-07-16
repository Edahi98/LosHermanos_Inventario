# 🔧 Los Hermanos: Sistema de Gestión para Taller Mecánico
[![GitHub Flow](https://img.shields.io/badge/Workflow-GitHub%20Flow-blue.svg)](https://docs.github.com/en/get-started/using-github/github-flow)
[![Metodología](https://img.shields.io/badge/Metodolog%C3%ADa-Kanban-brightgreen.svg)](README.md)
[![Versionado](https://img.shields.io/badge/Versionado-SemVer-yellow.svg)](README.md)
[!https://aws.amazon.com/es/what-is/repo/(https://img.shields.io/badge/Repositorio-LosHermanos__Inventario-red.svg)](https://github.com/Edahi98/LosHermanos_Inventario)

## 🎯 Objetivo del Proyecto

[cite_start]El objetivo general es **automatizar y digitalizar** todos los métodos manuales (hojas de papel, libretas, archivos físicos) [cite: 11] [cite_start]del taller mecánico "Los Hermanos"[cite: 14].

[cite_start]Se busca implementar un sistema web que digitalice, centralice y almacene toda la información de inventario, servicios y reportes[cite: 11]. [cite_start]Esto eliminará el desorden físico y el riesgo de pérdida de documentos[cite: 12].

---

## ✨ Módulos y Funcionalidades

[cite_start]La solución propuesta se basa en los siguientes módulos[cite: 31]:

* **Módulo de Inventario:**
    * [cite_start]Registro de refacciones con atributos: Nombre, Categoría, Marca compatible, Modelo de auto compatible, Precio de compra, Precio de venta y Fecha de publicación[cite: 37].
    * [cite_start]El stock se actualizará automáticamente con cada venta o compra de artículos[cite: 38].
* **Módulo de Facturación:**
    * [cite_start]Generación Automatizada de Tickets por cada compra o servicio[cite: 33].
    * [cite_start]Cálculo automático del total, el IVA y cualquier otro impuesto o descuento[cite: 35].
* **Módulo de Servicios:**
    * [cite_start]Almacenará los datos de los clientes y el **historial completo** de compras y servicios realizados en sus vehículos[cite: 46].
    * [cite_start]Se asociará el servicio al modelo específico del automóvil del cliente[cite: 48].
* **Módulo de Reportes:**
    * [cite_start]Permite generar reportes detallados por día, semana, mes o rango de fechas personalizado[cite: 43].
    * [cite_start]Facilita la toma de decisiones estratégicas al identificar los productos y servicios más vendidos, y las tendencias[cite: 44].

---

## 💻 Arquitectura y Tecnologías

### Arquitectura

[cite_start]Se propone el uso de la arquitectura de **Microservicios** [cite: 51][cite_start], justificada en que cada integrante del equipo domina un lenguaje específico [cite: 53][cite_start], lo cual permite ahorrar tiempo en el desarrollo[cite: 54].

### Tecnologías

| Componente | Tecnología Principal | Framework / Librerías | Justificación / Patrones |
| :--- | :--- | :--- | :--- |
| **Aplicación Web** | PHP | **Laravel** | [cite_start]Elegido por el conocimiento del patrón MVC [cite: 102, 104] [cite_start]y la experiencia previa del equipo[cite: 103]. |
| **Microservicio** | TypeScript | **Express**, **Sequelize** | [cite_start]TypeScript para tipado fuerte[cite: 66]. [cite_start]Express para rápido desarrollo[cite: 68]. [cite_start]Sequelize como ORM para seguridad anti-inyección SQL[cite: 70]. |
| **Patrón de Diseño** | Builder | N/A | [cite_start]Utilizado en el módulo de servicios para calcular impuestos necesarios en forma de cadena, ya que las compras tienen diferentes porcentajes[cite: 158]. |
| **Metodología** | Kanban | Asana | [cite_start]Permite reportar problemas oportunamente y tomar medidas[cite: 74]. [cite_start]Se eligió para el microservicio para mantener comunicación constante y evitar retrasos[cite: 79]. |

---

## 💾 Estructura del Repositorio

El repositorio está dividido en la aplicación web (Laravel) y el microservicio, siguiendo una estructura clara:

---

## 🔒 Políticas de Seguridad

Para proteger la información sensible, se implementan las siguientes políticas:

* **TLS Mutuo (mTLS):** Requerido en la arquitectura de microservicios. [cite_start]El microservicio Express se configura con `https.createServer()` para obligar la autenticación de cliente[cite: 1601, 1606, 1618].
* **JSON Web Token (JWT):** Utilizado para la autenticación remota del microservicio. [cite_start]El middleware `checkJwt` realiza la validación del token de forma externa y segura[cite: 1634, 1640, 1641].
* [cite_start]**Laravel Sanctum:** Utilizado en la parte web para proporcionar una solución de seguridad ligera y unificada para la autenticación en la interfaz de usuario y el control de acceso a los datos mediante tokens API[cite: 1669, 1676].

---

## 🤝 Flujo de Trabajo y Contribución

### Flujo de Ramas (GitHub)

[cite_start]Se establece una metodología estricta para la gestión de ramas[cite: 189].

| Prefijo | Uso | Regla de Nomenclatura |
| :--- | :--- | :--- |
| `main` | [cite_start]Código en producción[cite: 196]. | [cite_start]`main` (No debe tener caracteres especiales)[cite: 194, 198]. |
| `develop` | [cite_start]Integra todas las *features* en fase de pruebas[cite: 221]. | [cite_start]`develop` (No debe tener caracteres especiales)[cite: 219, 223]. |
| `hotfix` | [cite_start]Corrección de errores críticos[cite: 203]. | [cite_start]`hotfix/<identificador>/<descripción>/<yyyy-mm-dd>`[cite: 202]. |
| `feature` | [cite_start]Desarrollo de nuevas funcionalidades[cite: 210]. | [cite_start]`feature/<nombre_feature>/<descripción>/<yyyy-mm-dd>`[cite: 209]. |
| `release` | [cite_start]Preparación de una versión final para el despliegue[cite: 227]. | [cite_start]`release/<version>/<yyyy-mm-dd>`[cite: 226]. |

### Convención de Commits (Conventional Commits)

[cite_start]Cada *commit* debe cumplir con la siguiente estructura[cite: 924]:

[cite_start]**Estructura:** `<tipo>[módulo]: descripción` [cite: 925]

| Tipo | Descripción | Importancia SemVer |
| :--- | :--- | :--- |
| `feat` | [cite_start]Indica que se introdujo una nueva característica[cite: 929]. | [cite_start]**MINOR** (funcionalidad nueva y compatible)[cite: 955]. |
| `fix` | [cite_start]Indica que se parchó un bug[cite: 928]. | [cite_start]**PATCH** (repara errores compatibles)[cite: 956]. |
| `revert` | [cite_start]Indica que se eliminó una característica[cite: 930]. | [cite_start]Puede ser **MAJOR** (cambio incompatible)[cite: 954]. |
| `edit-feat` | [cite_start]Indica que se editó una característica[cite: 931]. | Depende del impacto. |
| `refactor` | [cite_start]Indica que se refactorizó alguna función[cite: 932]. | Generalmente **PATCH** o **MINOR**. |

### Políticas de Pull Request (PR)

[cite_start]Se requiere una **solicitud de extracción** antes de fusionar[cite: 264].

1.  [cite_start]**Aprobaciones:** Se requieren **2 aprobaciones** para la extracción[cite: 272]. [cite_start]Los revisores deben tener permiso *Write* o superior[cite: 274].
2.  [cite_start]**Verificación de Estado:** Se exige que se aprueben las comprobaciones de estado (CI, pruebas, análisis de seguridad) antes de la fusión[cite: 267, 268].
3.  [cite_start]**Calidad:** Se exige una revisión del código para garantizar que sea de **buena calidad**[cite: 292].
4.  [cite_start]**Protección:** La rama principal (`main`/`master`) del repositorio debe ser protegida[cite: 300].

---

## 📌 Control de Versiones (SemVer)

[cite_start]El sistema utiliza la **Especificación del Versionado Semántico (SemVer)** con la forma **X.Y.Z** (Mayor.Menor.Parche)[cite: 1176, 1177].

* [cite_start]**X (Mayor):** Incrementa si se introducen **cambios incompatibles** con la versión anterior del API público[cite: 1187, 954].
* [cite_start]**Y (Menor):** Incrementa si se introduce **funcionalidad nueva y compatible** con la versión anterior[cite: 1184, 955].
* [cite_start]**Z (Parche):** Incrementa si solamente se introducen **correcciones de errores compatibles** con versiones anteriores[cite: 1182, 956].

[cite_start]Una vez que el paquete es publicado, su contenido **NO DEBE ser modificado**[cite: 1179]. [cite_start]Cualquier cambio DEBE ser publicado como una nueva versión[cite: 1180].

### Creación de Tags y Releases

1.  [cite_start]**Creación de un Tag:** Se realiza en GitHub Desktop, haciendo clic derecho en el *commit* deseado en el historial y seleccionando `Create Tag`[cite: 1275, 1276]. [cite_start]El nombre debe seguir la especificación SemVer[cite: 1277].
2.  [cite_start]**Creación de una Release:** Se realiza en la web de GitHub, seleccionando el *tag* deseado, ingresando el título y el contenido, y finalmente haciendo clic en `Publish Release`[cite: 1410, 1411, 1412, 1413, 1414].

---

## 🛠️ Recursos y Soporte

| Recurso | Enlace de Documentación |
| :--- | :--- |
| **GitHub Flow** | [cite_start][https://docs.github.com/en/get-started/using-github/github-flow](https://docs.github.com/en/get-started/using-github/github-flow) [cite: 1556] |
| **Branch protection rules** | [cite_start][https://docs.github.com/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches](https://docs.github.com/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) [cite: 1558] |
| **Resolución de conflictos en GitHub** | [cite_start][https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-on-github](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-on-github) [cite: 1564] |
| **Conventional Commits** | [cite_start][https://graphite.dev/guides/git-commit-message-best-practices](https://graphite.dev/guides/git-commit-message-best-practices) [cite: 1571] |
| **Automatizar formateo con Prettier** | [cite_start][https://www.codewalnut.com/tutorials/how-to-automate-code-formatting-with-prettier-using-github-actions](https://www.codewalnut.com/tutorials/how-to-automate-code-formatting-with-prettier-using-github-actions) [cite: 1579] |

### Soporte de Comunicación
* [cite_start]Slack - GitHub [cite: 1583]
* [cite_start]Slack - Prettier [cite: 1584]

---

**Siguiente paso:** ¿Necesitas ayuda para redactar la Guía de Instalación del Entorno Local para el proyecto (Laravel y Microservicio)?

