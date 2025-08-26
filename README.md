# Todo App Backend

A simple REST API for managing tasks, built with Express and TypeScript.

## What's Inside

- CRUD operations for tasks
- SQLite database (no setup hassle)
- TypeScript because life's too short for runtime errors
- Basic security and validation

## Getting Started

You'll need Node.js (16+) and npm.

### Setup

Clone this repo and get into it:
```bash
git clone <your-repo-url>
cd todoApp-ExpressJS
```

Install everything:
```bash
npm install
cd backend
npm install
```

Set up your environment:
```bash
cp .env.example .env
```

Your `.env` should look like this:
```env
DATABASE_URL="file:./dev.db"
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3001
```

### Database Setup

Generate the Prisma client first:

```bash
npx prisma generate
```

Then create your database:

```bash
npx prisma migrate dev --name init
```

This creates the SQLite file and sets up your tables. If you want to peek at your data later, run:

```bash
npx prisma studio
```

### Start the Server

```bash
npm run dev
```

Your API will be running at `http://localhost:5000`. Test it:

```bash
curl http://localhost:5000/health
```

Should return something like:

```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-08-25T..."
}
```

## API Routes

| Method | URL          | What it does       |
|--------|-------------|--------------------|
| GET    | `/health`    | Check if it's alive|
| GET    | `/tasks`     | Get all your tasks |
| GET    | `/tasks/:id` | Get one task       |
| POST   | `/tasks`     | Create a new task  |
| PUT    | `/tasks/:id` | Update a task      |
| DELETE | `/tasks/:id` | Delete a task      |

## Task Structure

Each task looks like this:

```typescript
{
  id: string;        // auto-generated
  title: string;     // what you need to do
  color: string;     // hex color (defaults to blue)
  completed: boolean; // done or not
  createdAt: Date;   // when you made it
  updatedAt: Date;   // last time you touched it
}
```

## Useful Commands

Development stuff:

```bash
npm run dev          # Start with auto-reload
npm run build        # Build for production
npm run start        # Run the built version
```

Database stuff:

```bash
npm run prisma:generate  # Regenerate Prisma client
npm run prisma:migrate   # Apply database changes
npm run prisma:studio    # Open database GUI
npm run prisma:reset     # Nuke and rebuild database
```

## How It's Organized

```text
backend/
├── prisma/
│   ├── migrations/      # Database version history
│   └── schema.prisma    # Database structure
├── src/
│   ├── controllers/     # Business logic
│   ├── middleware/      # Request processing
│   ├── routes/          # URL handlers  
│   ├── types/           # TypeScript definitions
│   ├── utils/           # Helper functions
│   └── index.ts         # Main server file
├── .env                 # Your secrets
├── package.json         # Dependencies
└── tsconfig.json        # TypeScript settings
```

## Development Notes

When working on this:

1. Edit files in `src/`
2. Test your changes
3. If you change the database schema, run migrations
4. Regenerate Prisma client if needed

For production, set `NODE_ENV=production` and update your database URL.

## When Things Go Wrong

Database acting up? Try this:

```bash
npm run prisma:reset     # Nuclear option
npm run prisma:generate  # Rebuild client
npm run prisma:migrate   # Apply migrations
```

Port 5000 already taken? Change it in your `.env` file.

TypeScript errors? Make sure everything's installed:

```bash
npm install
```

## Built With

- Node.js and Express
- TypeScript (because JavaScript is scary)
- SQLite via Prisma
- Some security middleware to keep the bad guys out
