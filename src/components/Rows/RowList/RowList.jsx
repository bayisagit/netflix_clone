import Row from '../Row/Row'
import requests from '../../../utils/Request';

export default function RowList() {

    return (
        <>
            <Row
                title="Netflix Originals"
                fetchUrl={requests.fetchNetflixOriginals}
                isLargeRow={true}
            />
            <Row
                title="Trading Now"
                fetchUrl={requests.fetchTrending}
                isLargeRow={false}
            />
            <Row
                title="Top Rated"
                fetchUrl={requests.fetchTopRatedMovies}
                isLargeRow={false}
            />
            <Row
                title="Action Movies"
                fetchUrl={requests.fetchActionMovies}
                isLargeRow={false}
            />
            <Row
                title="Comedy Movies"
                fetchUrl={requests.fetchComedyMovies}
                isLargeRow={false}
            />
            <Row
                title="Horror Movies"
                fetchUrl={requests.fetchHorrorMovies}
                isLargeRow={false}
            />
            <Row
                title="Romance Movies"
                fetchUrl={requests.fetchRomanceMovies}
                isLargeRow={false}
            />
            <Row
                title="Documentaries Movies"
                fetchUrl={requests.fetchDocumentaries}
                isLargeRow={false}
            />
        </>
    );
}