const { User, Profile } = require("../db/models");
const router = require("express").Router();
module.exports = router;

router.get("/getuserprofile/:googleId", async (req, res, next) => {
  try {
    let profile = await Profile.findOne({
      where: {
        googleId: req.params.googleId,
      },
    });
    res.json(profile);
  } catch (error) {
    next(error);
  }
});

router.get("/getdisplayprofile/:profileId", async (req, res, next) => {
  try {
    let profile = await Profile.findOne({
      where: {
        id: req.params.profileId,
      },
    });
    res.json(profile);
  } catch (error) {
    next(error);
  }
});

router.post("/postprofile", async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      username,
      status,
      bio,
      favoriteBooks,
      characterDoppel,
    } = req.body.profile;
    const userId = req.body.user.id;
    const googleId = req.body.user.googleId;
    let userProfile = await Profile.create({
      firstName,
      lastName,
      username,
      status,
      bio,
      favoriteBooks,
      characterDoppel,
      userId,
      googleId,
    });
    res.json(userProfile);
  } catch (error) {
    console.log("error", error);
    next(error);
  }
});

router.put("/updateprofile", async (req, res, next) => {
  try {
    const {
      id,
      firstName,
      lastName,
      username,
      status,
      bio,
      favoriteBooks,
      characterDoppel,
    } = req.body.profile;
    profileId = req.body.profileId;
    await Profile.update(
      {
        firstName,
        lastName,
        username,
        status,
        bio,
        favoriteBooks,
        characterDoppel,
      },
      {
        where: {
          id: profileId,
        },
      }
    );
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});
