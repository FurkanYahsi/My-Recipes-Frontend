import React, { useState, useEffect, useRef } from "react";
import './MultipleSelectDropDown.css';

import { IconBaseProps } from "react-icons";
import { MdDone } from "react-icons/md";

const IconDone = MdDone as React.FC<IconBaseProps>;

interface MultipleSelectDropDownProps {
    header?: string;
    options: string[];
    selectedOptions?: string[];
    setSelectedOptions?: (options: string[]) => void;
}

const MultipleSelectDropDown: React.FC<MultipleSelectDropDownProps> = ({header, options, selectedOptions, setSelectedOptions}) => {
 
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const selectRef = useRef<HTMLDivElement>(null);

    const toggleOptions = (option:string) => {
        if (selectedOptions && setSelectedOptions) {
            if (selectedOptions.includes(option)) {
                setSelectedOptions(selectedOptions.filter(opt => opt !== option));
            } else {
                setSelectedOptions([...selectedOptions, option]);
            }
        }
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node) && selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
    <div className="multiple-select-dropdown-container">
        {header && <div className="multiple-select-header">{header}</div>}

        <div className="choose" onClick={()=>setIsMenuOpen(!isMenuOpen)} ref={selectRef}>
            {selectedOptions && selectedOptions.length > 0 ? selectedOptions.join(', ') : 'Select'}
        </div>

        {isMenuOpen && (
            <div className="multiple-select-dropdown-menu" ref={menuRef}>
                {options.map((option, index) => (
                    <div className="option-box"  style={{ borderBottom: index !== options.length - 1 ? '1px solid #ccc' : 'none', }} key={index} onClick={() => toggleOptions(option)}>
                        {option}
                        <span className="checkbox">
                            {selectedOptions && selectedOptions.includes(option) && <div className="check-box"> <IconDone style={{color:'green'}}/></div>}
                        </span>
                    </div>
                ))}
                <button className="done-button" onClick={() => setIsMenuOpen(false)}>Done</button>
            </div>
        )}
    </div>
  )
}

export default MultipleSelectDropDown