export const isMobile = () => {
    return window.innerWidth <= 599;
};

export const errorParser = (errors) => {
    const unknownError = 'Some error occurred';
    console.error(errors);
    console.log('YO', Object.values(errors)[2])
    if (Array.isArray(errors) && errors.length) {
        const err = errors[0]?.message ? errors[0].message : unknownError;
        return typeof err === 'string' ? err : unknownError;
    } else if (typeof errors === 'object' && Object.keys(errors)[2] !== undefined) {
        const err = Object?.values(errors)?.[2]?.data;
        return err && typeof err === 'object' ? { response: { data: err, status: 500 } } : typeof err === 'string' ? { response: { data: err, status: 500 } } :   unknownError;
    }
    return unknownError;
}

export const scrollToTop = () => {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}

export const setCookie = (token) => {
    let d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    document.cookie = `ref_token=${token}; expires=${d}; path=/`
}
