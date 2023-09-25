import classes from './Pagination.module.scss'
import React, {FC, PropsWithChildren} from "react"

interface PaginationProps {
    onNextPageClick: () => void;
    onPrevPageClick: () => void;
    disable: {
        left: boolean;
        right: boolean;
    }
    nav?: {
        current: number;
        total: number;
    }
}

export const Pagination: FC<PropsWithChildren<PaginationProps>> = React.memo(({nav = null,onNextPageClick, onPrevPageClick, disable}) => {
    const handleNextPageClick = () => {
        onNextPageClick()
    }
    const handlePrevPageClick = () => {
        onPrevPageClick()
    }

    return (
        <div className={classes.Pagination}>
            <button
                className={classes.Arrow}
                disabled={disable.left}
                onClick={handleNextPageClick}
            >
                {"<"}
            </button>

            {nav && (
                <span>{nav.current} / {nav.total}</span>
            )}

            <button
                className={classes.Arrow}
                disabled={disable.right}
                onClick={handlePrevPageClick}
            >
                {">"}
            </button>
        </div>
    )
})