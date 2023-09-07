const { User, Thought } = require('../models');

module.exports = {
  //  to get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //  to get single thought by the id
  async getSingleThoughtById(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err)
    }
  },
  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));

  },
  // Updates a thought using the findOneAndUpdate method. Uses the ID, and the $set operator in mongodb to inject the request body. Enforces validation.
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Delete a thought from the database. Looks for a thought by ID.
  // Then,  if the thought exists, we look for any users associated with the thought based on his thought ID and update the thoughts array for the User.
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      const user = await User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Thought created but no user with this id!',
        });
      }

      res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

//     to create a reaction stored in a single thought's reactions array field
  async createReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { new: true, runValidators: true }
      );
      if (!reaction) {
        return res.status(404).json({ message: 'No reaction with this id!' });
      }
      res.json(reaction);
  } catch (err) {
      res.status(500).json(err);
    }
  },
//     to remove a reaction by the reaction's reactionId value
  async removeReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { new: true }
      );
      if (!reaction) {
        return res.status(404).json({ message: 'No reaction with this id!' });
      }
      res.json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};