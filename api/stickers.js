const express = require("express");
const router = express.Router();
const queries = require("../db/queries");

isValidId = (req, res, next) => {
  if (!isNaN(req.params.id)) return next();
  next(new Error("Invalid ID"));
};

validSticker = sticker => {
  const hasTitle =
    typeof sticker.title == "string" && sticker.title.trim() != "";
  const hasDescription =
    typeof sticker.description == "string" && sticker.description.trim() != "";
  const hasURL = typeof sticker.url == "string" && sticker.url.trim() != "";
  const hasRating = !isNaN(sticker.rating);

  return hasTitle && hasDescription && hasURL && hasRating;
};

router.get("/", (req, res) => {
  const { title, description, rating } = req.query;
  queries.getAll({ title, description, rating }).then(stickers => {
    res.json(stickers);
  });
});

router.get("/:id", isValidId, (req, res, next) => {
  queries.getOne(req.params.id).then(sticker => {
    if (sticker) {
      res.json(sticker);
    } else {
      next();
    }
  });
});

router.post("/", (req, res, next) => {
  if (validSticker(req.body)) {
    queries.create(req.body).then(sticker => {
      res.json(sticker[0]);
    });
  } else {
    next(new Error("Invalid sticker"));
  }
});

router.put("/:id", isValidId, (req, res, next) => {
  if (validSticker(req.body)) {
    queries.update(req.params.id, req.body).then(sticker => {
      res.json(sticker[0]);
    });
  } else {
    next(new Error("Invalid sticker"));
  }
});

router.delete("/:id", isValidId, (req, res, next) => {
  queries.delete(req.params.id).then(() => {
    res.json({
      deleted: true
    });
  });
});

module.exports = router;
