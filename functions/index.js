const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   // functions.logger.info('Hello logs!', {structuredData: true});
//   response.send('Hello from Firebase!');
// });

exports.calculate = functions.https.onCall((data, context) => {
  const {num1, num2, operation} = data;
  if (operation == "plus") {
    return num1 + num2;
  } else if (operation == "minus") {
    return num1 - num2;
  } else {
    return num1 * num2;
  }
});
