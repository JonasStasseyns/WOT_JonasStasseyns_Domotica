var firebaseConfig = {
    apiKey: "AIzaSyBFxCC7ALGXsA4WAaKbvx9MDxOmWVFDiC0",
    authDomain: "chargen-13eae.firebaseapp.com",
    databaseURL: "https://chargen-13eae.firebaseio.com",
    projectId: "chargen-13eae",
    storageBucket: "chargen-13eae.appspot.com",
    messagingSenderId: "453800657527",
    appId: "1:453800657527:web:48acbb4ffe8568f0f0bc72"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const wrapper = document.querySelector('.wrapper');

db.collection("devices").get().then((devices) => {
    devices.forEach((doc) => {
        const button = document.createElement('button')
        button.classList.add('btn')
        button.id = doc.id
        wrapper.appendChild(button)
    });
});






const btnList = document.querySelectorAll('.btn')

btnList.forEach((btn) => {
    btn.addEventListener('click', (evt) => {
        db.collection("devices").doc(btn.id).update({
            status: false
        })
            .then(function() {
                console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
    })
})