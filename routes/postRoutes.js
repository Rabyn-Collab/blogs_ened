const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middleware/check_auth')

const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

const postSchema = Joi.object({
  title: Joi.string().required().min(15).max(40),
  detail: Joi.string().required().min(150).max(1000),
  image: Joi.string().optional()
});

const removeSchema = Joi.object({
  post_id: Joi.string().required(),
  public_id: Joi.string().required(),
});

const updateSchema = Joi.object({
  title: Joi.string().required(),
  detail: Joi.string().required(),
  image: Joi.optional(),
  post_id: Joi.string().required(),
  public_id: Joi.optional()
});

const noAllow = (req, res) => res.status(405).json({
  status: 405,
  message: 'method not allowed'
});

router.get('/', postController.getAllPosts);

router.route('/api/createPost').post(auth.checkAuth, validator.body(postSchema), postController.createPost).all(noAllow);
router.patch('/api/post/update', auth.checkAuth, validator.body(updateSchema), postController.updatePost);
router.get('/api/userposts', auth.checkAuth, postController.getPostByUser);
router.delete('/api/post/remove', auth.checkAuth, validator.body(removeSchema), postController.removePost);



module.exports = router;
