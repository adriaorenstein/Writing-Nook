const db = require("../server/db");
const {
  User,
  Tag,
  Story_Tag,
  Story,
  Profile,
  Review,
  Comment,
} = require("../server/db/models");

const storyData = [
  {
    title: `The Great Seeding Tragedy`,
    description: `After accidentally reseeding her database, a devastated programmer must cope with the loss of her beautiful made-up stories.`,
    storytext: `Adria gaped at the blank database. "No," the quivering word melted into the silent air. "NO!" She threw her fists against the keyboard, raging like a Javascript file with an extra bracket. The world was over. Really. Truly. Done-zo. And she learned to never, ever, EVER store important seeding data outside of the seed file.`,
    profileId: 1,
  },
  {
    title: `Barry Rotter and the Wizard's Rock`,
    description: `A boy named Barry Rotter goes to an Unspecified Wizard School and gets into all kinds of wizardly trouble.`,
    storytext: `Once upon a time there was a boy named Barry Rotter. He was awful and mean and liked to pick his nose and wipe it on his peers. One day, a wizard dude showed up and told him that he was so awful, all the world's governments came together and unanimously agreed he should leave this plane of existence. So he did, and he went to Unspecified Wizard School where he learned spells and sorcery and had a grand time until a dragon ate him and he died terribly. The end.`,
    totalRating: 4,
    numRatings: 1,
    profileId: 1,
  },
  {
    title: `An Unbiased Review of Little Debbie's Cosmic Brownies`,
    description: `A completely unbiased review of delicious, all-natural, non-GMO Little Debbie's Cosmic Brownies as told by a totally random consumer.`,
    storytext: `I love Little Debbie's all-natural, non-GMO Cosmic Brownies. They're the best food I have ever experienced and as a real, living person, I have experienced many foods. My favorite thing about Little Debbie's all-natural, non-GMO Cosmic Brownies is the fact that their chocolatey goodness helped me forget about the death of my favorite great aunt Catherine and the rapid mental decline that proceeded it, ultimately culminating in a nasty divorce and the death of my favorite cat, Great Aunt Cat-herine. My second favorite thing about Cosmic Brownies is the tasty sprinkles. As a totally random, unbiased consumer, I would definitely reccommend Little Debbie's all-natural, non-GMO Cosmic Brownies. And also if you've heard any rumors about Little Debbie's all-natural, non-GMO Cosmic Brownie sprinkles getting their crunch from the bones of endangered meerkats, it is totally* false. Sincerely, Little Debbie. I mean, not Little Debbie. Damnit. *not`,
    totalRating: 4,
    numRatings: 2,
    profileId: 2,
  },
  {
    title: `Literally Just Cosmic Brownie`,
    description: `This is literally just a story that says 'Cosmic Brownie'. As in, just the two words 'Cosmic Brownie'. You can click on it, but I've just told you what it says so there's really no need. Unless you don't trust me, of course. But you trust me, right? ...Right? Look, I'm telling you, honestly, it's JUST the word 'Cosmic', as in space-y thing and 'Brownie', as in chocolate dessert. 'Cosmic Brownie'. That's it. No hidden message. No special metaphors. It's a waste of your time and mine. Actually, you probably should've stopped reading four sentences ago but we clearly have some trust issues going on here. But come on. Don't click it. Just believe me.`,
    storytext: "Cosmic Brownie",
    totalRating: 7,
    numRatings: 2,
    profileId: 2,
  },
];

const tagData = [
  {
    tag: `loss`,
  },
  {
    tag: `tragedy`,
  },
  {
    tag: `epic`,
  },
  {
    tag: `wizard`,
  },
  {
    tag: `fantasy`,
  },
  {
    tag: `brownie`,
  },
  {
    tag: `food`,
  },
  {
    tag: `review`,
  },
  {
    tag: `trust`,
  },
  {
    tag: `story`,
  },
];

