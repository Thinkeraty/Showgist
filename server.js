"production" !== process.env.NODE_ENV && require("dotenv").config();
const express = require("express"),
  bodyParser = require("body-parser"),
  exphbs = require("express-handlebars"),
  Article = require("./models/article"),
  articleRouter = require("./routes/articles"),
  methodOverride = require("method-override"),
  path = require("path"),
  nodemailer = require("nodemailer"),
  Email = require('email-templates');
  app = express();
app.engine("handlebars", exphbs()),
  app.set("view engine", "handlebars"),
  app.set("view engine", "ejs"),
  app.use(express.urlencoded({ extended: !1 })),
  app.use(methodOverride("_method")),
  app.use(bodyParser.urlencoded({ extended: !1 })),
  app.use(bodyParser.json()),
  app.get("/", async (e, r) => {
    const s = await Article.find().sort({ createdAt: "desc" });
    r.render("articles/index", { articles: s });
  }),
  app.get("/category/movies", async (e, r) => {
    const s = await Article.find({ categorySlug: "movies" }).sort({
      createdAt: "desc",
    });
    r.render("articles/category", { articles: s });
  }),
  app.get("/category/tv-series", async (e, r) => {
    const s = await Article.find({ categorySlug: "tv-series" }).sort({
      createdAt: "desc",
    });
    r.render("articles/category", { articles: s });
  }),
  app.get("/category/politics", async (e, r) => {
    const s = await Article.find({ categorySlug: "politics" }).sort({
      createdAt: "desc",
    });
    r.render("articles/category", { articles: s });
  }),
  app.get("/category/comics", async (e, r) => {
    const s = await Article.find({ categorySlug: "comics" }).sort({
      createdAt: "desc",
    });
    r.render("articles/category", { articles: s });
  }),
  app.get("/category/culture", async (e, r) => {
    const s = await Article.find({ categorySlug: "culture" }).sort({
      createdAt: "desc",
    });
    r.render("articles/category", { articles: s });
  }),
  app.get("/category/news", async (e, r) => {
    const s = await Article.find({ categorySlug: "news" }).sort({
      createdAt: "desc",
    });
    r.render("articles/category", { articles: s });
  });
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: !0,
  useUnifiedTopology: !0,
  useCreateIndex: !0,
});
const db = mongoose.connection;
db.on("error", (e) => console.error(e)),
  db.once("open", () => console.log("Connected to Mongoose")),
  app.use("/articles", articleRouter),
  app.use(express.static(path.join(__dirname, "/views/articles"))),
  app.get("/about", (e, r) => {
    r.render("articles/about");
  }),
  app.get("/contact", (e, r) => {
    r.render("articles/contact.handlebars", { layout: !1 });
  }),
  app.post("/sendMsg", (e, r) => {
    // let s = {
    //   from: '"ShowGist" <mail.showgist@gmail.com>',
    //   to: "samyak2986@gmail.com",
    //   subject: "ShowGist Contact Request",
    //   text: "Hello world?",
    //   html: `\n    <p>You have a message from <a href="https://showgist.herokuapp.com">ShowGist</a><p>\n    <h3>Sender's Details</h3>\n    <br>\n    <ul>\n      <li>Name: ${e.body.name}</li>\n      <li>Company: ${e.body.company}</li>\n      <li>Email: ${e.body.email}</li>\n      <li>Phone Number: ${e.body.phone}</li>\n    </ul>\n    <br>\n    <h3>Message</h3>\n    <p>${e.body.message}</p>\n  `,
    // };
    // nodemailer
    //   .createTransport({
    //     service: "gmail",
    //     auth: {
    //       user: "mail.showgist@gmail.com",
    //       pass: process.env.SHOWGIST_EMAIL_PSW,
    //     },
    //     tls: { rejectUnauthorized: !1 },
    //   })
      // .sendMail(s, (e, s) => {
      //   if (e) return console.log(e);
      //   console.log("Message sent: %s", s.messageId),
      //     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(s)),
          r.render("articles/contact.handlebars", {
            layout: !1,
            msg: "Your message has been sent",
          });
      // });
  }),
  app.get("/subscribe", (e, r) => {
    r.render("articles/subscription.handlebars", { layout: !1 });
  }),
  app.post("/userSubscribed", (e, r) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
        auth: {
          user: "mail.showgist@gmail.com",
          pass: process.env.SHOWGIST_EMAIL_PSW,
        },
        tls: { rejectUnauthorized: !1 },
    });

    const email = new Email({
      transport: transporter,
      send: true,
      preview: false,
    });

    email.send({
      template: 'subscribed',
      message: {
        from: 'ShowGist <mail.showgist@gmail.com>',
        to: `${e.body.email}`,
      }
    }).then(() => console.log('email has been sent!'));
  }),
  app.post("/articleUserSubscribed", (e, r) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
        auth: {
          user: "mail.showgist@gmail.com",
          pass: process.env.SHOWGIST_EMAIL_PSW,
        },
        tls: { rejectUnauthorized: !1 },
    });

    const email = new Email({
      transport: transporter,
      send: true,
      preview: false,
    });

    email.send({
      template: 'subscribed',
      message: {
        from: 'ShowGist <mail.showgist@gmail.com>',
        to: `${e.body.email}`,
      }
    }).then(() => console.log('email has been sent!'));
  }),
  app.get(
    "/ndndndn/mndnndn.nn/jhhhwhsub.js/dnddjjdjj/ndnnndn/ddmdmm",
    (e, r) => {
      r.sendFile(path.resolve(__dirname + "/views/articles/sub.js"));
    }
  ),
  app.use(function (e, r, s) {
    const t = Article.find().sort({ createdAt: "desc" });
    r.render("articles/404", { articles: t });
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// app.listen(3000, '192.168.0.5')
