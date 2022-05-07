const DUMMY_MESSAGES = [
    {
        id: 1,
        content: 'hello',
        sameAuther: false,
        author: {
            username: 'Mark',
        },     
        date: '22/03/2022',
        sameDay: false
    },
    {
        id: 2,
        content: 'workd',
        sameAuther: true,
        author: {
            username: 'Freddy',
        },
        date: '22/09/2022',
        sameDay: false
    },
    {
        id: 3,
        content: 'secret',
        sameAuther: false,
        author: {
            username: 'Madan',
        },
        date: '22/03/2021',
        sameDay: true
    },
    {
        id: 4,
        content: 'open',
        sameAuther: true,
        author: {
            username: 'Vicky',
        },
        date: '09/12/2022',
        sameDay: true
    },
]

export default DUMMY_MESSAGES;