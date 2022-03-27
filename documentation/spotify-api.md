# Spotify API

> ## Short-lived token
* Request to https://accounts.spotify.com/api/token
* Verb POST
* Options
    - headers: { Authorization: "Basic " + new Buffer(client_id + ":" + client_secret).toString("base64") }
    - form: { grant_type: "client_credentials" }
    - json: true
* Result: { access_token }

> ## Public Profile
* Request to https://api.spotify.com/v1/users
* Verb POST
* Params: username
* Options
    - headers: { Authorization: "Bearer " + token }
    - json: true
* Result: { display_name, external_urls, followers, href, id, images, type, uri }
