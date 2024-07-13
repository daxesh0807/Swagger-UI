export const locales = ['en', 'ar'];
export const defaultLocale = 'en';

module.exports = {
  locales,
  defaultLocale,
  pages: {
    '*': ['common'],
  },
  loadLocaleFrom: (locale, namespace) =>
    import(`./src/public/locales/${locale}/${namespace}`).then((m) => m.default),
};