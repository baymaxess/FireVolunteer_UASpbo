import "./navbar.css";

import { FaSearch, FaMapMarkerAlt, FaRegUserCircle } from "react-icons/fa";
import { useContext } from "react";
import SearchContext from "../../contexts/SearchContext";

function Navbar() {
    const { searchValue, setSearchValue } = useContext(SearchContext);

    return (

        <header className="navbar">

            <div className="location">

                <FaMapMarkerAlt />

                Wilayah Jakarta Pusat

            </div>

            <div className="search">

                <FaSearch />

                <input

                    type="text"

                    value={searchValue}

                    onChange={(e) => setSearchValue(e.target.value)}

                    placeholder="Search data..."

                />

            </div>

            <div className="profile">

                <div>

                    <h4>Budi Santoso</h4>

                    <span>COORDINATOR</span>

                </div>

                <div className="profile-icon">

                    <FaRegUserCircle />

                </div>

            </div>

        </header>

    )

}

export default Navbar;