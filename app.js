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
const tempContainer = document.querySelector('.temp-data');
const humContainer = document.querySelector('.hum-data');

loadControlPanel = () => {
    db.collection("devices").get().then((devices) => {
        wrapper.innerHTML = ''
        devices.forEach((doc) => {
            const button = document.createElement('button')
            const statusIcon = document.createElement('div')
            statusIcon.classList.add((doc.data().status) ? 'on' : 'off')
            button.classList.add('btn')
            button.id = doc.id
            button.innerHTML = '<h3 class="device-name">' + doc.data().device_name + '</h3>'
            button.appendChild(statusIcon)
            button.addEventListener('click', (evt) => {
                console.log(doc.data().status)
                console.log(!doc.data().status)
                db.collection("devices").doc(doc.id).update({
                    status: !doc.data().status
                })
                    .then(function () {
                        console.log("Document successfully written!");
                        loadControlPanel()
                        loadConditions()
                    })
                    .catch(function (error) {
                        console.error("Error writing document: ", error);
                        loadControlPanel()
                        loadConditions()
                    });
            })
            wrapper.appendChild(button)
        });
    });
}

loadConditions = () => {
    db.collection('conditions').doc('conditions').get().then((doc) => {
        console.log(doc.data())
        const data = doc.data()
        tempContainer.innerHTML = Math.round(data.temperature)
        humContainer.innerHTML = Math.round(data.humidity)
    });
}

document.querySelector('.alert').addEventListener('click', () => {
    db.collection('devices').get().then((docs) => {
        docs.forEach((doc) => {
            console.log(doc.id)
            db.collection('devices').doc(doc.id).update({ status: !doc.data().status })
        })
    });
})

loadControlPanel()
loadConditions()