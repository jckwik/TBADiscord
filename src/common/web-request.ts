const axios = require('axios').default;
const appconfig = require("dotenv").config();

const GetFromTBA = async (url: string, lastModified?: string) => {
    try {
        const response = await axios.get(url, {
            baseURL: 'https://www.thebluealliance.com/api/v3',
            headers: {
                'X-TBA-Auth-Key': appconfig.parsed.TBA_AUTH_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export { GetFromTBA };