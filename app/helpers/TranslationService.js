import awsTranslateConfig from '../config/aws-translate';
const aws = require('aws-sdk');

aws.config.region = 'us-east-1';
aws.config.credentials = new aws.Credentials(awsTranslateConfig);

var translate = new aws.Translate({region: aws.config.region});

const TranslationService = (msg, destLang) => {
  const params = {
    Text: msg,
    SourceLanguageCode: 'auto',
    TargetLanguageCode: destLang,
  };

  return new Promise(resolve => {
    translate.translateText(params, function(err, data) {
      if (err) {
        console.log(err, err.stack);
        alert('Error calling Amazon Translate. ' + err.message);
        return;
      }
      if (data) {
        resolve(data.TranslatedText);
      }
    });
  }).then(function(result) {
    return result;
  });
};

export default TranslationService;
