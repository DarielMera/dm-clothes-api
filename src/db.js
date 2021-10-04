const admin = require('firebase-admin')
const creds = require('../credentials.json')

// we will create a function to check and see if we are connected to the db if not create it . we will export this function
// is a lot easier to export saying the following , this is the declarative way of designing a function with arrow , we will see this frequently 
// in firebae we check for the database a little different
// the property apps will tell us how may dabatases we connected to if > than 0 then we are connected otherwise we are not connectd
// weahter we are connected or not we return firestoe
exports.connectDb = () => {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(creds)
        })
    }
    return admin.firestore()
}