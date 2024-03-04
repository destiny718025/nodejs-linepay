const { HmacSHA256 } = require('crypto-js');
const Base64 = require('crypto-js/enc-base64');
const axios = require('axios');
require('dotenv').config();
const {
    LINEPAY_CHANNEL_ID,
    LINEPAY_CHANNEL_SECRET_KEY,
    LINEPAY_VERSION,
    LINEPAY_SITE
} = process.env;

function createSignature(uri, payload, nonce) {
    return Base64.stringify(HmacSHA256(
        `${LINEPAY_CHANNEL_SECRET_KEY}${uri}${JSON.stringify(payload)}${nonce}`,
        LINEPAY_CHANNEL_SECRET_KEY
    ));
};

const requestApi = async function(payload) {
    try {
        const uri = `/${LINEPAY_VERSION}/payments/request`;
        const nonce = parseInt(new Date().getTime() / 1000);
        const signature = createSignature(uri, payload, nonce);
        const url = `${LINEPAY_SITE}${uri}`;
        const headers = {
            'Content-Type': 'application/json',
            'X-LINE-ChannelId': LINEPAY_CHANNEL_ID,
            'X-LINE-Authorization-Nonce': nonce,
            'X-LINE-Authorization': signature
        };

        const linePayRes = await axios.post(url, payload, { headers });

        if (linePayRes.data.returnCode === '0000') {
            return linePayRes.data.info.paymentUrl.web;
        }
    } catch (error) {
        console.log(error);

        return null;
    }
};

module.exports = {
    requestApi
}