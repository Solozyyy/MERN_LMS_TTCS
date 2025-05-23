
import InstructorCourses from "@/components/instructor-view/courses";
import InstructorDashboard from "@/components/instructor-view/dashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AuthContext } from "@/context/auth-context";
import { InstructorContext } from "@/context/instructor-context";
import { fetchInstructorCourseListService } from "@/services";
import { BarChart, LogOut, Book } from "lucide-react";
import { useContext, useEffect, useState } from "react";


function InstructorDashboardpage() {

    const [activeTab, setActiveTab] = useState("dashboard");
    const { resetCredentials } = useContext(AuthContext);
    const { instructorCoursesList, setInstructorCoursesList } = useContext(InstructorContext);

    async function fetchAllCourse() {
        const response = await fetchInstructorCourseListService();
        // console.log(response);
        if (response?.success) setInstructorCoursesList(response?.data);
    }
    useEffect(() => {
        fetchAllCourse();
    }, []);

    const menuItems = [
        {
            icon: BarChart,
            label: "DashBoard",
            value: "dashboard",
            component: <InstructorDashboard listOfCourses={instructorCoursesList} />,
        },
        {
            icon: Book,
            label: "Courses",
            value: "courses",
            component: <InstructorCourses listOfCourses={instructorCoursesList} />,
        },
        {
            icon: LogOut,
            label: "Logout",
            value: "logout",
            component: null,
        },
    ];

    function handleLogout() {
        resetCredentials();
        sessionStorage.clear();
    }

    return (<div className="flex h-full min-h-screen bg-gray-100">
        <aside className="w-64 bg-white shadow-md hidden md:block">
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">Instructor View</h2>
                <nav>
                    {
                        menuItems.map((menuItem) => (
                            <Button
                                className="w-full justify-start mb-2"
                                key={menuItem.value}
                                variant={activeTab === menuItem.value ? "secondary" : "ghost"}
                                onClick={menuItem.value === "logout" ?
                                    handleLogout : () => setActiveTab(menuItem.value)
                                }
                            >
                                <menuItem.icon className="mr-2 h-4 w-4" />
                                {menuItem.label}
                            </Button>
                        ))}
                </nav>
            </div>
        </aside>
        <main className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-7x1 mx-auto">
                <h1 className="test-3x1 font-bold mb-8">
                    DashBoard
                </h1>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    {
                        menuItems.map(menuItem => <TabsContent value={menuItem.value}>
                            {
                                menuItem.component !== null ? menuItem.component : null
                            }
                        </TabsContent>

                        )
                    }
                </Tabs>
            </div>

        </main>
    </div>
    );
}

export default InstructorDashboardpage;