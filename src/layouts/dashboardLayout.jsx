import Sidebar from "../components/sidebar/sidebar";
import Navbar from "../components/navbar/navbar";
import SearchContext from "../contexts/SearchContext";
import { useState } from "react";

function DashboardLayout({ children, activeItem = "dashboard" }) {
    const [searchValue, setSearchValue] = useState("");

    return (

        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
            <div style={{ display: "flex" }}>

                <Sidebar activeItem={activeItem} />

                <div style={{

                    flex: 1,

                    background: "#f7f8fa"

                }}>

                    <Navbar />

                    <div style={{ padding: "30px" }}>

                        {children}

                    </div>

                </div>

            </div>
        </SearchContext.Provider>

    )

}

export default DashboardLayout;