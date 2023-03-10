class Post {
  constructor (photoLink, caption, comments, likes ) {
    this.photoLink = photoLink;
    this.caption = caption;
    this.comments = comments;
    this.likes = likes;
  }
}

class Application {

    constructor(){

        this.posts = [];

        // Initialize the FirebaseUI Widget using Firebase.
        this.$application = document.querySelector("#application");
        this.$firebaseAuthContainer = document.querySelector("#firebaseui-auth-container");
        this.ui = new firebaseui.auth.AuthUI(firebase.auth());

        this.$logoutButton = document.querySelector("#logoutButton");
        this.$uploadButton = document.querySelector("#uploadButton");
        this.$createAPost = document.querySelector("#create-a-post");
        this.$exitCreateAPost = document.querySelector("#exit-create-a-post");
        this.$createAPost.style.display = "none";


        this.addEventListeners();
        this.handleAuth();

    }

        handleAuth (){
            
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                  // User is signed in, see docs for a list of available properties
                  // https://firebase.google.com/docs/reference/js/firebase.User
                  var uid = user.uid;
                  this.redirectToApp();
                  // ...
                } else {
                  // User is signed out
                  this.redirectToAuth();
                }
              });
        }

        redirectToAuth (){
            this.$application.style.display = "none";
            this.$firebaseAuthContainer.style.display = "block";

            this.ui.start('#firebaseui-auth-container', {
                callbacks: {
                    signInSuccessWithAuthResult: (authResult, redirectUrl) => {
                      // User successfully signed in.
                      // Return type determines whether we continue the redirect automatically
                      // or whether we leave that to developer to handle.
                      this.userId = authResult.user.uid;
                      this.redirectToApp();
                      this.$authUserText.innerHTML = user.displayName;
                      // var uid = user.uid;
                    },
                  },
                signInOptions: [
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                ],
                // Other config options...
            });
        }

        redirectToApp() {
            this.$application.style.display = "block";
            this.$firebaseAuthContainer.style.display = "none";
        }

        handleLogout () {
            firebase.auth().signOut().then(() => {
                alert("You've been logged out successfully.")
                this.redirectToAuth();
              }).catch((error) => {
                alert("Apologies, an error occured. Error report sent.");
                console.log(error);
              });
        }


        handleUpload () {
          this.$createAPost.style.display = "block";
          this.$application.style.display = "none";
        }

        handleExitUpload (){
          this.$createAPost.style.display = "none";
          this.$application.style.display = "block";
        }


        addEventListeners(){

            this.$logoutButton.addEventListener("click", (event) => {
                this.handleLogout();
            })

            this.$uploadButton.addEventListener("click", (event) => {
              this.handleUpload();
            })

            this.$exitCreateAPost.addEventListener("click", (event) => {
              this.handleExitUpload();
            })
    }

    addPost (id, {photo, caption, likes = 0, comments = []}) {
      if(photo != ""){
        const newPost = {id: cuid (), photo, caption, likes, comments};
        this.posts = [...this.posts, newPost];
      }
    }

}

const application = new Application();