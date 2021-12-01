const {
  Story,
  User,
  Tag,
  Story_Tag,
  Comment,
  Review,
  List,
  Profile,
} = require("../db/models");
const router = require("express").Router();
module.exports = router;

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get("/search", async (req, res, next) => {
  try {
    const { searchterm, category } = req.query;
    if (category === "stories") {
      let arr1 = ["cat", "dog"];
      let arr2 = ["mouse", "hamster"];
      const tags = await Tag.findAll({
        where: {
          tag: {
            [Op.iLike]: `%${searchterm}%`,
          },
        },
      });
      const storytags = await Promise.all(
        tags.map(async (tag) => {
          return Story_Tag.findAll({
            attributes: ["storyId"],
            where: {
              tagId: tag.id,
            },
          });
        })
      );
      const mergedStorytags = storytags.reduce(
        (acc, val) => acc.concat(val),
        []
      );
      const seenStories = [];
      const storiesTagNoAuthor = await Promise.all(
        mergedStorytags.map(async (story) => {
          seenStories.push(story.storyId);
          return Story.findOne({
            where: {
              id: story.storyId,
            },
          });
        })
      );
      const storiesByTag = await Promise.all(
        storiesTagNoAuthor.map(async (story) => {
          story.dataValues.author = await Profile.findOne({
            attributes: ["username"],
            where: {
              id: story.profileId,
            },
          });
          return story;
        })
      );
      const storiesTitleNoAuthor = await Story.findAll({
        where: {
          title: {
            [Op.iLike]: `%${searchterm}%`,
          },
          id: {
            [Op.notIn]: seenStories,
          },
        },
      });
      const storiesByTitle = await Promise.all(
        storiesTitleNoAuthor.map(async (story) => {
          story.dataValues.author = await Profile.findOne({
            attributes: ["username"],
            where: {
              id: story.profileId,
            },
          });
          return story;
        })
      );
      const allStories = storiesByTitle.concat(storiesByTag);
      res.json(allStories);
    } else {
      const users = await Profile.findAll({
        where: {
          [Op.or]: [
            {
              username: {
                [Op.iLike]: `%${searchterm}%`,
              },
            },
            {
              firstName: {
                [Op.iLike]: `%${searchterm}%`,
              },
            },
            {
              lastName: {
                [Op.iLike]: `%${searchterm}%`,
              },
            },
          ],
        },
      });
      res.json(users);
    }
  } catch (error) {
    next(error);
  }
});
