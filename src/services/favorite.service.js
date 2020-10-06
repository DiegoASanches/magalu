const getList = () => {
    return JSON.parse(localStorage.getItem('favorite-list')) || [];
};

const filterOnlyFavorite = (characters) => {
    let filteredArray = [];
    const list = getList() || [];
    list.forEach(id => {
        const item = characters.filter(c => c.id === id);
        if (item && item.length > 0) {
            const itemFiltered = item[0];
            itemFiltered.isFavorite = true;
            filteredArray.push(itemFiltered);
        } 
    });
    return filteredArray;
};

const isFavorite = (id) => {
    const list = getList() || [];
    const isFavorite = list.indexOf(id);
    return isFavorite === -1 ? false : true;
};

const like = (id) => {
    const list = getList() || [];
    const index = list.indexOf(id);
    if (index === -1) {
        list.push(id);
    }
    localStorage.setItem('favorite-list', JSON.stringify(list));
};

const unlike = (id) => {
    const list = getList() || [];
    const index = list.indexOf(id);
    if (index === -1) {
        return;
    }
    list.splice(index, 1);
    localStorage.setItem('favorite-list', JSON.stringify(list));
};

export { unlike, like, getList, isFavorite, filterOnlyFavorite };