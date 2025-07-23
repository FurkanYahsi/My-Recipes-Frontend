import './DropdownMenuElement.css';

import { IconBaseProps } from "react-icons";
import { MdDone } from "react-icons/md";

const IconDone = MdDone as React.FC<IconBaseProps>;

interface DropdownMenuElementProps {
    header: string;
    items: string[];
    img?: string;
    selectedCategories?: string[];
    setSelectedCategories?: (options: string[]) => void;
    selectedTypes?: string[];
    setSelectedTypes?: (options: string[]) => void;
}

const DropdownMenuElement: React.FC<DropdownMenuElementProps> = ({header, items, img, selectedCategories, setSelectedCategories, selectedTypes, setSelectedTypes}) => {

    const toggleCategory = (category: string) => {
        if (selectedCategories && setSelectedCategories) {
            if (selectedCategories.includes(category)) {
                setSelectedCategories(selectedCategories.filter(cat => cat !== category));
            } else {
                setSelectedCategories([...selectedCategories, category]);
            }
        }
    };

    const toggleType = (type: string) => {
        if (selectedTypes && setSelectedTypes) {
            if (selectedTypes.includes(type)) {
                setSelectedTypes(selectedTypes.filter(t => t !== type));
            } else {
                setSelectedTypes([...selectedTypes, type]);
            }
        }
    };

  return (
    <>
        <div className='main-wrapper'>

            <div className='mini-img'>
                <img src={img} alt="mini-img" />
            </div>

            <div className='content'>

                <div className='header' onClick={() => toggleCategory(header)}>
                    {header}
                    {selectedCategories && selectedCategories.includes(header) ? <IconDone style={{color:'green'}}/> : ''}                       
                </div>
                
                <div className='items-wrapper'>
                    {items.map((item, index) => {
                        return (
                            <div key={index} className="items" onClick={() => toggleType(item)}>
                                {item}
                                <span className="check-icon">
                                    {selectedTypes && selectedTypes.includes(item) && 
                                        <IconDone style={{color:'green'}}/>
                                    }
                                </span>     
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    </>
  )
}

export default DropdownMenuElement
