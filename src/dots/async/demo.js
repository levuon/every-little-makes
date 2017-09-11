class Api {
  constructor() {
    this.user = { id: 1, name: 'lev'}
    this.friends = [ this.user, this.user, this.user ]
    this.photo = 'not a real photo'
  }

  getUser() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(this.user), 200);
    });
  }
  getFriends(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(this.friends), 200);
    });
  }
  getPhoto(userId){
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(this.photo), 200);
    });
  }
  throwError() {
    return new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('Intentional Error')), 200);
    });
  }
}


function callbackHell() {
  const api = new Api();
  let user, friends;
  api.getUser().then(returnedUser => {
    user = returnedUser;
    api.getFriends().then(returnedFriend => {
      friends = returnedFriend;
      api.getPhoto(user.id).then(photo => {
        console.log('callbackHell', { user, friends, photo });
      })
    })
  })
}
// callbackHell();

function promiseChain() {
  const api = new Api();
  let user, friends;
  api.getUser()
    .then(returnedUser => {
      user = returnedUser;
      return api.getFriends(user.id);
    })
    .then(returnedFriend => {
      friends = returnedFriend;
      return api.getPhoto(user.id);
    })
    .then((photo) => {
      console.log('promiseChain', { user, friends, photo })
    })
}
// promiseChain();

async function asyncAwaitIsYourNewBestFriend() {
  const api = new Api()
  const user = await api.getUser()
  const friends = await api.getFriends(user.id)
  const photo = await api.getPhoto(user.id)
  console.log('asyncAwaitIsYourNewBestFriend', { user, friends, photo })
}

// asyncAwaitIsYourNewBestFriend();


//####
function promiseLoops () {
  const api = new Api()
  api.getUser()
    .then((user) => {
      return api.getFriends(user.id)
    })
    .then((returnedFriends) => {
      const getFriendsOfFriends = (friends) => {
        if (friends.length > 0) {
          let friend = friends.pop()
          return api.getFriends(friend.id)
            .then((moreFriends) => {
              console.log('promiseLoops', moreFriends)
              return getFriendsOfFriends(friends)
            })
        }
      }
      return getFriendsOfFriends(returnedFriends)
    })
}

promiseLoops();

async function asyncAwaitLoops () {
  const api = new Api()
  const user = await api.getUser()
  const friends = await api.getFriends(user.id)

  for (let friend of friends) {
    let moreFriends = await api.getFriends(friend.id)
    console.log('asyncAwaitLoops', moreFriends)
  }
}
asyncAwaitLoops();


async function asyncAwaitLoopsParallel () {
  const api = new Api()
  const user = await api.getUser()
  const friends = await api.getFriends(user.id)
  const friendPromises = friends.map(friend => api.getFriends(friend.id))
  const moreFriends = await Promise.all(friendPromises)
  console.log('asyncAwaitLoopsParallel', moreFriends)
}
asyncAwaitLoopsParallel()






// Array(10).fill(getUserInfo())
async function getUserInfo () {
  const api = new Api()
  const user = await api.getUser()
  const friends = await api.getFriends(user.id)
  const photo = await api.getPhoto(user.id)
  return { user, friends, photo }
}

async function getLotsOfUserDataFaster () {
  try {
    const userPromises = Array(10).fill(getUserInfo())
    const users = await Promise.all(userPromises)
    console.log('getLotsOfUserDataFaster', users)
  } catch (err) {
    console.error(err)
  }
}

getLotsOfUserDataFaster();
