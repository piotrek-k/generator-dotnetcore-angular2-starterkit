// export static class FakeLocalStorage {
//     getItem(key): any {
//         if (typeof window !== 'undefined') {
//             return localStorage.getItem(key);
//         } else {
//             return undefined;
//         }
//     }
//     setItem(key, value): any {
//         if (typeof window !== 'undefined') {
//             localStorage.setItem(key, value);
//         } else {
//             //do nothing
//         }
//     }
//     removeItem(key):any {
//         if (typeof window !== 'undefined') {
//             localStorage.removeItem(key);
//         } else {
//             //do nothing
//         }
//     }
// };

// export const LocalStorage = (): FakeLocalStorage => {
//     re
//     if (typeof window !== 'undefined') {
//         return localStorage;
//     } else {
//         return new FakeLocalStorage();
//     }
// };

//export const LocalStorage : FakeLocalStorage = new FakeLocalStorage();

import { OpaqueToken } from '@angular/core';

export const LocalStorage = new OpaqueToken('localStorage');