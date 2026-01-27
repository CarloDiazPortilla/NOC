# NOC
Network Operations Center App for monitoring that implements Clean Architecture

## Running in development mode
1. Rename .env.example to .env
2. Configure environment variables
3. Run the following command to install required dependencies
```
npm install
```
4. Run the following command to set up MongoDB and PostgreSQL with Docker
```
docker compose up -d
```
5. Run migrations and generate prisma client
```
npx prisma migrate deploy
npx prisma generate
```
6. Run the following command to run the application
```
npm run dev
```