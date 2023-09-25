import {FC, PropsWithChildren} from "react"

interface ArrowBackIconProps {
    className?: string
}

export const ArrowBackIcon: FC<PropsWithChildren<ArrowBackIconProps>> = ({className}) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
             fill="none">
            <path d="M20 12.5H6M6 12.5L10.6667 8M6 12.5L10.6667 17" stroke="black" strokeWidth="2"/>
        </svg>)
}