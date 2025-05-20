
function Loadingpage({ loading }: { loading: boolean }) {
    return (
        <div className={`loading-screen ${loading ? 'visible' : 'hidden'}`}>
            <div className="loader"></div>
        </div>
    );
}
export default Loadingpage;