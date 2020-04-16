const dynamicPlugins = []
// pick data from 3 months ago
const startDate = new Date();
startDate.setMonth(startDate.getMonth() - 3);
if(process.env.CLIENT_EMAIL && process.env.PRIVATE_KEY && process.env.GA_VIEW_ID) {
    dynamicPlugins.push({
      resolve: `gatsby-plugin-guess-js`,
      options: {
        GAViewID: process.env.viewIDAdmin,
        jwt: {
          client_email: process.env.client_email,
          private_key: process.env.PRIVATE_KEY,
        },
        period: {
          startDate,
          endDate: new Date(),
        },
      },
    })
}

module.exports = {
  siteMetadata: {

  },
  plugins: [
  ].concat(dynamicPlugins)
}
