
const Course = require("../../models/Course");
const StudentsCourses = require("../../models/StudentCourses");

const getAllStudentViewCourses = async (req, res) => {
    try {
        const {
            category = [],
            level = [],
            primaryLanguage = [],
            sortBy = "price-lowtohigh",
        } = req.query;

        let filters = {};
        if (category.length) {
            filters.category = { $in: category.split(",") };
        }

        if (level.length) {
            filters.level = { $in: level.split(",") };
        }

        if (primaryLanguage.length) {
            filters.primaryLanguage = { $in: primaryLanguage.split(",") };
        }

        let sortParam = {};

        switch (sortBy) {
            case "price-lowtohigh":
                sortParam.pricing = 1;
                break;
            case "price-hightolow":
                sortParam.pricing = -1;
                break;
            case "title-atoz":
                sortParam.title = 1;
                break;
            case "title-ztoa":
                sortParam.title = -1;
                break;
            default:
                sortParam.pricing = 1;
                break;
        }
        const coursesList = await Course.find(filters).sort(sortParam);

        res.status(200).json({
            success: true,
            data: coursesList,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        })
    }
}

const getStudentViewCourseDetails = async (req, res) => {
    try {
        const { id, studentId } = req.params;
        const courseDetails = await Course.findById(id);

        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: "No course details found",
                data: null,
            });
        }
        //check if the current student purchased this course or not 
        const studentCourses = await StudentsCourses.findOne({
            userId: studentId,
        });


        const ifStudentAlreadyBoughtCurrentCourse = studentCourses.courses.findIndex(item => item.courseId === id) > -1;
        console.log(studentCourses, ifStudentAlreadyBoughtCurrentCourse, "studentCourses");
        res.status(200).json({
            success: true,
            data: courseDetails,
            isCoursePurchased: ifStudentAlreadyBoughtCurrentCourse,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        })
    }
}

module.exports = { getAllStudentViewCourses, getStudentViewCourseDetails };