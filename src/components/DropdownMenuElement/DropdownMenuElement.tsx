import './DropdownMenuElement.css';

interface DropdownMenuElementProps {
    header: string;
    items: string[];
    img?: string;
}

const DropdownMenuElement: React.FC<DropdownMenuElementProps> = ({header, items, img}) => {
  return (
    <>
        <div className='main-wrapper'>

            <div className='mini-img'>
                <img src={img} alt="mini-img" />
            </div>

            <div className='content'>

                <div className='header'>
                    {header}      
                </div>
                
                <div className='items-wrapper'>
                    {items.map((item, index) => {
                        return (
                            <div key={index} className="items">
                                {item}
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
