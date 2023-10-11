export const pageMotion = {
    initial: {
        opacity: 0,
        y: 40
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3
        }
    },
    exit: {
        opacity: 0,
        y: 40,
        transition: {
            duration: 0.3
        }
    }
}

export const profileDropDownMotion = {
    initial: {
        opacity: 0,
        y: -10
    },
    animate: {
        opacity: 1,
        y: 0
    },
    exit: {
        opacity: 0,
        y: -10
    }
}