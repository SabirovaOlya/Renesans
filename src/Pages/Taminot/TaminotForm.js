import React, { useState } from 'react';
import TillaBuyum from '../../TableParts/TillaBuyum';
import Transport from '../../TableParts/Transport/Transport';
import UchinchiShaxs from '../../TableParts/UchinchiShaxs';
import Sugurta from '../../TableParts/Sugurta/Sugurta';
import { AiOutlineRollback } from 'react-icons/ai';
import { Link,useLocation } from 'react-router-dom';
import Select from 'react-select';

import './Taminot.css';

function TaminotForm() {

    const location = useLocation()
    const orderId = location?.state?.id
    console.log(orderId)

    const colourStyles = {
        control: styles => ({ ...styles, backgroundColor: 'white' }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isSelected ? 'rgb(215,215,215)' : 'white',
                color: 'black',
                margin: '0 5px',
                width: 'cal(100% - 10px)',
                fontWeight: 500,
                borderRadius: '5px',
                border: isSelected ? '2px solid rgb(215,215,215)' : '2px solid white',
                cursor: isDisabled ? 'not-allowed' : 'default',
                "&:hover": {
                    border: '2px solid rgb(215,215,215)'
                    // color:'white'
                }
            };
        },
    };

    // Selector
    const options = [
        { value: '1', label: "Tilla Buyumlar Kafilligi" },
        { value: '2', label: "Transport Vositasi Garovi" },
        { value: '3', label: "3 shaxs kafilligi" },
        { value: '4', label: "Sugurta kompaniyasi sugurta polisi" }
    ];

    const [selectedSector, setSelectedSector] = useState(1)

    const sectorChoosing = () => {
        if (selectedSector == 1) {
            return (<TillaBuyum type={selectedSector} orderId={orderId}/>)
        } else if (selectedSector == 2) {
            return (<Transport type={selectedSector} orderId={orderId}/>)
        } else if (selectedSector == 4) {
            return (<Sugurta type={selectedSector} orderId={orderId}/>)
        } else {
            return (<UchinchiShaxs type={selectedSector} orderId={orderId}/>)
        }
    }

    return (
        <section>
            <Link to='/taminot' className='clientform_back back-back'>
                <AiOutlineRollback />
                Orqaga
            </Link>
            <div className='taminot_tableform'>
                <div className='taminot_table'>
                    <div className='rare'>
                        <p>Taminot turi</p>
                        <Select
                            width='100%'
                            // value={selectedOption}
                            // onChange={(event)=>{setSelectedSector(event.target.value)}}
                            onChange={(e) => setSelectedSector(e.value)}
                            defaultValue={options[0]}
                            options={options}
                            className='buyurtma_select_taminot'
                            styles={colourStyles}
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    borderRadius: '10px',
                                    primary25: 'rgb(216,215,215)',
                                    primary: '#7828c8',
                                },
                            })}
                        />
                    </div>
                    {
                        sectorChoosing()
                    }
                </div>
            </div>
        </section>
    )
}

export default TaminotForm