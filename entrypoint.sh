sed -i "s|__API_URL__|${API_URL}|g" src/environments/environment.ts

ng serve --host 0.0.0.0 --port ${APP_PORT}