export const validateForm = ({email, terms}) => {
  let message = "Form is valid";
  let valid = true;

  if(email.length > 0) {
    if(!email.includes("@") || !email.includes(".")) {
      message = "Please provide a valid e-mail address";
      valid = false;
    }

    if(email.includes("@") && email.includes(".")) {
      const l = email.length;
      const co = email.substring(l - 3);
      if(co === ".co") {
        message = "We are not accepting subscriptions from Colombia emails.";
        valid = false;
      }
      if(!terms) {
        message = "You must accept the terms and conditions"
        valid = false;
      }
    }
  }
  return {
      message,
      valid
  }
};
