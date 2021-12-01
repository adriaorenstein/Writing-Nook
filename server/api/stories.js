const {
  Story,
  User,
  Profile,
  Tag,
  Story_Tag,
  Comment,
  Review,
  List,
} = require("../db/models");
const router = require("express").Router();
module.exports = router;

router.post("/poststory", async (req, res, next) => {
  try {
    const { title, description, storytext, tags } = req.body.story;
    const profileId = req.body.user.id;
    const newStory = await Story.create({
      profileId,
      title,
      description,
      storytext,
    });
    tags.forEach(async function (tag) {
      let tagName = await Tag.findOne({
        where: {
          tag: tag,
        },
      });
      if (!tagName) {
        tagName = await Tag.create({
          tag,
        });
      }
      await Story_Tag.create({
        storyId: newStory.id,
        tagId: tagName.id,
      });
    });
    res.json(newStory);
  } catch (err) {
    next(err);
  }
});

router.put("/updatestory", async (req, res, next) => {
  try {
    const { title, description, storytext, tags } = req.body;
    const updatedStory = await Story.update(
      {
        title,
        description,
        storytext,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    tags.forEach(async function (tag) {
      let existingStoryTag;
      let tagName = await Tag.findOne({
        where: {
          tag: tag,
        },
      });
      if (!tagName) {
        tagName = await Tag.create({
          tag,
        });
      } else {
        existingStoryTag = await Story_Tag.findOne({
          where: {
            tagId: tagName.id,
            storyId: req.body.id,
          },
        });
      }
      if (!existingStoryTag) {
        await Story_Tag.create({
          storyId: req.body.id,
          tagId: tagName.id,
        });
      }
    });
    res.json(updatedStory);
  } catch (error) {
    next(error);
  }
});

router.delete("/deletestory", async (req, res, next) => {
  try {
    const { storyId } = req.body;
    Story.destroy({
      where: {
        id: storyId,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.delete("/deletetags", async (req, res, next) => {
  try {
    const { storyId, tags } = req.body;
    tags.forEach(async function (tag) {
      let tagInfo = await Tag.findOne({
        where: {
          tag: tag,
        },
      });

      await Story_Tag.destroy({
        where: {
          storyId: storyId,
          tagId: tagInfo.id,
        },
      });

      let tagExists = await Story_Tag.findOne({
        where: {
          tagId: tagInfo.id,
        },
      });

      if (!tagExists) {
        await Tag.destroy({
          where: {
            id: tagInfo.id,
          },
        });
      }
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.delete("/deletestorydata", async (req, res, next) => {
  try {
    const { storyId } = req.body;
    await Review.destroy({
      where: {
        storyId: storyId,
      },
    });
    await Comment.destroy({
      where: {
        storyId: storyId,
      },
    });
    await List.destroy({
      where: {
        storyId: storyId,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.get("/getuserstories", async (req, res, next) => {
  try {
    const { profileId } = req.query;
    const userStories = await Story.findAll({
      where: {
        profileId: profileId,
      },
    });
    res.json(userStories);
  } catch (err) {
    next(err);
  }
});

router.get("/getallstories", async (req, res, next) => {
  try {
    const allStories = await Story.findAll({ include: Profile });
    res.json(allStories);
  } catch (error) {
    next(error);
  }
});

router.post("/postcomment", async (req, res, next) => {
  try {
    const { commenttext, storyId, profileId } = req.body;

    const newComment = await Comment.create({
      commenttext,
      storyId,
      profileId,
    });

    const author = await Profile.findOne({
      where: {
        id: profileId,
      },
    });

    res.json({ newComment, author });
  } catch (error) {
    next(error);
  }
});

router.delete("/deletecomment", async (req, res, next) => {
  try {
    let { comment } = req.body;
    await Comment.destroy({
      where: {
        id: comment.id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.post("/postreview", async (req, res, next) => {
  try {
    let { rating, reviewtext, storyId, profileId } = req.body;

    const newReview = await Review.create({
      rating,
      reviewtext,
      storyId,
      profileId,
    });

    const author = await Profile.findOne({
      where: {
        id: profileId,
      },
    });
    await Story.increment(
      { totalRating: rating, numRatings: 1 },
      { where: { id: storyId } }
    );
    res.json({ newReview, author });
  } catch (error) {
    next(error);
  }
});

router.put("/removerating", async (req, res, next) => {
  try {
    const { score, storyId } = req.body;
    await Story.increment(
      { totalRating: -score, numRatings: -1 },
      { where: { id: storyId } }
    );
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.delete("/deletereview", async (req, res, next) => {
  try {
    let { review } = req.body;
    await Review.destroy({
      where: {
        id: review.id,
      },
    });
    await Story.increment(
      { totalRating: -review.rating, numRatings: -1 },
      { where: { id: review.storyId } }
    );
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.get("/checkforrating", async (req, res, next) => {
  try {
    const { storyId, profileId } = req.query;
    let userHasRating = await Review.findOne({
      where: {
        storyId: storyId,
        profileId: profileId,
      },
    });
    res.json(userHasRating);
  } catch (error) {
    next(error);
  }
});

router.put("/updaterating", async (req, res, next) => {
  try {
    const { score, newReview, storyId, profileId } = req.body;
    if (newReview) {
      await Review.update(
        {
          rating: score,
          reviewtext: newReview,
        },
        {
          where: {
            storyId: storyId,
            profileId: profileId,
          },
        }
      );
    } else {
      await Review.update(
        {
          rating: score,
        },
        {
          where: {
            storyId: storyId,
            profileId: profileId,
          },
        }
      );
    }
    const newRating = await Review.findOne({
      where: {
        storyId: storyId,
        profileId: profileId,
      },
    });
    await Story.increment(
      { totalRating: score, numRatings: 1 },
      { where: { id: storyId } }
    );
    res.json(newRating);
  } catch (error) {
    next(error);
  }
});

router.get("/getaveragerating", async (req, res, next) => {
  try {
    const { storyId } = req.query;
    const ratingInfo = await Story.findOne({
      attributes: ["totalRating", "numRatings"],
      where: {
        id: storyId,
      },
    });
    let totalRating = ratingInfo.totalRating;
    let numRatings = ratingInfo.numRatings;
    let averageRating;
    if (numRatings > 0) {
      averageRating = ratingInfo.totalRating / ratingInfo.numRatings;
      averageRating = Math.round(averageRating * 100) / 100;
    } else {
      averageRating = null;
    }
    res.json({ averageRating, numRatings });
  } catch (error) {
    next(error);
  }
});

router.get("/getuserreview", async (req, res, next) => {
  try {
    const { storyId, profileId } = req.query;
    const review = await Review.findOne({
      where: {
        storyId: storyId,
        profileId: profileId,
      },
    });

    const author = await Profile.findOne({
      where: {
        id: profileId,
      },
    });
    res.json({ review, author });
  } catch (error) {
    next(error);
  }
});

router.get("/getuserratedstories/:profileId", async (req, res, next) => {
  try {
    const userStoriesNoAuthor = await Review.findAll({
      include: Story,
      where: {
        profileId: req.params.profileId,
      },
    });
    const userStories = await Promise.all(
      userStoriesNoAuthor.map(async (story) => {
        story.dataValues.author = await Profile.findOne({
          where: {
            id: story.story.profileId,
          },
        });
        return story;
      })
    );
    res.json(userStories);
  } catch (error) {
    next(error);
  }
});

router.get("/lists/getData", async (req, res, next) => {
  try {
    const { storyId, profileId } = req.query;
    const listData = await List.findOne({
      where: {
        storyId: storyId,
        profileId: profileId,
      },
    });
    res.json(listData);
  } catch (error) {
    next(error);
  }
});

router.post("/lists/add", async (req, res, next) => {
  try {
    let { list, storyId, profileId } = req.body;
    const newList = await List.create({
      [list]: true,
      storyId,
      profileId,
    });
    res.json(newList);
  } catch (error) {
    next(error);
  }
});

router.put("/lists/add", async (req, res, next) => {
  try {
    let { list, storyId, profileId } = req.body;
    await List.update(
      {
        [list]: true,
      },
      {
        where: {
          storyId: storyId,
          profileId: profileId,
        },
      }
    );
    const updatedList = await List.findOne({
      where: {
        storyId: storyId,
        profileId: profileId,
      },
    });
    res.json(updatedList);
  } catch (error) {
    next(error);
  }
});

router.put("/lists/remove", async (req, res, next) => {
  try {
    let { list, storyId, profileId } = req.body;
    await List.update(
      {
        [list]: false,
      },
      {
        where: {
          storyId: storyId,
          profileId: profileId,
        },
      }
    );
    const updatedList = await List.findOne({
      where: {
        storyId: storyId,
        profileId: profileId,
      },
    });
    res.json(updatedList);
  } catch (error) {
    next(error);
  }
});

router.get("/getuserliststories/:profileId", async (req, res, next) => {
  try {
    const userLists = await List.findAll({
      where: {
        profileId: req.params.profileId,
      },
    });
    const listStories = await Promise.all(
      userLists.map(async (story) => {
        let listStory = await Story.findOne({
          where: {
            id: story.storyId,
          },
        });
        let author = await Profile.findOne({
          where: {
            id: listStory.profileId,
          },
        });
        listStory.dataValues.author = author;
        listStory.dataValues.lists = {
          read: story.read,
          toberead: story.toberead,
          favorites: story.favorites,
        };
        return listStory;
      })
    );
    res.json(listStories);
  } catch (error) {
    next(error);
  }
});

router.get("/story/:storyid", async (req, res, next) => {
  try {
    const story = await Story.findOne({
      include: Profile,
      where: {
        id: req.params.storyid,
      },
    });
    const storyTags = await Story_Tag.findAll({
      where: {
        storyId: req.params.storyid,
      },
    });
    const tags = await Promise.all(
      storyTags.map(async (storyTag) =>
        Tag.findOne({
          where: {
            id: storyTag.tagId,
          },
        })
      )
    );

    const commentsNoAuthor = await Comment.findAll({
      where: {
        storyId: req.params.storyid,
      },
    });

    const comments = await Promise.all(
      commentsNoAuthor.map(async (comment) => {
        comment.dataValues.author = await Profile.findOne({
          where: {
            id: comment.profileId,
          },
        });
        return comment;
      })
    );

    const reviewsNoAuthor = await Review.findAll({
      where: {
        storyId: req.params.storyid,
      },
    });

    const reviews = await Promise.all(
      reviewsNoAuthor.map(async (review) => {
        review.dataValues.author = await Profile.findOne({
          where: {
            id: review.profileId,
          },
        });
        return review;
      })
    );

    const totalRating = story.totalRating;
    const numRatings = story.numRatings;

    let averageRating;
    if (numRatings > 0) {
      averageRating = totalRating / numRatings;
      averageRating = Math.round(averageRating * 100) / 100;
    } else {
      averageRating = null;
    }
    const ratingInfo = {
      averageRating,
      numRatings,
    };

    res.json({ story, tags, comments, reviews, ratingInfo });
  } catch (error) {
    next(error);
  }
});
