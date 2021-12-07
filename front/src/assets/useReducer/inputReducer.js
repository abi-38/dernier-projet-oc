const inputReducer = (state, action) => {
    const nameRegex =  new RegExp(/^[\wéèëäù]{2,}$/);
    const passwordRegex = new RegExp(/^[\wéèëäù]{6,}$/);
    const emailRegex = new RegExp(/^[\wéèëäù]+(\.[\wéèëäù]+)*@[\w]+(\.[\w]+)*\.[\w]{2,4}$/);
    switch (action.type) {
        case 'USER_INPUT':
            switch (action.type_input) {
                case 'name' :
                    return {value: action.val, isValid: nameRegex.test(action.val)};
                case 'email' :
                    return {value: action.val, isValid: emailRegex.test(action.val)};
                case 'password' :
                    return {value: action.val, isValid: passwordRegex.test(action.val)};
                default:
                    console.log("erreur");    
            } break;
        case 'INPUT_BLUR':
            default:
                    console.log("erreur");  
            switch (action.type_input) {
                case 'name' :
                    return {value: state.value, isValid: nameRegex.test(state.value)};
                case 'email' :
                    return {value: state.value, isValid: emailRegex.test(state.value)};
                case 'password' :
                    return {value: state.value, isValid: passwordRegex.test(state.value)};
                default:
                    console.log("erreur");  
            } break;
    }
}

export default inputReducer;