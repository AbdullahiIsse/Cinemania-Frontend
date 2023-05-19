import { useState, useEffect } from 'react';

export function useDebounce(value: any, timeout: number, callback: () => void): void {
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    const clearTimer = () => {
        if (timer) clearTimeout(timer);
    };

    useEffect(() => {
        clearTimer();
        if (value && callback) {
            const newTimer = setTimeout(callback, timeout);
            setTimer(newTimer);
        }
    }, [value]);
}
