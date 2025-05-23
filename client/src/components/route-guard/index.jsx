import { Navigate, useLocation } from "react-router-dom";
import { Fragment } from "react";

function RouteGuard({ authenticated, user, element }) {
    const location = useLocation();

    console.log(authenticated, user, "useruser");

    // ❌ Chưa đăng nhập → về /auth
    if (!authenticated && !location.pathname.includes("/auth")) {
        return <Navigate to="/auth" replace />;
    }

    // ❌ User thường cố vào trang của instructor
    if (authenticated && user?.role !== "instructor" &&
        (location.pathname.includes("instructor") || location.pathname.includes("/auth"))
    ) {
        return <Navigate to="/home" replace />;
    }

    // ✅ Instructor → ép về /instructor
    if (authenticated && user.role === "instructor" && !location.pathname.includes("instructor")) {
        return <Navigate to="/instructor" replace />;
    }

    return <Fragment>{element}</Fragment>;
}

export default RouteGuard;