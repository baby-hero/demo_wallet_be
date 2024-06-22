const MoralisWeb3 = require('../utils/moralis_util');

const keysToKeep = ["symbol", "thumbnail", "balanceFormatted",
    "usdPrice", "usdValue", "usdValue24hrUsdChange", "usdPrice24hrPercentChange"
];

exports.getNativeBalance = (req, res, next) => {
    const web3 = new MoralisWeb3();
    console.log(req.params);
    const address = req.params.address;

    web3.getWalletTokenBalancesPrice(address).then(result => {
        console.log(result.result);
        let sum_value = 0;
        let sum_change_value = 0;

        const finalTokens = result.result.map(token => {
            sum_value += token.usdValue
            sum_change_value += token.usdValue24hrUsdChange
            let filteredToken = {};
            Object.keys(token).forEach(key => {
                if (keysToKeep.includes(key)) {
                    filteredToken[key] = token[key];
                }
            });

            return filteredToken;
        });
        let percent_change_in24h = 0
        percent_change_in24h = sum_change_value * 100 / sum_value
        if (percent_change_in24h < 0) {
            sum_change_value = - sum_change_value
        }
        res.status(200).json({
            total_wallet: sum_value,
            total_24h_change: sum_change_value,
            percent_change_in24h: percent_change_in24h,
            tokens: finalTokens
        });
    }).catch(error => {
        console.log(error);
        res.status(500).json({ error });
    });
}

exports.getWalletHistory = (req, res, next) => {
    const web3 = new MoralisWeb3();
    const address = req.params.address;
    web3.getWalletHistory(address, 25).then(result => {
        console.log(result.result);
        res.status(200).json(result.result);
    }).catch(error => {
        console.log(error);
        res.status(500).json({ error });
    });
}