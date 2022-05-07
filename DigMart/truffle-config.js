module.exports = {
    compilers: {
        solc: {
            version: ">=0.6.0 <0.8.0",
            parser: 'solcjs'
        }
    },
    networks: {
        ganache: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*"
        },
    }
};