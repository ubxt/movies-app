import { useState, useEffect, useCallback } from 'react';
import API, { Movie, Cast, Crew, Movies } from '../API';
import { isPersistedState } from '../helpers';

export type MovieState = Movie & { 
    actors: Cast[],
    directors: Crew[] 
}

export const useMovieFetch = (movieId: number) => {
    const [state, setState] = useState<MovieState>({} as MovieState);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const fetchMovie = useCallback(async () => {
        try {
            setLoading(true);
            setError(false);

            const movie = await API.fetchMovie(movieId);
            const credits = await API.fetchCredits(movieId);
            //Get directors only
            const directors = credits.crew.filter(
                member => member.job === 'Director');
            setState({
                ...movie,
                actors: credits.cast,
                directors
            })
            setLoading(false);

        } catch (error) {
            setError(true);
        }
    }, [movieId]);

    useEffect(() => {

        const sessionState = isPersistedState(movieId.toString());
        if (sessionState) {
            setState(sessionState);
            setLoading(false);
            return;
        }

        fetchMovie();
    }, [movieId, fetchMovie]);

    useEffect(() => {
        sessionStorage.setItem(movieId.toString(), JSON.stringify(state));
    }, [movieId, state])

    return { state, loading, error }
}