const express = require("express"),
  Article = require("./../models/article"),
  router = express.Router();
function saveArticleAndRedirect(e) {
  return async (r, t) => {
    let i = r.article;
    (i.image = r.body.image),
      (i.author = r.body.author),
      (i.title = r.body.title),
      (i.category = r.body.category),
      (i.description = r.body.description),
      (i.markdown = r.body.markdown);
    try {
      (i = await i.save()), t.redirect(`/articles/${i.slug}`);
    } catch (r) {
      t.render(`articles/${e}`, { article: i });
    }
  };
}
router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
}),
  router.get("/edit/:id", async (e, r) => {
    const t = await Article.findById(e.params.id);
    r.render("articles/edit", { article: t });
  }),
  router.get("/:slug", async (e, r) => {
    const t = await Article.findOne({ slug: e.params.slug });
    null == t && r.redirect("/"), r.render("articles/show", { article: t });
  }),
  router.post(
    "/",
    async (e, r, t) => {
      (e.article = new Article()), t();
    },
    saveArticleAndRedirect("new")
  ),
  router.put(
    "/:id",
    async (e, r, t) => {
      (e.article = await Article.findById(e.params.id)), t();
    },
    saveArticleAndRedirect("edit")
  ),
  router.delete("/:id", async (e, r) => {
    await Article.findByIdAndDelete(e.params.id), r.redirect("/");
  }),
  (module.exports = router);
