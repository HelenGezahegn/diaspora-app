import React from 'react';
import * as Updates from 'expo-updates';
import { StyleSheet, AsyncStorage } from 'react-native';
import i18n from 'i18n-js';
import Navigation from './navigation';

import eng from './localization/eng/translation.json';
import amh from './localization/amh/translation.json';
import orm from './localization/orm/translation.json';
import tig from './localization/tig/translation.json';

import { LocalizationContext } from './context/language';
import { firebaseTempFixe } from './helpers';

i18n.fallbacks = true;
i18n.translations = { eng, amh, orm, tig };

const DEFAULT_LOCALE = 'eng';

// Do not remove. a temporary fix for firebase-js.
firebaseTempFixe();

export default function App() {
  const [locale, setLocale] = React.useState();
  const localizationContext = React.useMemo(
    () => ({
      t: (scope, options) => i18n.t(scope, { locale, ...options }),
      locale,
      setLocale,
    }),
    [locale]
  );

  // Load usr locale.
  React.useEffect(() => {
    const loadUserLocale = async () => {
      if (locale) {
        setLocale(locale);
        await AsyncStorage.setItem('locale', locale);
      } else {
        const userLocale = await AsyncStorage.getItem('locale');
        if (userLocale) {
          console.log('here', userLocale);
          setLocale(userLocale);
          await AsyncStorage.setItem('locale', userLocale);
          return;
        }
        setLocale(DEFAULT_LOCALE);
        await AsyncStorage.setItem('locale', DEFAULT_LOCALE);
      }
    };
    loadUserLocale();
  }, [locale]);

  React.useEffect(() => {
    const checkForeUpdate = async () => {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          // ... notify user of update ...
          await Updates.reloadAsync();
        }
      } catch (e) {
        // handle or log error
      }
    };
    checkForeUpdate();
  }, []);

  return (
    <LocalizationContext.Provider value={localizationContext}>
      <Navigation />
    </LocalizationContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
