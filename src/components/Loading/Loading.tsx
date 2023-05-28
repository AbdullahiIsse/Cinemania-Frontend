import React, {useEffect, useState} from "react";
import {Loader} from "@mantine/core";
import './Loading.css'

interface LoadingProps {
    children: React.ReactNode;
}
const Loading = ({children}:LoadingProps) => {
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (<div className={`${Loading ? "loading-container":""} `}>
        {Loading ? (
            <Loader color="dark" size="lg" />
        ) : (
            children
        )}
    </div>)


};

export default Loading;