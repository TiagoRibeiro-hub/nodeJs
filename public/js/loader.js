const loaderFunc = function() {
    const _loaderSelector = document.querySelector(".loader");
    let _addLoader = function() {
        _loaderSelector.classList.remove("loader-hidden");
    };
    let _removeLoader = function() {
        _loaderSelector.classList.add("loader-hidden");
    };
    return {
        loaderSelector: _loaderSelector,
        addLoader: _addLoader,
        removeLoader: _removeLoader,
    }
}
const loader = loaderFunc();

window.addEventListener("load", () => {
    loader.removeLoader();
});

export default loader;