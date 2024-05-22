# Bad Bank MIT xPro

This project is a part of the MIT xPro Professional Certificate in Coding: Full Stack Development with MERN. It is a web application called "Bad Bank" that simulates basic banking functionalities such as account creation, login, deposit, withdrawal, and transaction history viewing.

## Live Demo

Check out the live version of the app here: [Bad Bank App](https://sean-mongey-bad-bank.s3.us-east-2.amazonaws.com/index.html#/)

## Features

### 1. Account Creation
- Users can create a new account by providing their name, email, and password.
- Input fields are validated to ensure correct data entry.

### 2. Login
- Existing users can log in with their email and password.
- Authentication ensures secure access to user accounts.

### 3. Deposit
- Logged-in users can deposit money into their accounts.
- Real-time balance updates are displayed upon successful deposits.

### 4. Withdrawal
- Users can withdraw money from their accounts, provided they have sufficient balance.
- Withdrawal transactions are recorded in the user's transaction history.

### 5. Transaction History
- Users can view their transaction history, including deposits and withdrawals.
- Transactions are displayed with timestamps and categorized by type.

## Technologies Used

- **Frontend**: React.js, React Router, React Bootstrap
- **Backend**: Node.js (not included in this project)
- **Routing**: React Router DOM for client-side routing
- **State Management**: React Context API for managing user data and authentication
- **Styling**: Bootstrap CSS for styling components
- **Date Handling**: JavaScript Date objects for timestamping transactions

## Prerequisites

1. **Node.js and npm**: Make sure Node.js and npm are installed on your machine. You can download and install them from [nodejs.org](https://nodejs.org/).
2. **AWS Account**: Sign up for an AWS account at [aws.amazon.com](https://aws.amazon.com/).
3. **AWS CLI**: Install the AWS Command Line Interface (CLI). Follow the instructions [here](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html).

## Setup Instructions

1. Clone the repository to your local machine.
2. Install dependencies using `npm install`.
3. Run the application using `npm start`.
4. Access the application in your web browser at `http://localhost:3000`.

## Uploading bad-bank App to Amazon S3

This guide will walk you through the process of uploading your bad-bank app to an Amazon S3 bucket.

### Steps

1. **Create an S3 Bucket**

   - Sign in to the [AWS Management Console](https://aws.amazon.com/console/).
   - Navigate to the **S3** service.
   - Click on **Create bucket**.
   - Enter a unique bucket name (e.g., `bad-bank-app-bucket`).
   - Choose the AWS Region closest to your users.
   - Keep the default settings or configure them as per your requirements.
   - Click on **Create bucket**.

2. **Configure the Bucket for Static Website Hosting**

   - Go to the bucket you just created.
   - Click on the **Properties** tab.
   - Scroll down to the **Static website hosting** section.
   - Choose **Enable**.
   - For the **Index document**, enter `index.html`.
   - For the **Error document**, enter `error.html` (if you have one).
   - Note the **Bucket website endpoint** URL; this will be the URL for your app.
   - Click **Save changes**.

3. **Set Bucket Permissions**

   - Click on the **Permissions** tab of your bucket.
   - In the **Bucket Policy** section, click on **Edit**.
   - Add the following bucket policy to allow public read access to your bucket:
     ```json
     {
       "Version": "2012-10-17",
       "Statement": [
         {
           "Effect": "Allow",
           "Principal": "*",
           "Action": "s3:GetObject",
           "Resource": "arn:aws:s3:::bad-bank-app-bucket/*"
         }
       ]
     }
     ```
   - Replace `bad-bank-app-bucket` with your bucket name.
   - Click **Save changes**.

4. **Install AWS CLI and Configure It**

   - Open your terminal or command prompt.
   - Run the following command to configure the AWS CLI with your credentials:
     ```sh
     aws configure
     ```
   - Enter your AWS Access Key ID, Secret Access Key, default region name, and default output format (e.g., `json`) when prompted.

5. **Upload Your App to S3**

   - Navigate to the directory containing your bad-bank app files.
   - Run the following command to sync your local files to the S3 bucket:
     ```sh
     aws s3 sync . s3://bad-bank-app-bucket/
     ```
   - Replace `bad-bank-app-bucket` with your bucket name.

6. **Access Your App**

   - Open a web browser.
   - Navigate to the **Bucket website endpoint** URL you noted earlier.
   - Your bad-bank app should now be live and accessible.

### Example

```sh
aws s3 sync . s3://bad-bank-app-bucket/

### Notes

- Ensure all your files, especially `index.html`, are correctly uploaded to the S3 bucket.
- If you make updates to your app, re-run the `aws s3 sync` command to upload the latest changes.

## Contributors

- Sean Mongey

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
