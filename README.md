## React forms

This project demonstrates a React application with two forms for user data collection, featuring comprehensive validation, data management using Redux, and image handling.

Features:

Multiple Routes: 
  * Main route displays collected data.
  * Two separate routes for form submissions.

Data Collection and Management:
  * Redux is used to store and manage form data from both forms.
  * After form submission, the user is redirected to the main route.

Form Validation:
  * Yup library is used for validation in both forms.
  * Error messages are displayed to guide users.
  * Submit button is disabled until all required fields are filled and validation criteria are met.

 Form Fields:
  * Both forms include fields for:
    * Name
    * Age
    * Email
    * Gender selection
    * Terms and conditions acceptance checkbox
  * Input for image upload.

Image Handling:
  * Image is saved as base64 encoded data.
  * The uploaded image is displayed on the main route after redirection.

Password Handling:
  * Both forms include password fields with password strength indication.

Autocomplete Feature:
  * Autocomplete functionality is implemented in both forms to enhance user experience.

Technical Details:

1. Framework: React
2. State Management: Redux
3. Validation Library: Yup
4. Image Handling: Base64 encoding

This project showcases a robust approach to form validation in a React application.


## Getting Started
1. Clone the repository
```bash
  https://github.com/Deolys/react-forms.git
```
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```
