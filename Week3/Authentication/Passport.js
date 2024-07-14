const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy((username, password, done) => {
    if (username === 'admin' && password === 'admin') {
        return done(null, { id: 1, username: 'admin' });
    } else {
        return done(null, false, { message: 'Invalid credentials' });
    }
}));

Passport.serializeUser((user, done) => {
    done(null, user.id);
});

Passport.deserializeUser((id, done) => {
    // Logic to find the user based on id
    const user = { id: 1, username: 'admin' };
});

// Set up login and logout routes

app.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}));

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
};

app.get('/profile', isAuthenticated, (req, res) => {
    res.send('Welcome to your profile');
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});