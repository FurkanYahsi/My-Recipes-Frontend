import './DropdownMenuElement.css';
import useDropdownMenuElement from './DropdownMenuElement.logic';
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

    const { toggleCategory, toggleType } = useDropdownMenuElement({selectedCategories, setSelectedCategories, selectedTypes, setSelectedTypes});

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
