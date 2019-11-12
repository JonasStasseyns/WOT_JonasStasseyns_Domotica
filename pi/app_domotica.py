from time import sleep
from sense_hat import SenseHat
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

blue = [0, 0, 255]
darkBlue = [0, 0, 50]
yellow = [255, 255, 0]
darkYellow = [50, 50, 0]
green = [0, 255, 0]
red = [255, 0, 0]

# Use a service account
cred = credentials.Certificate('keys.json')
firebase_admin.initialize_app(cred)

db = firestore.client()
sense = SenseHat()


onColors = {'light': yellow, 'door': green, 'outlet': blue}
offColors = {'light': darkYellow, 'door': red, 'outlet': darkBlue}


def on_snapshot(doc_snapshot, changes, read_time):
    sense.clear()
    docs = db.collection(u'devices').stream()
    for doc in docs:
        dd = doc.to_dict()
        print(dd)
        if dd['status']:
            color = onColors[dd['device_type']]
        else:
            color = offColors[dd['device_type']]
        sense.set_pixel(dd['coords'][0], dd['coords'][1], color)

    data = {
        'humidity': sense.get_humidity(),
        'temperature': sense.get_temperature()
    }

    db.collection('conditions').document('conditions').set(data)


doc_ref = db.collection('devices')
doc_watch = doc_ref.on_snapshot(on_snapshot)

while True:
    sleep(1)
    print('Firestore listener running...')
