const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const Twit = require('twit');
const cred = require('./cred');
const Entities = require('html-entities').AllHtmlEntities;

const entities = new Entities();

const tone_analyzer = new ToneAnalyzerV3({
  username: cred.watson.user,
  password: cred.watson.pass,
  version_date: cred.watson.version
});

const twit = new Twit({
	consumer_key:         cred.tw.ckey,
 	consumer_secret:      cred.tw.csecret,
 	access_token:         cred.tw.atoken,
	access_token_secret:  cred.tw.asecret,
	timeout_ms:           60*1000,
});

if(process.argv.length != 3){
  console.log("Usage: npm start <twitter-handle>");
} else {
  twit.get('/statuses/user_timeline', { screen_name: process.argv[3], count: 1})
  	.catch(function (err) {
      		console.log('Error Trace:', err.stack)
    	})
    	.then(function (result) {
          const tweet = entities.decode(result.data[0].text);
      		console.log('Tweet: \n', tweet + '\n');
          tone_analyzer.tone(
            {text: tweet, tones: 'emotion'},
            function(err, res) {
              if (err)
                console.log('error:', err);
              else{
                const tone_array = res.document_tone.tone_categories[0].tones;
                tone_array.map((tone) => {
                  let per = tone.score * 100;
                  console.log(tone.tone_name + ": ", per.toFixed(2)+"%");
                });
              }
            }
          );
      })
}
