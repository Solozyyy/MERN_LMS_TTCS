import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell
} from "@/components/ui/table";
import { courseCurriculumInitialFormData, courseLandingInitialFormData } from "@/config";
import { InstructorContext } from "@/context/instructor-context";
import { Delete, Edit } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// 5:47:21
function InstructorCourses({ listOfCourses }) {

    const navigate = useNavigate();
    const { setCurrentEditedCourseId, setCourseLandingFormData,
        setCourseCurriculumFormData, } = useContext(InstructorContext);

    return (
        <Card>
            <CardHeader className="flex justify-between flex-row items-center">
                <CardTitle className="text-3xl front-extrabold">All Courses</CardTitle>
                <Button
                    onClick={() => {
                        setCurrentEditedCourseId(null);
                        //set new course if not do it here useEffect useEffect(() => {
                        //if (params) setCurrentEditedCourseId(params?.courseId);
                        //});
                        // will load the current course 
                        setCourseLandingFormData(courseLandingInitialFormData);
                        setCourseCurriculumFormData(courseCurriculumInitialFormData);
                        navigate("/instructor/create-new-course");
                    }}
                    className="p-6"
                >
                    Create New Course
                </Button>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Course</TableHead>
                                <TableHead>Students</TableHead>
                                <TableHead>Revenue</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                listOfCourses && listOfCourses.length > 0 ?
                                    listOfCourses.map((course) => <TableRow>
                                        <TableCell className="font-medium">
                                            {course?.title}
                                        </TableCell>
                                        <TableCell>{course?.students?.length}</TableCell>
                                        <TableCell>{course?.pricing}</TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                onClick={() => {
                                                    navigate(`/instructor/edit-course/${course?._id}`);
                                                }}
                                                variant="ghost"
                                                size="sm"
                                            >
                                                <Edit className="h-6 w-6" />
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                                <Delete className="h-6 w-6" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>)
                                    : null
                            }

                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card >
    );
}

export default InstructorCourses;