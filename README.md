# Invoice Generator Application (in PDF and snapshot)

This application allows users to generate PDFs, create snapshots of those PDFs, and download the generated files. It provides a RESTful API to interact with the PDF generation and management functionalities.

## Features

- Generate PDFs based on user input.
- Create image snapshots of generated PDFs.
- List all generated PDFs for a user.
- Download individual PDFs and their corresponding snapshots.

## Technologies Used

- Node.js
- Express.js
- Puppeteer (for PDF snapshot creation)
- MongoDB (for storing user and PDF data)
- JWT (for user authentication)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running instance)
- npm or yarn

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/parmodgarg92/invoice-generator.git
   cd pdf-snapshot-app

   After clone this repository visit the root directory of the folder and run the npm install command.

2. Env Sample
    MONGO_URI=
    PORT=
    JWT_SECRET=

## API Endpoints

1. Register User
    - Endpoint: `POST /api/users/register`
    - Description: It will register the user based on the user input.
    - Request Body: {
                        "name": "Sample PDF",
                        "email": "invoice!@gmail.com",
                        "password":"sdff",
                    }

2. Login User
    - Endpoint: `POST /api/users/login`
    - Description: It will kogin the user based on the user input and in response gives the token.
    - Request Body: {
                        "name": "Sample PDF",
                        "email": "invoice!@gmail.com",
                    }

3. Generate Invoice
    - Endpoint: `POST /api/invoices/create`
    - Description: It will create the invoice of authenticated user and send the pdf in response.
    - Request Body: {
                    "products": [
                    { "name": "Product A", "qty": 2, "rate": 100 },
                    { "name": "Product B", "qty": 1, "rate": 200 }
                    // Add more products as needed
                ]}

4. View Invoice
    - Endpoint: `GET /api/invoices/view`
    - Description: It will fetch all the invoice of authenticated user and option to download the pdf through link in response.
    - Request Body: {}
