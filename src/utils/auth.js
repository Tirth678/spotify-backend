/**
 * Cookie (browser same-origin) or Authorization: Bearer (Postman, mobile, cross-origin SPA).
 */
function getBearerToken(req) {
    const fromCookie = req.cookies?.token
    if (fromCookie) return fromCookie

    const auth = req.headers.authorization
    if (typeof auth === 'string' && auth.startsWith('Bearer ')) {
        return auth.slice(7).trim()
    }
    return null
}

module.exports = { getBearerToken }
