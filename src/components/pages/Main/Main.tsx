import classes from './Main.module.scss'
import {FC, PropsWithChildren, useCallback, useEffect, useState} from "react"
import {Filters} from "../../ui/Filters/Filters";
import {LayoutList} from "../../ui/LayoutList/LayoutList";
import {Pagination} from "../../ui/Pagination/Pagination";
import {data} from "./data";
import {DataType} from "./dataType";
import {Button} from "../../ui/Button/Button";
import {AddNewPack} from "../../ui/AddNewPack/AddNewPack";

interface MainProps {}

const ROWS_PER_PAGE = 10;

const getTotalPageCount = (rowCount: number): number => Math.ceil(rowCount / ROWS_PER_PAGE);

export const Main: FC<PropsWithChildren<MainProps>> = ({}) => {
    const [dataset, setDataset] = useState<DataType[]>(data)
    const [page, setPage] = useState(1)
    const [newPackStatus, setNewPackStatus] = useState<boolean>(false)
    // const [isLoading, setIsLoading] = useState()
    // const [error, setError] = useState()

    const addCardHandler = () => {
        setNewPackStatus(n => !n)
    }

    const handleNextPageClick = useCallback(() => {
        const current = page
        const next = current + 1
        const total = dataset ? getTotalPageCount(dataset.length) : current
        setPage(next <= total ? next : current);
    }, [page, dataset])


    const handlePrevPageClick = useCallback(() => {
        const current = page
        const prev = current - 1
        setPage(prev > 0 ? prev : current);
    }, [page])

    return (
        <div className={classes.Main}>
            <div className={"flex justify-between mb-[34px]"}>

                <div className={classes.PageTitle}>Packs List</div>

                <Button
                    sidePadding={28}
                    type={"blue"}
                    text={"Add new pack"}
                    onClick={addCardHandler}
                />

                {newPackStatus && (
                    <AddNewPack/>
                )}

            </div>

            <Filters/>

            <LayoutList
                data={dataset}
            />

            <Pagination
                onNextPageClick={handleNextPageClick}
                onPrevPageClick={handlePrevPageClick}
                disable={{
                    left: page === 1,
                    right: page === getTotalPageCount(dataset.length),
                }}
                nav={{current: page, total: getTotalPageCount(dataset.length)}}
            />

        </div>
    )
}