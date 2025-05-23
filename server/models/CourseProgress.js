const mongoose = require("mongoose");

const LecturesProgressSchema = new mongoose.Schema({
    lectureId: String,
    viewed: Boolean,
    dateViewed: Date,
});

const CourseProgressSchema = new mongoose.Schema({
    userId: String,
    courseId: String,
    completed: Boolean,
    conpletionDate: Date,
    lecturesProgress: [LecturesProgressSchema],
});

module.exports = mongoose.model("Progress", CourseProgressSchema);