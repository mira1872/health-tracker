// jwt-vanilla.js

/* Base64 URL encode a string
 * @param {string} str - The string to be encoded
 * @returns {string} - The Base64 URL encoded string
 */
function base64UrlEncode(str) {
    return btoa(str)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

/* Base64 URL decode a string
 * @param {string} str - The Base64 URL encoded string
 * @returns {string} - The decoded string
 */
function base64UrlDecode(str) {
    str = str
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    while (str.length % 4) {
        str += '=';
    }
    return atob(str);
}

/* Create a JSON Web Token
 * @param {object} header - The JWT header
 * @param {object} payload - The JWT payload
 * @param {string} secret - The secret key to sign the token
 * @returns {string} - The JWT
 *  */
function createJWT(header, payload, secret) {
    const headerEncoded = base64UrlEncode(JSON.stringify(header));
    const payloadEncoded = base64UrlEncode(JSON.stringify(payload));
    const signature = base64UrlEncode(
        CryptoJS.HmacSHA256(headerEncoded + "." + payloadEncoded, secret).toString(CryptoJS.enc.Base64)
    );
    return `${headerEncoded}.${payloadEncoded}.${signature}`;
}

/* Verify a JSON Web Token
 * @param {string} token - The JWT
 * @param {string} secret - The secret key to verify the token
 * @returns {object|null} - The decoded payload if valid, otherwise null
 */
function verifyJWT(token, secret) {
    const [headerEncoded, payloadEncoded, signature] = token.split('.');
    const signatureCheck = base64UrlEncode(
        CryptoJS.HmacSHA256(headerEncoded + "." + payloadEncoded, secret).toString(CryptoJS.enc.Base64)
    );

    if (signature === signatureCheck) {
        return JSON.parse(base64UrlDecode(payloadEncoded));
    } else {
        return null;
    }
}

/**
 * Example usage
 */
const header = {
    alg: "HS256",
    typ: "JWT"
};

const payload = {
    sub: "1234567890",
    name: "John Doe",
    iat: Math.floor(Date.now() / 1000)
};

const secret = "your-256-bit-secret";

const token = createJWT(header, payload, secret);


const decodedPayload = verifyJWT(token, secret);
;