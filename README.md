# AmyHotel - Luxury Hotel Booking System

AmyHotel is a modern, premium hotel booking platform designed to provide a seamless and luxurious experience for users. It features a stunning frontend built with Next.js and a robust backend powered by Directus.

## 🚀 Tech Stack

- **Frontend:** [Next.js 14+](https://nextjs.org/) (App Router), TypeScript, Tailwind CSS, Framer Motion.
- **Backend:** [Directus](https://directus.io/) (Headless CMS & BaaS).
- **Database:** PostgreSQL.
- **Containerization:** Docker & Docker Compose.

## 🛠️ Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Docker](https://www.docker.com/) & Docker Compose

## 🏁 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/amy-hotel.git
cd amy-hotel
```

### 2. Setup Backend (Directus)

The backend is containerized using Docker.

```bash
# Start Directus and PostgreSQL
docker-compose up -d
```

- **Directus Admin:** `http://localhost:8055`
- **Email:** `admin@example.com`
- **Password:** `adminpassword`

### 3. Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local
# Update .env.local with your Directus URL and Token if needed

# Run development server
npm run dev
```

- **Frontend:** `http://localhost:3000`

## 📂 Project Structure

- `/frontend`: Next.js application source code.
- `/directus`: Directus configuration and extensions.
- `docker-compose.yml`: Docker services configuration.

## 📦 Deployment

### Frontend (Vercel)

Connect your GitHub repository to Vercel for automatic deployments.

### Backend (Render/Railway/VPS)

Deploy the `docker-compose.yml` or the Directus Docker image to your preferred hosting provider.

## 📄 License

This project is licensed under the MIT License.
