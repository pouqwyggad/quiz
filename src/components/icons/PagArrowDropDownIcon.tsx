import {FC, PropsWithChildren} from "react"

interface PagArrowDropDownIconProps {
    className?: string
}

export const PagArrowDropDownIcon: FC<PropsWithChildren<PagArrowDropDownIconProps>> = ({className}) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="8" height="5" viewBox="0 0 8 5"
             fill="none">
            <path d="M1 1L4 4L7 1" stroke="black"/>
        </svg>
    )
}