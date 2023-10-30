const verificationEmailTemplate = (recipientEmail, verificationToken) => {
  const { BASE_URL } = process.env;
  return {
    to: recipientEmail,
    subject: "Registration confirmation",
    html: `<b>Follow <a target='_blank' href='${BASE_URL}/api/users/verify/${verificationToken}'>LINK</a> to confirm your registration</b>`,
  };
};

export default verificationEmailTemplate;
