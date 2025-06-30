import AuthService from "./AuthService";

export const logout = () : Promise<any[] | null> => {
    return new Promise ((resolve, reject) => {
        AuthService.logout()
            .then((response) => {
                const apiData: any = response;
                resolve(apiData);
            })
            .catch((err) => {
                console.error(err);
                resolve(null);
                reject(err);
            })
    })
}

// export const signIn = () : Promise<any[] | null> => {
//     return new Promise ((resolve, reject) => {
//         AuthService.signIn()
//             .then((response) => {
//                 const apiData: any = response;
//                 resolve(apiData);
//             })
//             .catch((err) => {
//                 console.error(err);
//                 resolve(null);
//                 reject(err);
//             })
//     })
// }