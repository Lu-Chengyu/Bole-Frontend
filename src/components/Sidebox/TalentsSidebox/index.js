import React, {useState,useRef, useEffect } from 'react';
import "./styles.css"

const TalentsSidebox = () => {
    const menuItems = [
        {
          label: 'Engineer',
          submenu: [
            { label: 'Software' },
            { label: 'Hardware' },
          ],
        },
        {
          label: 'Accounting',
          submenu: [
            { label: 'Software' },
            { label: 'Hardware' },
          ],
        },
        {
          label: 'Manager',
          submenu: [
            { label: 'Software' },
            { label: 'Hardware' },
          ],
        },
        {
            label: 'people',
            submenu: [
              { label: 'Software' },
              { label: 'Hardware' },
            ],
          },
      ];


      const [activeMainItem, setActiveMainItem] = useState(null);
      const [submenusVisible, setSubmenusVisible] = useState({});
      const mainMenuRef = useRef(null);

      const [selectedSubmenuItem, setSelectedSubmenuItem] = useState(null);

      const handleMainItemClick = (index) => {
        setActiveMainItem(index);
        setSubmenusVisible({ ...submenusVisible, [index]: !submenusVisible[index] });
      };

      useEffect(() => {
        const handleClickOutside = (event) => {
          if (mainMenuRef.current && !mainMenuRef.current.contains(event.target)) {
            setSubmenusVisible({});
          }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, [mainMenuRef]);

      const handleSubmenuClick = (event, label) => {
        event.stopPropagation();
        setSelectedSubmenuItem(label);
        console.log(selectedSubmenuItem);
      };

    return (
        <div className="nav-side-box">
            <div className="nav-content">
                <div className="content-item">
                    <nav>
                        <ul ref={mainMenuRef}>
                        {menuItems.map((menuItem, index) => (
                            <li
                            key={index}
                            onClick={() => handleMainItemClick(index)}
                            className={activeMainItem === index ? 'active' : null}
                            >
                            {menuItem.label}
                            {submenusVisible[index] && (
                                <nav className="secondary-menu" onClick={handleSubmenuClick}>
                                <ul>
                                    {menuItem.submenu.map((submenuItem, subIndex) => (
                                    <li key={subIndex}>
                                        <a className='job-text' href="#"  onClick={() => setSelectedSubmenuItem(submenuItem.label)}>{submenuItem.label}</a>
                                    </li>
                                    ))}
                                </ul>
                                </nav>
                            )}
                            </li>
                        ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );

};

export default TalentsSidebox;