// Middleware lives in the space between the client and the server. Its job is to facilitate the process of sending data between the two, as well as ensuring that no unwanted data accidentally gets passed along with the request or response. It can also be used to help prevent external users from accessing transmissions that could then be used to compromise our system. Middleware is an additional checkpoint that must be successfully navigated in order for our transmission to reach its desired destination. 

module.exports = (req, res, next) => {
    res.header("access-control-allow-origin", "*")
    res.header("access-control-allow-methods", "GET, POST, PUT, DELETE")
    res.header("access-control-allow-headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    next()
}