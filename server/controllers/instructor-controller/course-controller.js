const Course = require("../../models/Course");

const addNewCourse = async (req, res) => {
    try {
        const coureData = req.body;
        const newlyCreatedCourse = new Course(coureData);
        const saveCourse = await newlyCreatedCourse.save();

        if (saveCourse) {
            res.status(201).json({
                success: true,
                message: "Course is created successfully",
                data: saveCourse,
            });
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
    }
};

const getAllCourses = async (req, res) => {
    try {
        const CoursesList = await Course.find({});
        res.status(200).json({
            success: true,
            data: CoursesList,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
    }
};

const getCourseDetailsByID = async (req, res) => {
    try {
        const { id } = req.params;
        const courseDetail = await Course.findById(id);

        if (!courseDetail) {
            return res.status(404).json({
                success: false,
                message: "Course not found!",
            });
        }

        return res.status(200).json({
            success: true,
            data: courseDetail,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
    }
};

const updateCourseByID = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCourseData = req.body;
        const updatedCourse = await Course.findByIdAndUpdate(id, updatedCourseData, { new: true });

        if (!updatedCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found!",
            });
        }

        res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
    }
};

module.exports = { addNewCourse, getAllCourses, getCourseDetailsByID, updateCourseByID };