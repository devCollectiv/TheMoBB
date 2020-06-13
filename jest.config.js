module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/config/jest/setupEnzymeAndGlobals.ts'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|txt|csv)$': "<rootDir>/config/jest/fileMock.ts",
    '\\.(css|less|scss|sss|styl)$': 'identity-obj-proxy'
  }
}