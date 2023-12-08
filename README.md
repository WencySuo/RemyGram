# RemyGram

## Getting Started

To run RemyGram, follow these steps:

1. Clone the repository from GitHub or open the zip file submitted to Gradescope:
   - GitHub Repository: [RemyGram](https://github.com/WencySuo/RemyGram)

2. Navigate to the project's root folder using the terminal:
   ```bash
   cd path/to/RemyGram
   ```

## Install dependencies, including npm 10.1.0 and node 20.9.0
```bash
npm install
npm install -g npm@10.1.0
nvm install 20.9.0
```
## Run the application: 
```bash
npm run start
```
This command will start the application, allowing you to interact with RemyGram on your local device. 

Alternatively, you can visit our live website at remygram.web.app.

## Deployment Steps (Firebase)
If you want to deploy RemyGram:

Create a project on Firebase.
Name it (e.g., 'RemyGramClone').
Follow the setup steps for RemyGramClone.
Authentication Setup:
Enable Google authentication.
Set your email for support.
Firestore Database Setup:
Create a Firestore database in the 'nam5 US' region.
Begin in test mode.
Create collections for 'users,' 'posts,' and 'comments.'
Web App Setup:
Click on 'Project Overview.'
Click on 'web' and give your app a nickname.
Set up Firebase for the app.
Copy and paste the firebaseConfig into firebase.js.
Hosting Setup:
Click on 'Hosting' and get started.
Follow the instructions to download Firebase tools.
Log in to Firebase.
Run firebase init and select 'Hosting: Configure for Firebase Hosting.'
Optionally, set up GitHub Action deploys and Hosting settings.
Update both .firebaserc files to change the default to your app name (e.g., remygramclone).
Deploy the app:
```bash
npm run build
firebase deploy
```
## Have fun deploying and using RemyGram!