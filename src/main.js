
const LABEL_TO_MAIL = "recruiterstomail"
const LABEL_MAILED = "recruitersmailed"

/**
* @param {string} sender
*/
const extractSenderName = (sender) => {
  const parts = sender.split("<")
  if(parts.length > 1) {
    return parts[0].trim()
  } else {
    const emailRegex = /[\w\.-]+@[\w\.-]+\.\w+/; // Regular expression for matching email addresses
    const extractedEmail = sender.match(emailRegex)[0]; // Extract the email address using regex match
    return extractedEmail
  }
}

/**
* @param {GmailApp.GmailThread} t
*/
const createReply = (t) => {
  const sender = t.getMessages()[0].getFrom()
  const senderName = extractSenderName(sender)

  const emailResponse = `
Hej ${senderName},

Tack för ditt meddelande och för att du visar intresse för mina kompetenser. För närvarande är jag nöjd med min nuvarande arbetssituation och är inte intresserad av att utforska nya möjligheter.

När det gäller hur ni fick tag på min e-postadress, skulle jag vilja veta mer om det. Kan du berätta mer om hur ni hittade mig och min e-postadress? Jag är alltid försiktig med min personliga information och vill säkerställa att mina uppgifter hanteras på ett ansvarsfullt sätt.

Med vänliga hälsningar,
Johan
`;

  t.createDraftReply(emailResponse)
  t.addLabel(GmailApp.getUserLabelByName(LABEL_MAILED))
  t.removeLabel(GmailApp.getUserLabelByName(LABEL_TO_MAIL))
  Logger.log("Replied to:" + senderName + " with subject: " + t.getFirstMessageSubject());
}

function main() {
  const label = GmailApp.getUserLabelByName(LABEL_TO_MAIL);
  const threads = label.getThreads();
  for (const t of threads) {
    createReply(t)
  }
}


