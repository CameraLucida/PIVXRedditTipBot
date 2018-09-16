const setupDatabase = require('./db/setup');

const {User} = require('./db');

const Snoowrap = require('snoowrap');

const client = new Snoowrap({
    userAgent   : process.env.USER_AGENT,
    clientId    : process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username    : process.env.USERNAME,
    password    : process.env.PASSWORD
});

global.env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";

console.log("=== Starting WORKER ===");

global.toFixed = function (num, fixed) {
    var re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)[0];
};

const run = () => {
    setupDatabase({ silent: true }).then((result) => {
        let agenda = result.agenda;

        const paymentProcessor = require('./jobs/payment.js')(agenda);
        paymentProcessor.checkDeposit({ repeat: true });

        agenda.on('ready', function() {
            console.log('Agenda ready!');
            agenda.start();
        });

        agenda.on('fail', async function(err, job) {
            job.attrs.stacktrace = err.stack;
            job.save();

            const user = await User.findById(job.attrs.data.userId);

            if (!user) return

            await client.composeMessage({ to: user.username, subject: "Withdraw Failed", text: `Your  withdraw of ${job.attrs.data.amount} PIVX has failed. Reason: ${job.attrs.failReason}`});

            console.log('Job failed with error: %s', err.message);
        });

        agenda.on('success', function(job) {
            job.attrs.completed = true;
            job.save();



            console.log('Job completed %s', job.attrs._id);
        });

    }).catch((err) => {
        console.error(err);
        process.exit(-1);
    });
};

const startDelay = 2000; // ensure that server.js is up/running

console.log("Starting worker..");

setTimeout(() => {
    run();
    console.log('started');
}, startDelay);
