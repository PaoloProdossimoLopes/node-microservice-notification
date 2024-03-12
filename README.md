# Notifications

This is a Node.js microservice built with NestJS, TypeScript, and Prisma for efficient notification management. It supports creating, reading, unreading, canceling, and listing notifications for users, as well as counting a user's notifications.

## Features

- Create notifications
- Read notifications
- Mark notifications as unread
- Cancel notification sending
- List a user's notifications
- Count a user's notifications

## Installation

1. Clone the repository:

```bash
git clone https://your-repository-url.git
cd node-microservice-notification
```

2. Install dependencies:

```bash
npm install
```

3. Set up your environment variables:

Copy the `.env.example` file to a new file named `.env` and fill in your database and other environment settings.

4. Run the Prisma migrations:

```bash
npx prisma migrate dev
```

## Usage

To start the server in development mode, run:

```bash
npm run start:dev
```

For production mode, first build the project:

```bash
npm run build
```

Then start the server:

```bash
npm run start:prod
```

## Testing

To run the tests:

```bash
npm test
```

## API Endpoints

The service defines the following API endpoints:

- POST `/notifications` - Create a new notification
- GET `/notifications/:userId` - List all notifications for a user
- PATCH `/notifications/:id/read` - Mark a notification as read
- PATCH `/notifications/:id/unread` - Mark a notification as unread
- DELETE `/notifications/:id` - Cancel a notification

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is unlicensed and free for use.
