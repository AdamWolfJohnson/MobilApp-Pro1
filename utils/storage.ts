import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Utility for handling local storage operations
 */
const storage = {
  /**
   * Store a value in AsyncStorage
   */
  set: async <T>(key: string, value: T): Promise<void> => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error storing data:', error);
      throw error;
    }
  },

  /**
   * Retrieve a value from AsyncStorage
   */
  get: async <T>(key: string): Promise<T | null> => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error retrieving data:', error);
      throw error;
    }
  },

  /**
   * Remove a value from AsyncStorage
   */
  remove: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data:', error);
      throw error;
    }
  },

  /**
   * Clear all values from AsyncStorage
   */
  clear: async (): Promise<void> => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error('Error clearing data:', error);
      throw error;
    }
  },

  /**
   * Get all keys from AsyncStorage
   */
  getAllKeys: async (): Promise<string[]> => {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Error getting all keys:', error);
      throw error;
    }
  },

  /**
   * Multi-get values from AsyncStorage
   */
  multiGet: async (keys: string[]): Promise<[string, string | null][]> => {
    try {
      return await AsyncStorage.multiGet(keys);
    } catch (error) {
      console.error('Error multi-getting data:', error);
      throw error;
    }
  },

  /**
   * Multi-set values in AsyncStorage
   */
  multiSet: async (keyValuePairs: [string, string][]): Promise<void> => {
    try {
      await AsyncStorage.multiSet(keyValuePairs);
    } catch (error) {
      console.error('Error multi-setting data:', error);
      throw error;
    }
  },
};

export default storage;