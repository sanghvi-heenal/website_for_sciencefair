export function firstLastName(name, value) {
    console.log('form action function called')
    return {
        type: 'FIRST_LAST_NAME',
        name: name,
        payload: value
    }
};

export function email(value) {
    console.log('form action email function called')
    return {
        type: 'EMAIL',
        payload: value
    }
};
    
export function sname(value) {

    console.log('sname called')
    return {
        type: 'SNAME',
        payload: value
    } 
};

export function password(value) {

    console.log('password entered')
    return {
        type: 'PASSWORD',
        payload: value
    } 
};