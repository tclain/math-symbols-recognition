module.exports = {
  /** turns a callback based function to a promisified one while accepting the same arguments */
  promisify(fnThatAcceptACallback) {
    return (...args) => {
      return new Promise((resolve, reject) => {
        fnThatAcceptACallback(...args, (err, result) => {
          if (err) reject(err);
          return resolve(result);
        });
      });
    };
  }
};
