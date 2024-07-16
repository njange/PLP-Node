const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const app = express();

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: false }));

// Initialize session middleware
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}));

// Initialize Passport and use session
app.use(passport.initialize());
app.use(passport.session());

// Passport local strategy for authentication
passport.use(new LocalStrategy((username, password, done) => {
    // Authentication logic (from the provided excerpt)
    if (username === 'admin' && password === 'admin') {
        return done(null, { id: 1, username: 'admin' });
    } else {
        return done(null, false, { message: 'Invalid credentials' });
    }
}));

// Serialize and deserialize user instances to and from the session.
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    // Assuming a user object is found with a matching id
    const user = { id: 1, username: 'admin' };
    done(null, user);
});

// Define routes
app.get('/', (req, res) => {
    res.send('Home Page. Please login at /login');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/protected',
    failureRedirect: '/login',
    failureFlash: false
}));

app.get('/login', (req, res) => {
    res.send('<form action="/login" method="post">Username: <input type="text" name="username"/><br/>Password: <input type="password" name="password"/><br/><input type="submit" value="Log In"/></form>');
});

app.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});

app.get('/protected', (req, res) => {
    if (req.isAuthenticated()) {
        res.send('Welcome to the protected page, admin!');
    } else {
        res.redirect('/login');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});