export const Paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize; // старт индекса массива users
    return [...items].splice(startIndex, pageSize);
};
