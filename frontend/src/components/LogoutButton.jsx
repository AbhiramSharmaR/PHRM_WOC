import React from "react";

export default function LogoutButton() {
    const logout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("role");
        window.location.href = "/";  // redirect to login/signup
    };

    return (
        <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
        >
            Logout
        </button>
    );
}
