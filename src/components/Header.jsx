import React from 'react';
import { Link } from 'react-router-dom';

// The component now accepts a 'navLinks' prop.
// Default to an empty array to prevent errors if it's not provided.
const Header = ({ navLinks = [] }) => {
    const publicUrl = process.env.PUBLIC_URL;

    return (
        <header className="main-header" id="top">
            <div className="logo">
                <img src={`${publicUrl}/icon.png`} alt="The Creed Logo" />
            </div>
            <nav>
                <ul>
                    {/* Map over the navLinks array to dynamically create list items */}
                    {navLinks.map((link, index) => (
                        <li key={index}>
                            {/* We use a ternary operator to decide if it's a regular <a> tag (for hash links)
                                or a React Router <Link> (for page navigation) */}
                            {link.path.startsWith('/#') ? (
                                <a href={link.path}>{link.label}</a>
                            ) : (
                                <Link to={link.path}>{link.label}</Link>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Header;