// spread operator for array : 
const friends = ['a', 'b'];

const schlFriends = ['c', 'd'];

const clgFriends = ['e', 'f'];

friends.push(...schlFriends);
// console.log(friends);


// spread operator for obj : 
const user = {
    name: "alif",
    age: 22
}
const other = {
    hobby: "travelling",
    favColor: "black"
}

const userInfo = { ...user, ...other };
// console.log(userInfo);


// rest operator : 
const sendInvite = (...friend: string[]) => {

    friend.forEach((frnd: String) => console.log(`send Invitation to ${frnd}`));

}

sendInvite("pintu" , "chintu");