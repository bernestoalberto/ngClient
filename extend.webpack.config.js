const { GuessPlugin } = require('guess-webpack');

module.exports = {
  plugins: [
    new GuessPlugin({
      // Alternatively you can provide a Google Analytics View ID
       GA: '202463252',
      runtime: {
        delegate: false
      },
    })
  ]
};
