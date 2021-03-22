const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const express=require('express');
const router=express.Router();
/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(input) {
  // A unique identifier for the given session
  const projectId = 'hostechlocation'
  const sessionId = uuid.v4();

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({
    keyFilename:"././HosTechLocation-ae107026d58c.json"
  });
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: input,
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }
  return result.fulfillmentText
}
router.post('/', (req, res, next)=>{
    runSample(req.body.input).then(data=>{
        res.status(200).json({
            data
        });
    })
    
})


router.post('/main', (req, res, next)=>{
  runSample(req.body.input).then(data=>{
      console.log(data)
      if(data=="askingaboutme"){
          res.status(200).json({
              say:"I'm good, Thanks\n How can I help you ?"
          });
      }
      if(data.split(" ").length==2){
        if(data.split(" ")[0].toLowerCase()=="sugar"){
          if(data.split(" ")[1].toLowerCase()=="high"){
            res.status(200).json({
                say:"That's not good, I can suggest you few things"
            });
          }
          else if(data.split(" ")[1].toLowerCase()=="low"){
            res.status(200).json({
              say:"Go eat something than..."
            });
          }
          else{
            res.status(200).json({
              say:"Go eat something"
            });
          }
        }
      }
  })
  
})


module.exports = router;