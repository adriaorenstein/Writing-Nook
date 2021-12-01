const { User, Profile } = require("./user");
const { Story, Comment, Review, List } = require("./story");
const Tag = require("./tag");
const Story_Tag = require("./story_tag");

Story.belongsTo(Profile);
Profile.hasMany(Story);

Tag.belongsToMany(Story, { through: Story_Tag });
Story.belongsToMany(Tag, { through: Story_Tag });

Story.hasMany(Comment);
Comment.belongsTo(Story);
Comment.belongsTo(Profile);
Profile.hasMany(Comment);

Review.belongsTo(Story);
Review.belongsTo(Profile);
Profile.hasMany(Review);
Story.hasMany(Review);

List.belongsTo(Story);
List.belongsTo(Profile);
Profile.hasMany(List);

module.exports = {
  User,
  Profile,
  Story,
  Comment,
  Review,
  List,
  Tag,
  Story_Tag,
};
