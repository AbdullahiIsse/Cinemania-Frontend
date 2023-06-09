import {
    createStyles,
    Image,
    Container,
    Title,
    Group,
    Text,
    List,
    ThemeIcon,
    rem,
} from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import image from '../../assets/image.svg';
import MovieSearchBar from "../Search-bar/Movie/movie-search-bar.tsx";

const useStyles = createStyles((theme) => ({
    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: `calc(${theme.spacing.xl} * 4)`,
        paddingBottom: `calc(${theme.spacing.xl} * 4)`,
    },

    content: {
        maxWidth: rem(480),
        marginRight: `calc(${theme.spacing.xl} * 3)`,

        [theme.fn.smallerThan('md')]: {
            maxWidth: '100%',
            marginRight: 0,
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: rem(44),
        lineHeight: 1.2,
        fontWeight: 900,

        [theme.fn.smallerThan('xs')]: {
            fontSize: rem(28),
        },
    },

    control: {
        [theme.fn.smallerThan('xs')]: {
            flex: 1,
        },
    },

    image: {
        flex: 1,

        [theme.fn.smallerThan('md')]: {
            display: 'none',
        },
    },

    highlight: {
        position: 'relative',
        backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
        borderRadius: theme.radius.sm,
        padding: `${rem(4)} ${rem(12)}`,
    },
}));

export default function Hero() {
    const { classes } = useStyles();

    return (
        <div>
            <Container>
                <div className={classes.inner}>
                    <div className={classes.content}>
                        <Title className={classes.title}>
                             <span className={classes.highlight}>Welcome</span> to<br/>Cinemania
                        </Title>
                        <Text color="dimmed" mt="md">
                            A site that host Millions of movies, TV - Series and personalized toplist to discover. Explore now.
                        </Text>

                        <List
                            mt={30}
                            spacing="sm"
                            size="sm"
                            icon={
                                <ThemeIcon size={20} radius="xl">
                                    <IconCheck size={rem(12)} stroke={1.5} />
                                </ThemeIcon>
                            }
                        >
                            <List.Item>
                                <b>Movie</b> – Access to view Millions of movies and gain information
                            </List.Item>
                            <List.Item>
                                <b>TV-series</b> – Access to view Millions of Tv-Series and gain information
                            </List.Item>
                            <List.Item>
                                <b>Favorites</b> – Access to view, add and delete a favorites movie/tv-series list
                            </List.Item>
                        </List>

                        <Group mt={30}>
                            <MovieSearchBar/>

                        </Group>
                    </div>
                    <Image src={image} className={classes.image} />
                </div>
            </Container>
        </div>
    );
}


