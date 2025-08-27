export const preset = 'jest-expo';
export const setupFilesAfterEnv = ['./jest.setup.js'];
export const transformIgnorePatterns = [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
];
