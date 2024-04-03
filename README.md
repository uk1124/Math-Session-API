# Math Session API

This is a simple REST API for managing mathematical sessions and equations.

## Prerequisites

- Node.js installed on your machine
- npm (Node Package Manager)

## Setup

1. Clone the repository: git clone <repository_url>

2. Install dependencies: npm install

3. Start the server: npm start

## API Endpoints

### 1. Create Session

- **Endpoint:** `POST /api/v1/create-session`
- **Description:** Creates a new session and returns a session ID.
- **How to Test:**
  - Send a POST request to the endpoint using an HTTP client like Postman or cURL.
  - **Example:**
    ```
    $response = Invoke-WebRequest -Method POST -Uri "http://localhost:3000/api/v1/create-session"
    $response.Content
    ```

### 2. Upload File with Equations

- **Endpoint:** `POST /api/v1/upload-file/<session_id>`
- **Description:** Uploads a file containing mathematical equations to a session and calculates the sum of all equations.
- **How to Test:**
  - Obtain a session ID by creating a session (point 1).
  - Send a POST request to the endpoint with the session ID and equation data in the request body.
  - **Example:**
    ```
    $SESSION_ID = "<session_id>"  # Replace with the actual session ID
    $body = @{ "equation" = "2 + 7 * 3" } | ConvertTo-Json
    $response = Invoke-WebRequest -Method POST -Uri "http://localhost:3000/api/v1/upload-file/$SESSION_ID" -ContentType "application/json" -Body $body
    $response.Content
    ```

### 3. Delete Session

- **Endpoint:** `DELETE /api/v1/session/<session_id>`
- **Description:** Deletes a session and all associated files.
- **How to Test:**
  - Obtain a session ID by creating a session (point 1).
  - Send a DELETE request to the endpoint with the session ID.
  - **Example:**
    ```
    $response = Invoke-WebRequest -Method DELETE -Uri "http://localhost:3000/api/v1/session/$SESSION_ID"
    $response.Content
    ```

### 4. Delete File from Session

- **Endpoint:** `DELETE /api/v1/session/<session_id>/delete-file/<file_index>`
- **Description:** Deletes a specific file from a session and recalculates the sum of equations.
- **How to Test:**
  - Obtain a session ID by creating a session (point 1).
  - Upload files with equations to the session (point 2).
  - Send a DELETE request to the endpoint with the session ID and the index of the file to delete.
  - **Example:**
    ```
    $file_index = "<file_index>"  # Replace with the index of the file to delete
    $response = Invoke-WebRequest -Method DELETE -Uri "http://localhost:3000/api/v1/session/$SESSION_ID/delete-file/$file_index"
    $response.Content
    ```

## Notes

- The API stores data in memory, so all sessions and files will be lost when the server is stopped or restarted.
