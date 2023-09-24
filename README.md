# Asset Management API - ClipUp Challenge (CUC)

A Node.js Express TypeScript TypeORM project for managing assets with CRUD operations.

## Features

- **Create:** Create a new asset with specified details.
- **Read:** Retrieve assets including all assets or a specific asset by UUID.
- **Update:** Update an existing asset with new information.
- **Delete:** Delete an asset by its UUID.

## Prerequisites

- Node.js and npm installed
- PostgreSQL database running in Docker

## Installation
* `npm install`
* copy `.env.sample` to `.env`
* start db with `docker-compose up -d`
* initialize schema with `npm run migration:run` 
* `npm run start` 

## Usage

- Access the API at `http://0.0.0.0:3001/api/assets`
- Swagger documentation available at `http://0.0.0.0:3001/swagger`

### API Endpoints

- `GET /api/assets` - Get all assets.
- `GET /api/assets/:uuid` - Get an asset by UUID.
- `POST /api/assets` - Create a new asset.
- `PUT /api/assets/:uuid` - Update an asset by UUID.
- `DELETE /api/assets/:uuid` - Delete an asset by UUID.

## Testing

Run unit tests using:
```bash
npm run test:unit
```

## Error Handling

- Application errors are handled with appropriate error messages.
- Client errors are also validated, with proper validation messages.

## Linting and Commit Hooks

This project uses ESLint for linting and Husky + lint-staged for pre-commit hooks to ensure code quality and style consistency.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
