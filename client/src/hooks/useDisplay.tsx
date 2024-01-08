


export interface useDisplayI {
    getScreenWidth :()=>number
}


function useDisplay() {

    function getScreenWidth() {
        return window.innerWidth
    };

    return{
        getScreenWidth
    }
}

export default useDisplay;