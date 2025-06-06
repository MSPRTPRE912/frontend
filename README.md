# Frontend

Frontend app of the project

## Environment variables

Available variables are :

| Variable | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `API_URL` | `string` | **Required**. API URL of OpenFaas |
| `APP_PORT` | `number` | **Required**. Frontend app port |

## Build image

```bash
docker build .
```