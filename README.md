# Food Ordering Web Application

## Overview

This project is a food ordering web application developed for a local restaurant, built using Next.js to ensure SEO optimization through Server-Side Rendering (SSR). The application integrates Amazon S3 for storage and Stripe for payment processing, providing a seamless, secure, and efficient online ordering experience for customers.

## Features

- **SEO Optimization**: Utilizes Next.js's SSR capabilities to improve search engine visibility.
- **Fast and Efficient**: Optimized content delivery and performance using Next.js's data fetching methods.
- **Secure Payments**: Integrated with Stripe for secure and reliable payment processing.
- **Storage Management**: Uses Amazon S3 for efficient storage and retrieval of resources.

## Technologies Used

- **Front-End**: Next.js, React, HTML, CSS
- **Back-End**: Node.js, Express.js
- **Data Fetching**: getStaticProps, getServerSideProps
- **Storage**: Amazon S3
- **Payment Processing**: Stripe
- **Version Control**: Git & GitHub

## Getting Started

### Prerequisites

- Node.js
- npm (or yarn)
- Stripe Account
- AWS Account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/food-ordering-app.git
   cd food-ordering-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root of your project and add the following:
   ```env
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   AWS_ACCESS_KEY_ID=your_aws_access_key_id
   AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
   S3_BUCKET_NAME=your_s3_bucket_name
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

- **Home Page**: Displays the restaurant's menu with options to add items to the cart.
- **Cart**: Shows selected items and total price, with an option to proceed to checkout.
- **Checkout**: Integrates Stripe for payment processing and Amazon S3 for storing order details.

## Project Structure

- **pages/**: Contains all the Next.js pages.
- **components/**: Contains React components used across pages.
- **lib/**: Utility functions and configurations.
- **public/**: Static files.
- **styles/**: CSS files.

## Data Fetching

- **getStaticProps**: Used for pre-rendering pages at build time.
- **getServerSideProps**: Used for fetching data at request time, ensuring up-to-date content.

## Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

3. Deploy to your preferred hosting service (e.g., Vercel, AWS).
