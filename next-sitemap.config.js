/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://docs.ottofms.com',
  generateRobotsTxt: true, // (optional)
  // ...other options
}