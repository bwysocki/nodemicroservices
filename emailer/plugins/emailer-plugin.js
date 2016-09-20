module.exports = function(options) {

  var seneca = this;

  /* Sends an email including the content. */
  seneca.add({area: "email", action: "send"}, function(args, done) {
    var message = {
      "html": args.content,
      "subject": args.subject,
      "to": [{
        "email": args.to,
        "name": args.toName,
        "type": "to"
      }],
      "from_email": "info@micromerce.com",
      "from_name": "Micromerce"
    }
    //simulate send
    console.log(message);
    done(null, message);
  });

};
