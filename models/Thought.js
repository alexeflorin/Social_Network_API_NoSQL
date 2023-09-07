const { Schema, model, Types } = require('mongoose');

const { DateTime } = require("luxon");

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            // Use Mongoose's ObjectId data type
            default: new Types.ObjectId(),
            // Default value is set to a new ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
            // max length of 280 characters
        },
        username: {
            type: String,
            required: true,
            // username is required
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => createdAtVal.toDateString(),
            // date and time of when the reaction was created
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false

    });


const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            // max length of 280 characters
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => createdAtVal.toDateString(),
            // date and time of when the reaction was created

        },
        username: {
            type: String,
            required: true,
            // username is required
        },
        reactions: [ReactionSchema],
    },

    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    }
);


ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);
// create a new instance of the Thought model using the ThoughtSchema





module.exports = Thought;

// export the Thought model


