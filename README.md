# gig
NodeJs assignment creating APIs using express framework.

## Name - **Sandeep Kumar Bijarnia**


## **IITK Roll no. - 200856**


### Backend Assignment


### Assumptions -

I used mongoDB database,  express framework and Postman to check the proper functioning of APIs. Below I have attached some screenshots of the same.

Use following command to start sever


```
npm start
```

![alt_text](https://github.com/sandeepb20/gig/blob/master/testImages/runServer.png)

### **APIs**



1. **api/register :**  `Users can register using this api  and their details are saved in the database.`

```
{
   "email":"sandeepskr1721@gmail.com",
   "password":"LongPassword",
   "name": "Sandeep Kumar",
   "phone": 8239850413,
   "address": "Hall 12, Room:- B-404"
}
```

Register api will check if entries are valid, also whether the user is already registered or not. And save the details along with a token

```
{
   "email": "sandeepskr1721@gmail.com",
   "password": "$2a$10$YCN.OKyl9jBlBaexA2v8.erbgiFLjpy0xyh06iI/UHr567Utl8qFy",
   "name": "Sandeep Kumar",
   "phone": 8239850413,
   "address": "Hall 12, Room:- B-404",
   "_id": "6237520fd28a65ab015f56b4",
   "__v": 0,
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzc1MjBmZDI4YTY1YWIwMTVmNTZiNCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE2NDc3OTI2NTV9.lo6nhvMlzx5-SjqdnqOt95V0Q7US2IsCN-a0VzKmSoQ"
}
```



![alt_text](https://github.com/sandeepb20/gig/blob/master/testImages/register.png)




2. **api/login:** Users can login using this api.
```
{
   "email":"sandeepskr1721@gmail.com",
   "password":"LongPassword"
}
```

Login api will check if email and password are correct,and login accordingly. And save the details along with a token.
![alt text](https://github.com/sandeepb20/gig/blob/master/testImages/login.png)

3. **api/profile:** User can view his details only if the user is logged in. i.e we need to pass a user's token to view his profile, which is uniquely generated.

Give token as input in  the authorization header as bearer token and api will give following output -

```
{
   "_id": "623750aed28a65ab015f56a0",
   "email": "sandeepskr1721@gmail.com",
   "password": "$2a$10$eHLS1HuvK9SbmHKn5DC1muM75vwMez92iry/LbICOx9LnTpMu.oTC",
   "name": "Sandeep Kumar",
   "phone": 8239850413,
   "address": "Hall 12, Room:- B-404",
   "__v": 0
}
```


![alt_text](https://github.com/sandeepb20/gig/blob/master/testImages/fetch_user_details.png)

