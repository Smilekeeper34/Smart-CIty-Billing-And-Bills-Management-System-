
const generateCustomAccountId = () => {
  const prefix = "CITYBILL";
  const accountIdLength = 15;

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let accountId = prefix;
  for (let i = prefix.length; i < accountIdLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    accountId += characters.charAt(randomIndex);
  }

  return accountId;
};

module.exports = {
  generateCustomAccountId,
};
