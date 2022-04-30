const express = require("express");
const Joi = require("joi");
const router = express.Router();
const path = require("path");
const fs = require("fs/promises");
const { request } = require("http");

const contactsPath = path.join(__dirname, "../../models/contacts.json");

router.get("/", async (req, res, next) => {
  const data = await fs.readFile(contactsPath, "utf-8");
  res.json(JSON.parse(data));
  // listContacts().then((data) => console.log(data));
  // return res.json(JSON.parse(listContacts()));
});

router.get("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });

  const schemaValid = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.string().phoneNumber(),
  });

  const validationResult = schemaValid.validate(req.body);
  if (validationResult.error) {
    return res.status(404).json({ status: validationResult.error });
  }
  const { username, email, phone } = req.body;
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
