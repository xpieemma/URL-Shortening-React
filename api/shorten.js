
// export default async function handler(req, res) {
 
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

 
//   if (req.method === 'OPTIONS') {
//     return res.status(200).end();
//   }

  
//   if (req.method !== 'POST') {
//     return res.status(405).json({ 
//       error: 'Method not allowed',
//       message: 'Only POST requests are accepted'
//     });
//   }

//   try {
//     const { Url } = req.body;

//     if (!Url) {
//       return res.status(400).json({ 
//         error: 'URL is required',
//         message: 'Please provide a URL to shorten'
//       });
//     }

    
//     const BITLY_TOKEN = process.env.BITLY_TOKEN;
//     const BITLY_GROUP_GUID = process.meta.env.BITLY_GROUP_GUID;
//     const BITLY_API_URL = process.env.BITLY_API_URL || 'https://api-ssl.bitly.com/v4/shorten';

//     if (!BITLY_TOKEN || !BITLY_GROUP_GUID) {
//       console.error('Missing Bitly credentials');
//       return res.status(500).json({ 
//         error: 'Server configuration error',
//         message: 'API credentials not configured'
//       });
//     }

   
//     const response = await fetch(BITLY_API_URL, {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${BITLY_TOKEN}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         group_guid: BITLY_GROUP_GUID,
//         domain: 'bit.ly',
//         long_url: Url,
//       }),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       console.error('Bitly API error:', data);
//       throw new Error(data.message || 'Bitly API error');
//     }

//     return res.status(200).json({ 
//       link: data.link,
//       success: true 
//     });

//   } catch (error) {
//     console.error('Server error:', error);
//     return res.status(500).json({ 
//       error: error.message || 'Failed to shorten URL',
//       message: 'An unexpected error occurred'
//     });
//   }
// }