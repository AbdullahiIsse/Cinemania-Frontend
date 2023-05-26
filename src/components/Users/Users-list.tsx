import {Button, createStyles, rem, ScrollArea, Table} from "@mantine/core";
import {useContext, useState} from "react";
import {UserContext} from "../../Context/UserContext.tsx";
import {FollowUser, RemoveFollower} from "./Service.tsx";
import {FollowerContext} from "../../Context/FollowContext.tsx";


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
    data: { id: string; displayName: string; email: string; }[];
}


const UsersList = ({data}: TableScrollAreaProps) => {

    const {currentUser} = useContext(UserContext);
    const {followersList} = useContext(FollowerContext);


    const {classes, cx} = useStyles();
    const [scrolled, setScrolled] = useState(false);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const userId = currentUser.uid;


    const userAlreadyFollowing = (followerId: string) => followersList.find((f) => f.followedId === followerId);


    const rows = data.map((row) => (
        <tr key={row.id}>

            <td>{row.displayName}</td>
            <td>{row.email}</td>
            <td>
                <div>
                    {
                        currentUser !== null ? userAlreadyFollowing(row.id) &&
                            <Button onClick={async () => {
                                await RemoveFollower(userId, row.id);
                                window.location.reload();
                            }}>
                                UnFollow
                            </Button>
                            ||
                            <Button onClick={async () => {
                                await FollowUser({userId: userId, followedId: row.id});
                                window.location.reload();
                            }}>
                                Follow
                            </Button>
                            : ""
                    }
                </div>


            </td>
        </tr>
    ));


    return (
        <div>
            <h3>User List</h3>
            <br/>
            <br/>
            <ScrollArea h={300} onScrollPositionChange={({y}) => setScrolled(y !== 0)}>
                <Table miw={700}>
                    <thead className={cx(classes.header, {[classes.scrolled]: scrolled})}>
                    <tr>


                        <th>DisplayName</th>
                        <th>Email</th>
                        <th>Follow</th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </ScrollArea>
        </div>

    );

};

export default UsersList;