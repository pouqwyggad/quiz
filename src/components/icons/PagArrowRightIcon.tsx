import {FC, PropsWithChildren} from "react"

interface PagArrowRightIconProps {
    className?: string
}

export const PagArrowRightIcon: FC<PropsWithChildren<PagArrowRightIconProps>> = ({className}) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="6" height="9" viewBox="0 0 6 9"
             fill="none">
            <path d="M1 7.93311L5 4.50129L1 1.00004" stroke="black"/>
        </svg>
    )
}