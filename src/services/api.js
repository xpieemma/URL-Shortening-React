import axios from 'axios'

const BITLY_API_URL = import.meta.env._BITLY_API_URL || 'https://api-ssl.bitly.com/v4/shorten';

const BITLY_TOKEN = import.meta.env._BITLY_TOKEN;
const BITLY_GROUP_GUID = import.meta.env.BITLY_GROUP_GUID;

export const shortenUrlDelay = async (Url) => {
await new Promise(res => setTimeout (res, 1000));
const randomCode = Math.random().toString(36).substring(2,8);
return `https://bit.ly/${randomCode}`;
};

export const shortenUrlBitly = async (Url) => {
    try { 
        const res = await axios.post(
            BITLY_API_URL,
            {
                group_guid: BITLY_GROUP_GUID,
                domain: 'bit.ly',
                long_url: Url
            },
            {
                headers: {
                    'Authorizaton' :`Bearer${BITLY_TOKEN}`,
                    'content-Type' : 'applicaton/json'
                }
            }
        );
        return res.data.link;
    } catch (err) {
        if (err.res) {
            throw new Error(err.res.data.message || 'Failed to shorten URL');
        } else if (err.request) {
            throw new Error('No reponse from server. Please check your internet connection. irs')
        }
    }
};

export const urlViaProxy = async (Url) => {
    try {
        const res = await axios.post('/api/shorten', {Url});
        return res.data.link;

} catch(err) {
    throw new  Error (err.res?.data?.message || 'Failed to shorten URL');
}
};

export const shortUrl = import.meta.env.NODE_ENV === 'production' ?
urlViaProxy : shortenUrlDelay;