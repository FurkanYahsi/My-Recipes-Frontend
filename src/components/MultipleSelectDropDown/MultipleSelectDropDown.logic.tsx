import { useState, useEffect, useRef } from "react";

interface useMultipleSelectDropDownProps {
    selectedOptions?: string[];
    setSelectedOptions?: (options: string[]) => void;
}

const useMultipleSelectDropDown = ({selectedOptions, setSelectedOptions}:useMultipleSelectDropDownProps) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const selectRef = useRef<HTMLDivElement>(null);


    const toggleOptions = (option:string) => {
        if (selectedOptions && setSelectedOptions && Array.isArray(selectedOptions)) {
            if (selectedOptions.includes(option)) {
                setSelectedOptions(selectedOptions.filter(opt => opt !== option));
            } else {
                setSelectedOptions([...selectedOptions, option]);
            }
        } else if (setSelectedOptions) {
            // If selectedOptions is not an array or is undefined, create a new array
            setSelectedOptions([option]);
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
    }, [selectedOptions]);

  return {
    toggleOptions,
    isMenuOpen,
    setIsMenuOpen,
    menuRef,
    selectRef
  }
}

export default useMultipleSelectDropDown
