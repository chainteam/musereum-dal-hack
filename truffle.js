require('babel-polyfill');
require('babel-register')({
     // Ignore everything in node_modules except node_modules/zeppelin-solidity. 
     presets: ['env'],
     plugins: ['syntax-async-functions','transform-regenerator'],
     ignore: /node_modules\/(?!zeppelin-solidity)/, 
 });

module.exports = {
  networks: {
    testrpc: {
      // gas: 4.5 * 1e6,
      gasPrice: 1e9,
      network_id: '*',
      host: 'localhost',
      port: 8545,
      from: '0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1'
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};
