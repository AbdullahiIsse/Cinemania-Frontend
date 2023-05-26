import {useState, useContext} from 'react';
import {createStyles, Table, ScrollArea, rem, Button} from '@mantine/core';
import {FavoritesContext} from "../../Context/FavoritesContext.tsx";
import {UserContext} from "../../Context/UserContext.tsx";

const useStyles = createStyles((theme) => ({
    header: {
        position: 'sticky',
        top: 0,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        transition: 'box-shadow 150ms ease',

        '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            borderBottom: `${rem(1)} solid ${
                theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
            }`,
        },
    },

    scrolled: {
        boxShadow: theme.shadows.sm,
    },
}));

interface TableScrollAreaProps {
    data: { id: number; title: string; releaseDate: string; voteAverage: number }[];
}

export function FavoritesList({data}: TableScrollAreaProps) {
    const {removeFavoritesListItem} = useContext(FavoritesContext)
    const {currentUser} = useContext(UserContext)
    const {classes, cx} = useStyles();
    const [scrolled, setScrolled] = useState(false);

    const rows = data.map((row) => (
        <tr key={row.id}>
            <td>{row.title}</td>
            <td>{row.releaseDate}</td>
            <td>{row.voteAverage}</td>
            <td>
                <Button onClick={()=>removeFavoritesListItem(currentUser.uid,row.id) }>Delete</Button>

            </td>
        </tr>
    ));



    return (
        <div>
            <h3>Favorite List</h3>
            <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
                <Table miw={700}>
                    <thead className={cx(classes.header, {[classes.scrolled]: scrolled})}>
                    <tr>
                        <th>Title</th>
                        <th>ReleaseDate</th>
                        <th>VoteAverage</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </ScrollArea>
        </div>

    );
}