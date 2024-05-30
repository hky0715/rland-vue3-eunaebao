import { defineStore } from 'pinia'

export const useUserDetailsStore = defineStore('userDetails', {
    // userDetail의 상태를 감시하는 것을 만들자
    state:() => {
        return {
            id:1,
            userName:"newlec",
            email:"newlec@newlecture.com"
        }
    },
    actions: {
        isAuthenticated() {
            if(this.userName)
                return true;

            return false;
        },
        invalidate() {
            this.id = null;
            this.username = null;
            this.email = null;
        },
        setAuth(userInfo) {
            
        }
    }
})



// class UserDetails {
//     constructor() {
//         this.userName = "newlec";
//         this.email = "newlec@newlecture.com";
//         this.id = 1;
//     }
// }

// export default new UserDetail();