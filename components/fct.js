initUser=(token)=> {
  fetch('https://graph.facebook.com/v2.2/me/email,name,first_name,middle_name,last_name&access_token=' + token)
  .then((response) => response.json())
  .then((json) => {
   
    user.name = json.name
    user.id = json.id
    user.user_friends = json.friends
    user.email = json.email
    user.username = json.name
    user.loading = false
    user.loggedIn = true
    user.avatar = setAvatar(json.id)      
  })
  .catch(() => {
    reject('ERROR GETTING DATA FROM FACEBOOK')
  })
};
