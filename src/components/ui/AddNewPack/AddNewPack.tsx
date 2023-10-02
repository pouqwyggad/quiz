import classes from './AddNewPack.module.scss'
import React, {FC, PropsWithChildren, useState} from "react"
import {CloseIcon} from "../../icons/CloseIcon";
import {TextField} from "../TextField/TextField";

interface AddNewPackProps {

}

export const AddNewPack: FC<PropsWithChildren<AddNewPackProps>> = ({}) => {
    const [packName, setPackName] = useState("")

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPackName(e.target.value)
    }

    return (
       <div className={classes.Wrapper}>
           <div className={classes.Container}>
               <div className={classes.Title}>
                   <h3>Add new pack</h3>
                   <CloseIcon/>
               </div>

               <hr/>

               <div className={classes.ContainerSectionTwo}>
                   <TextField
                       onChange={handleChangeValue}
                       text={"Add new pack"}
                       name={"addPack"}
                       packName={packName}
                   />
               </div>
           </div>
       </div>
    )
}