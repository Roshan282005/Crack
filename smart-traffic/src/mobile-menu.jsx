//mobile-menu.jsx
import React, { memo } from "react";

const MobileMenu = memo(({ menuOpen, setMenuOpen }) => {
  if (!menuOpen) return null;

  return (
    <div className="md:hidden border-t bg-gray-50 animate-fadeIn">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-3">
        {["home", "features", "dashboard", "contact"].map((section) => (
          <a
            key={section}
            href={`#${section}`}
            onClick={() => setMenuOpen(false)}
            className="hover:text-indigo-600"
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </a>
        ))}
      </div>
    </div>
  );
});

export default MobileMenu;
