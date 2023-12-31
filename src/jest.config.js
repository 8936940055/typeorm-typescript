
  module.exports = {
    roots: ["<rootDir>/src"],
    preset: 'ts-jest',
    testEnvironment: "node",
    transform: {
      "^.+\\.ts$": "ts-jest",
    },
    moduleFileExtensions: ["ts", "js", "json", "node"],
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts$",
    collectCoverageFrom: ["src/**/*.ts"],
    coverageDirectory: "coverage",
    verbose: true,
   
  
   
    
  };