const storyTagData = [
  {
    tagId: 1,
    storyId: 1,
  },
  {
    tagId: 2,
    storyId: 1,
  },
  {
    tagId: 3,
    storyId: 1,
  },
  {
    tagId: 10,
    storyId: 1,
  },
  {
    tagId: 3,
    storyId: 2,
  },
  {
    tagId: 4,
    storyId: 2,
  },
  {
    tagId: 5,
    storyId: 2,
  },
  {
    tagId: 10,
    storyId: 2,
  },
  {
    tagId: 6,
    storyId: 3,
  },
  {
    tagId: 7,
    storyId: 3,
  },
  {
    tagId: 8,
    storyId: 3,
  },
  {
    tagId: 9,
    storyId: 3,
  },
  {
    tagId: 10,
    storyId: 3,
  },
  {
    tagId: 6,
    storyId: 4,
  },
  {
    tagId: 7,
    storyId: 4,
  },
  {
    tagId: 10,
    storyId: 4,
  },
];

const profileData = [
  {
    firstName: "Adria",
    lastName: "Orenstein",
    username: "itsadria",
    status: `Just saw my hamster eat some sawdust`,
    bio: `Oops, I forgot to write a bio`,
    favoriteBooks: `Harry Potter, Divergent, Hunger Games`,
    characterDoppel: `Lord Voldemort`,
    googleId: `115086973879473840267`,
  },
  {
    firstName: "Cosmic",
    lastName: "Brownie",
    username: "cosmicb",
    status: `Just bein' a dessert 8)`,
    bio: `I was born in the Little Debbie's factory. I love being delicious and I hate when Adria puts me in the microwave for too long and burns my chocolatey exterior`,
    favoriteBooks: `Martha Stewart's Cookbooks, The Autobiography of Little Debbie`,
    characterDoppel: `The brownie in the background of Ratatouille`,
    googleId: `101228066673329322453`,
  },
];

const reviewData = [
  {
    rating: 3,
    reviewtext: `It's a pretty average story. Exactly what you'd expect from a pretty average dessert, really.`,
    storyId: 3,
    profileId: 2,
  },
  {
    rating: 1,
    reviewtext: `Terrible! Terrible! Terrible! Promotes UNHEALTHY EATING HABITS. Shame on you, Little Debbie. Shame!`,
    storyId: 3,
    profileId: 1,
  },
  {
    rating: 5,
    reviewtext: `This was an incredibly moving piece. I've never cried so hard in my whole life, and I work at the Onion Goggle Factory, where they test the effectiveness of onion-resistant goggles by squirting onion juice in our eyes. 5 stars. Brilliant.`,
    storyId: 4,
    profileId: 1,
  },
  {
    rating: 2,
    reviewtext: `I don't get what the other guy was talking about. This piece wasn't moving at all and, believe me, I know a lot about crying as I work at the Flamethrower Goggle Factory, where they test the effectiveness of flamethrower-resistant goggles by shooting fireballs in our eyes. Granted, I don't have eyes anymore, so that might've contributed to the lack of tears. Still, 1 star. Could be sadder.`,
    storyId: 4,
    profileId: 2,
  },
  {
    rating: 4,
    reviewtext: `A very enjoyable story! It sounded kind of familiar, but I'm not sure why...`,
    storyId: 2,
    profileId: 2,
  },
];

const commentData = [
  {
    commenttext: "Woah. I did not see that twist coming",
    storyId: 4,
    profileId: 2,
  },
  {
    commenttext:
      "pleeeeeease make a part two!!!!! I need to know what happens!!!!!",
    storyId: 4,
    profileId: 1,
  },
  {
    commenttext: "damn that sux",
    storyId: 1,
    profileId: 2,
  },
  {
    commenttext: "well you convinced me! LolLOLOLOL XD",
    storyId: 3,
    profileId: 2,
  },
  {
    commenttext: `Why do I feel like I've just been... advertised to?`,
    storyId: 3,
    profileId: 1,
  },
];

async function seed() {
  await db.sync({ force: true });
  console.log("db synced!");

  for (profile of profileData) {
    await Profile.create(profile);
  }

  for (story of storyData) {
    await Story.create(story);
  }

  for (tag of tagData) {
    await Tag.create(tag);
  }

  for (storytag of storyTagData) {
    await Story_Tag.create(storytag);
  }

  for (review of reviewData) {
    await Review.create(review);
  }

  for (comment of commentData) {
    await Comment.create(comment);
  }
}

async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.log(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

if (module === require.main) {
  runSeed();
}
