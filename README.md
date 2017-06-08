# node-tone-analyzer-example
🤖 Analyze emotion of a specified twitter user, using the IBM's Tone Analyzer API

### Usage:
* Install package dependencies: `npm install`
* You must supply credentials in `cred.js` for both Watson and Twitter APIs in order to use this application.
* Run application by running `npm start <twitter-handle>`

### Output:
Prompt: `npm start realdonaldtrump`
```
Tweet:
 Getting ready to leave for Cincinnati, in the GREAT STATE of OHIO, to meet with ObamaCare victims and talk Healthcare & also Infrastructure!

Anger:  9.37%
Disgust:  10.42%
Fear:  6.40%
Joy:  44.74%
Sadness:  30.01%
```
