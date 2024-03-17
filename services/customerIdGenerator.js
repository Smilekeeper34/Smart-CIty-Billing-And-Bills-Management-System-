class CustomerIdGenerator {
    static generateCustomerId() {
      const letters = generateRandomLetters(3);
      const numbers = generateRandomNumbers(4);

      const customerId = `${letters}${numbers}`;

      return customerId ;
    }

    static generateCustId() {

          const numbers = generateRandomNumbers(4);
          const custId = `${numbers}`;
          return  custId;
        }
  }



  function generateRandomLetters(length) {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      result += letters.charAt(randomIndex);
    }
    return result;
  }
  
  function generateRandomNumbers(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * 10);
    }
    return result;
  }
  
  module.exports = CustomerIdGenerator;
  