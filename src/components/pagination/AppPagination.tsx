import {Pagination} from "@mantine/core";


interface AppPaginationProps {
    activePage: number;
    setPage: (page: number) => void;
}

const AppPagination = ({activePage,setPage}:AppPaginationProps) => {

    return (
        <div>
            <Pagination
                total={500}
                position="center"
                styles={(theme) => ({
                    control: {
                        '&[data-active]': {
                            backgroundImage: theme.fn.gradient({ from: 'red', to: 'yellow' }),
                        },
                    },
                })}
                value={activePage}
                onChange={setPage}
            />
        </div>
    )


};

export default AppPagination;