function login() {

    var userEmail = document.getElementById("email_field").value;
    var userPassword = document.getElementById("password_field").value;


    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).then((userCredential) => {
            // Signed in
            window.alert("Signing in...");
            //setTimeout(function(){ alert("Signing in..."); }, 3000);
            var user = userCredential.user;
            // ...
            window.location = 'landingpage.html';
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert("Error1: " + errorMessage);
        });

}

function landing() {
    window.location = 'landingpage.html';
}
function home() {
    window.location = 'index.html';
}

function sign_up_page() {
    window.location = 'signup.html';
}
function upload_page() {
    window.location = 'tester.html';
}

function signUpWithEmailPassword() {

    var signup_email = document.getElementById("signup_email").value;
    var signup_password = document.getElementById("signup_password").value;

    // [START auth_signup_password]
    firebase.auth().createUserWithEmailAndPassword(signup_email, signup_password)
        .then((userCredential) => {
            // Signed in 
            window.alert("Signing in...")
            var user = userCredential.user;
            window.location = 'landingpage.html';
            //document.getElementById("divemailMe").innerHTML = firebase.auth().currentUser;
        //document.getElementById("emailMe").innerHTML = firebase.auth().currentUser;
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
            window.alert("Error69: " + errorMessage)
        });
    // [END auth_signup_password]
}

function byebye() {

    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.alert("LOGOUT SUCCESFUL")
        window.location = 'index.html';
    }).catch((error) => {
        // An error happened.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error2: " + errorMessage)

    });


}



function createFolder(varspecial) {

    // Create a storage ref to find file again
    //var uploadFolder = firebase.storage.child('images')
    var storageRef = firebase.storage().ref("varspecial");

    window.alert("Your Folder has been Created (createFolder function runs)");

}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        var user = firebase.auth().currentUser;
        document.getElementById("divemailMe").innerHTML = user.uid;
        //document.getElementById("emailMe").innerHTML = user.uid;
        
        
        //createFolder(user);

    } else {
        // User is signed out
        // ...
        console.log("User logged out")
        //document.getElementById("user_div").style.display = "none";
        //document.getElementById("login_div").style.display = "block";
    }
});


function displayVisionBoard() {
  //document.getElementById('testry').empty;
  $( ".testryclass" ).empty();
  var listvariable = document.getElementById('testry');
  //var identity = document.getElementById('divemailMe').value;
  var identity = firebase.auth().currentUser.uid;
  var selectedfoler = folder_options.innerHTML; 
  console.log("identity is "+ identity.toString());
  var listRef = storageRef.child('/images/' + identity + '/' + selectedfolder + '/');
  console.log ("storageRef.child or listRef is : " + listRef.toString());
        
        //$('#testry').html('');
  var i = 0;
    
  listRef.listAll().then(function(result) {
      result.items.forEach(function(imageRef){
        console.log("Image reference: " + imageRef.toString());

        i++;
        displayImage(i, imageRef, listvariable);
      });
  });


}//end display vision board
function displayImage(row, images, location){
  images.getDownloadURL().then(function(url) {
    console.log(url);
    
    let new_html = '';
    //you dont need these breaks, it just makes everything have the weird stair effect
    //new_html += '<br>';
    new_html += '<img src="' + url + '"height = "300px" style="float: center">';
    //new_html += '<br>';
    location.innerHTML += new_html;
  })
}
/*
function uploadRef() {
    // [START storage_upload_ref]
    // Create a root reference
    var storageRef = firebase.storage().ref();

    // Create a reference to 'mountains.jpg'
    var mountainsRef = storageRef.child('mountains.jpg');

    // Create a reference to 'images/mountains.jpg'
    var mountainImagesRef = storageRef.child('images/mountains.jpg');

    // While the file names are the same, the references point to different files
    mountainsRef.name === mountainImagesRef.name; // true
    mountainsRef.fullPath === mountainImagesRef.fullPath; // false 
    // [END storage_upload_ref]
}



function uploadHandleError(file) {
    const storageRef = firebase.storage().ref();

    // [START storage_upload_handle_error]
    // Create the file metadata
    var metadata = {
        contentType: 'image/jpeg'
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            } 
        },
        (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;

                    // ...

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        },
        () => {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
            });
        }
    );
    // [END storage_upload_handle_error]
}
*/
