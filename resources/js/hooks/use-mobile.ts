import React from "react";

export function useMediaQuery(query = "(max-width: 768px)") {
    const [matches, setMatches] = React.useState(false);
    React.useEffect(() => {
        if (typeof window === "undefined") return;
        const mql = window.matchMedia(query);
        const onChange = (e: MediaQueryListEvent | MediaQueryList) =>
            setMatches(
                "matches" in e ? e.matches : (e as MediaQueryList).matches
            );

        // set awal
        setMatches(mql.matches);

        // listener (support browser lama & baru)
        const listener = (e: MediaQueryListEvent) => onChange(e);
        mql.addEventListener?.("change", listener);
        mql.addListener?.(listener);

        return () => {
            mql.removeEventListener?.("change", listener);
            mql.removeListener?.(listener);
        };
    }, [query]);
    return matches;
}
