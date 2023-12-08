# RemyGram

## Accessing RemyGram
1. Navigate to [remygram.web.app.](remygram.web.app.)
2. Enjoy!


## I want to run my own RemyGram!

To run RemyGram, follow these steps:

1. Clone the repository from GitHub or open the zip file submitted to Gradescope:
   - GitHub Repository: [RemyGram](https://github.com/WencySuo/RemyGram)

2. Navigate to the project's `basic` folder using the terminal:
   ```bash
   cd basic
   ```

### Install dependencies, including npm 10.1.0 and node 20.9.0:
```bash
npm install
npm install -g npm@10.1.0
nvm install 20.9.0
```
### Run the application: 
```bash
npm run start
```
This command will start the application, allowing you to interact with RemyGram on your local device. 

## I want to go live!
If you want to deploy RemyGram:

1. Create a project on [Firebase](console.firebase.google.com) and name it (e.g., 'RemyGramClone').

2. Follow the setup steps for RemyGramClone.

3. Authentication Setup:
   - Enable Google authentication.
   - Set your email for support.

4. Firestore Database Setup:
   - Create a Firestore database in the 'nam5 US' region.
   - Begin in test mode.
   - Create collections for 'users,' 'posts,' and 'comments.'

5. Web App Setup:
   - Click on 'Project Overview.'
   - Click on 'web' and give your app a nickname.
   - Set up Firebase for the app.
   - Copy and paste the firebaseConfig into firebase.js.

6. Hosting Setup:
   - Click on 'Hosting' and get started.
   - Follow the instructions to download Firebase tools.
   - Log in to Firebase.
   - Run firebase init and select 'Hosting: Configure for Firebase Hosting.'
   - Optionally, set up GitHub Action deploys and Hosting settings.
   - Update both .firebaserc files to change the default to your app name (e.g., remygramclone).

7. Deploy the app:
   ```bash
   npm run build
   firebase deploy
   ```
## Have fun deploying and using RemyGram!