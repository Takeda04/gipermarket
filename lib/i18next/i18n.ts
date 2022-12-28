import i18n from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next';

import { Languages } from './languages';

i18n
  .use(
    resourcesToBackend((language, namespace, callback) =>
      callback(null, require(`../../locales/${language}/${namespace}.json`))
    )
  )
  .use(initReactI18next)
  .init({
    ns: ['common'],
    initImmediate: false,
    fallbackLng: Languages.RU,
    editor: {
      onEditorSaved: async (lng, ns) => {
        await i18n.reloadResources(lng, ns);
        i18n.emit('editorSaved');
      },
    },
    react: {
      bindI18n: 'languageChanged editorSaved',
      useSuspense: false,
    },
  });

export { i18n };
