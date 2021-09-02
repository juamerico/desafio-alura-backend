const router = require("express").Router()
const User = require("../models/usuarios")
const {NotAllowed} = require("../models/errors")

router.get("/register", (req, res) => {
    res.render("register.ejs")
})

router.post("/register", async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            passwordInput: req.body.passwordInput,
            passwordConfirm: req.body.passwordConfirm
        })
        await user.create()
        res.redirect("/usuarios/login")
    } catch(err) {
        next(err)
    }
})

router.get("/login", (req, res) => {
    res.render("login.ejs")
})

router.post("/login", async (req, res, next) => {
    try {
        const user = new User({
            email: req.body.email,
            passwordInput: req.body.passwordInput
        })
        await user.findByEmail()
        res.redirect("/api/videos?search=all")
    } catch(err) {
        next(err)
    }
})

router.get("/logout", (req, res) => {
    res.render("logout.ejs")
})

module.exports = router
