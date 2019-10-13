const admin = require('./node_modules/firebase-admin')
// Get service account key from Firebase in Settings > Service accounts > Generate new private key
const serviceAccount = require("./serviceAccountKey.json")
const data =  require("./data.js")
const collectionKey = "meetings"; 
admin.initializeApp({  
    credential: admin.credential.cert(serviceAccount),  
    databaseURL: "https://quaker-maps.firebaseio.com"})
const firestore = admin.firestore()
const settings = {timestampsInSnapshots: true}

firestore.settings(settings)


if (data && (typeof data === "object")) {
    Object.keys(data).forEach(docKey => { 
        // Add 'created_at' timestamp to each record being created
        data[docKey].created_at = admin.firestore.Timestamp.fromDate(new Date())        
        firestore
            .collection(collectionKey)
            .add(data[docKey])
            .then((res) => {    
                console.log("Document " + docKey + " successfully written!")
            }).catch((error) => {   
                console.error("Error writing document: ", error)
            })
    })
}