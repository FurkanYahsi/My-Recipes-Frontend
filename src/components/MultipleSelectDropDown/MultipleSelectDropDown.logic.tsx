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

  return {
    toggleOptions,
    isMenuOpen,
    setIsMenuOpen,
    menuRef,
    selectRef
  }
}

export default useMultipleSelectDropDown
