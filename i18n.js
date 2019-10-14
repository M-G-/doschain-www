const NextI18Next = require('next-i18next').default
// const { localeSubpaths } = require('next/config').default().publicRuntimeConfig

// const localeSubpathVariations = {
//   none: {},
//   foreign: {
//     zh: 'zh',
//   },
//   all: {
//     en: 'en',
//     zh: 'zh',
//   },
// }

const languages = ['zh', 'en'];

const NextI18NextInstance = new NextI18Next({
  otherLanguages: ['zh', 'en'],
  defaultLanguage: 'zh',
  // localeSubpaths: localeSubpathVariations[localeSubpaths],
  fallbackLng: 'zh'
})

NextI18NextInstance.i18n.languages = languages;

module.exports = NextI18NextInstance