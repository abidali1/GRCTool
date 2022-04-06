const Mailgun = require('mailgun-js');

const template = require('../config/template');
const keys = require('../config/keys');

const { key, domain, sender } = keys.mailgun;

class MailgunService {
  init() {
    try {
      return new Mailgun({
        apiKey: key,
        domain: domain
      });
    } catch (error) {
      console.warn('Missing mailgun keys');
    }
  }
}

const mailgun = new MailgunService().init();

exports.sendEmail = async (email, type, host, data) => {
  try {
    const message = prepareTemplate(type, host, data);

    const config = {
      from: `GRC Tool! <${sender}>`,
      to: email,
      subject: message.subject,
      text: message.text
    };

    return await mailgun.messages().send(config);
  } catch (error) {
    return error;
  }
};

const prepareTemplate = (type, host, data) => {
  let message;

  switch (type) {
    case 'reset':
      message = template.resetEmail(host, data);
      break;

    case 'reset-confirmation':
      message = template.confirmResetPasswordEmail();
      break;

    case 'signup':
      message = template.signupEmail(data);
      break;

    case 'client-signup':
      message = template.clientSignup(host, data);
      break;

    case 'client-welcome':
      message = template.clientWelcome(data);
      break;
    case 'regulator-signup':
        message = template.regulatorSignUp(host, data);
        break;
  
    case 'regulator-welcome':
        message = template.regulatorWelcome(data);
        break;
    case 'implementer-signup':
          message = template.implementerSignUp(host, data);
          break;
    
    case 'implementerr-welcome':
          message = template.implementerWelcome(data);
          break;
    case 'newsletter-subscription':
      message = template.newsletterSubscriptionEmail();
      break;

    case 'contact':
      message = template.contactEmail();
      break;

    case 'client-application':
      message = template.clientApplicationEmail();
      break;
      case 'regulator-application':
        message = template.regulatorApplicationEmail();
        break;
        case 'implementer-application':
          message = template.implementerApplicationEmail();
          break;
    case 'order-confirmation':
      message = template.orderConfirmationEmail(data);
      break;

    default:
      message = '';
  }

  return message;
};
